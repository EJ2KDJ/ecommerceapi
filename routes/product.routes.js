const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { auth } = require('../middleware/auth.middleware');

// Get routes
router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

// Protected routes
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);

module.exports = router;