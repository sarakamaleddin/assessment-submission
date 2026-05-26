import { Product, ProductArraySchema, ProductSchema } from "../types/product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not set');
}

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const getAuthToken = (): string => {
  return 'paste the generated jwt token here';
};

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    throw new ApiError(401, 'Unauthorized - Please log in again');
  }

  if (response.status === 403) {
    throw new ApiError(403, 'Forbidden - You do not have permission to access this resource');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
};

export const fetchProducts = async (params?: {
  status?: string;
  search?: string;
}): Promise<Product[]> => {
  const url = new URL(`${API_URL}/api/products`);
  
  if (params?.status) {
    url.searchParams.append('status', params.status);
  }
  if (params?.search) {
    url.searchParams.append('search', params.search);
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await handleResponse(response);
  
  try {
    return ProductArraySchema.parse(data);
  } catch (error) {
    console.error('Response validation failed:', error);
    throw new ApiError(500, 'Invalid response format from server');
  }
};

export const fetchProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await handleResponse(response);
  
  try {
    return ProductSchema.parse(data);
  } catch (error) {
    console.error('Response validation failed:', error);
    throw new ApiError(500, 'Invalid response format from server');
  }
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  });

  const data = await handleResponse(response);
  
  try {
    return ProductSchema.parse(data);
  } catch (error) {
    console.error('Response validation failed:', error);
    throw new ApiError(500, 'Invalid response format from server');
  }
};

export const updateProductStatus = async (id: string, status: Product['status']): Promise<Product> => {
  const response = await fetch(`${API_URL}/api/products/${id}/status`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  });

  const data = await handleResponse(response);
  
  try {
    return ProductSchema.parse(data);
  } catch (error) {
    console.error('Response validation failed:', error);
    throw new ApiError(500, 'Invalid response format from server');
  }
};