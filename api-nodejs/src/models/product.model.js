const { z } = require('zod');

const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Name is required'),
    status: z.enum(['active', 'inactive', 'out_of_stock']),
    price: z.number().positive('Price must be positive'),
    description: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
});

const CreateProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    status: z.enum(['active', 'inactive', 'out_of_stock']).optional().default('active'),
    price: z.number().positive('Price must be positive'),
    description: z.string().optional()
});

const UpdateStatusSchema = z.object({
    status: z.enum(['active', 'inactive', 'out_of_stock'])
});

const ProductStatusSchema = z.enum(['active', 'inactive', 'out_of_stock']);

module.exports = {
    ProductSchema,
    CreateProductSchema,
    UpdateStatusSchema,
    ProductStatusSchema
};