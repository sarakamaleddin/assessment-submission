const { v4: uuidv4 } = require('uuid');
const { ProductSchema } = require('../models/product.model');

// In memory storage
const products = [
    {
        id: 'fd0a3b1c-1c2c-4008-98ba-2fd5ee3fc664',
        name: 'Laptop',
        status: 'active',
        price: 1300.5,
        description: 'High performance laptop',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
     {
        id: 'b35b8b57-cc05-4e9b-927c-5c54debffd50',
        name: 'Wireless Mouse',
        status: 'inactive',
        price: 30,
        description: 'Wireless mouse',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
     {
        id: '0a5a0441-a1cb-4a2f-a9c7-900327902050',
        name: 'USB-C hub',
        status: 'out_of_stock',
        price: 15,
        description: 'USB-C hub',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

const getAllProducts = (filters = {}) => {
    let filteredProducts = [...products];

    if (filters.status) {
        filteredProducts = filteredProducts.filter(p => p.status === filters.status);
    }

    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm) || p.description?.toLowerCase().includes(searchTerm));
    }

    return filteredProducts;
};

const getProductById = (id) => {
    const product = products.find(p => p.id === id);

    if(!product) {
        const error = new Error('Product not found!');
        error.status = 404;
        throw error;
    }

    return product;
}

const createProduct = (productData) => {
    const newProduct = {
        id: uuidv4(),
        name: productData.name,
        status: productData.status || 'active',
        price: productData.price,
        description: productData.description || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    const validateProduct = ProductSchema.parse(newProduct);
    products.push(validateProduct);
    return validateProduct;
};

const updateProductStatus = (id, status) => {
    const productIndex = products.findIndex(p => p.id === id);

    if(productIndex === -1) {
        const error = new Error('Product not found');
        error.status = 404;
        throw error;
    }

    products[productIndex] = {
        ...products[productIndex],
        status,
        updatedAt: new Date().toISOString()
    };

    return products[productIndex];
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductStatus
};