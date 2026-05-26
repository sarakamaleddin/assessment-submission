const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');
const { validate } = require('../middlewares/validate.middleware');
const { CreateProductSchema, UpdateStatusSchema } = require('../models/product.model');

router.use(authenticateToken);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductById);

router.post('/', validate(CreateProductSchema), productController.createProduct);

router.put('/:id/status', validate(UpdateStatusSchema), productController.updateProductStatus);

module.exports = router;