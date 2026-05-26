import { z } from 'zod';

export const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    status: z.enum(['active', 'inactive', 'out_of_stock']),
    price: z.number().positive(),
    description: z.string().optional(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const ProductArraySchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;

export type ProductStatus = Product['status'];