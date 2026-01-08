const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const authentication = require('../middleware/auth.middlerware');

// Get Cart
router.get('/cart', authentication, cartController.getCart);
// Get Cart Items
router.get('/', authentication, cartController.getCartItems);
// Add Item to Cart
router.post('/', authentication, cartController.addToCart);
// Update Cart Item
router.put('/:productId', authentication, cartController.updateCartItem);



module.exports = router;
