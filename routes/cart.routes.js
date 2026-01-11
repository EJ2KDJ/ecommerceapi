const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const { auth } = require('../middleware/auth.middleware');

// Get Cart
router.get('/cart', auth, cartController.getCart);
// Get Cart Items
router.get('/', auth, cartController.getCartItems);
// Add Item to Cart
router.post('/', auth, cartController.addToCart);
// Update Cart Item
router.put('/:productId', auth, cartController.updateCartItem);

module.exports = router;