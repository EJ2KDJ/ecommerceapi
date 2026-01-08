const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authentication = require('../middleware/auth.middlerware');

// Get routes
router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

// Protected routes
router.post('/', authentication, productController.createProduct);
router.put('/:id', authentication, productController.updateProduct);

module.exports = router;