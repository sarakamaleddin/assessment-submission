const productService = require('../services/product.service');

const getAllProducts = (req, res, next) => {
    try {
        const { status, search } = req.query;

        const filters = {};

        if (status) filters.status = status;
        if (search) filters.search = search;

        const products = productService.getAllProducts(filters);
        res.json(products);
    } catch (error) {
        next(error);
    }
};

const getProductById = (req, res, next) => {
    try {
        const product = productService.getProductById(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

const createProduct = (req, res, next) => {
    try {
        const product = productService.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

const updateProductStatus = (req, res, next) => {
    try {
        const product = productService.updateProductStatus(req.params.id, req.body.status);
        res.json(product);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductStatus
};