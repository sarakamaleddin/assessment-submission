'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductStatus } from '../src/types/product';
import { fetchProducts } from '../src/services/api';
import styles from './page.module.css';

type LoadingState = 'idle' | 'loading' | 'success' | 'error';

interface ErrorState {
    message: string;
    status?: number;
}

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingState, setLoadingState] = useState<LoadingState>('idle');
    const [error, setError] = useState<ErrorState | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<ProductStatus | ''>('');

    const loadProducts = useCallback(async () => {
        setLoadingState('loading');
        setError(null);

        try {
            const params: { status?: string; search?: string } = {};
            if (statusFilter) params.status = statusFilter;
            if (search) params.search = search;

            const data = await fetchProducts(params);
            setProducts(data);
            setLoadingState('success');
        } catch (err: any) {
            setError({
                message: err.message || 'Failed to load products',
                status: err.status
            });
            setLoadingState('error');
        }
    }, [search, statusFilter]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const getStatusColor = (status: ProductStatus): string => {
        switch (status) {
            case 'active': return '#4caf50';
            case 'inactive': return '#ff9800';
            case 'out_of_stock': return '#f44336';
            default: return '#999';
        }
    };

    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Product Dashboard</h1>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ProductStatus | '')}
                    className={styles.filterSelect}
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="out_of_stock">Out of Stock</option>
                </select>
                <button onClick={loadProducts} className={styles.refreshButton}>
                    Refresh
                </button>
            </div>

            {loadingState === 'loading' && (
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Loading products...</p>
                </div>
            )}

            {loadingState === 'error' && (
                <div className={styles.error}>
                    <h3>Error Loading Products</h3>
                    <p>{error?.message}</p>
                    {error?.status === 401 && (
                        <p className={styles.authError}>Please check your authentication credentials.</p>
                    )}
                    {error?.status === 403 && (
                        <p className={styles.authError}>You dont have permission to view this resource.</p>
                    )}
                    <button onClick={loadProducts} className={styles.retryButton}>
                        Retry
                    </button>
                </div>
            )}

            {loadingState === 'success' && products.length === 0 && (
                <div className={styles.empty}>
                    <h3>No Products Found</h3>
                    <p>No products match your search criteria. Try adjusting your filters.</p>
                </div>
            )}

            {loadingState === 'success' && products.length > 0 && (
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className={styles.productName}>
                                            <strong>{product.name}</strong>
                                            {product.description && (
                                                <span className={styles.description}>{product.description}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>
                                        <span
                                            className={styles.statusBadge}
                                            style={{ backgroundColor: getStatusColor(product.status) }}
                                        >
                                            {product.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td>{formatDate(product.createdAt)}</td>
                                    <td>{formatDate(product.updatedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className={styles.count}>
                        Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    </p>
                </div>
            )}
        </main>
    );
}