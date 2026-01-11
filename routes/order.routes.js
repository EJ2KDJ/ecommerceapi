const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { auth } = require('../middleware/auth.middleware');

// Create Order
router.post('/', auth, orderController.createOrder);
// Get Orders
router.get('/', auth, orderController.getOrders);
// Get Single Order
router.get('/:orderId', auth, orderController.getSingleOrder);
// Update Payment Status
router.put('/:orderId/payment-status', auth, orderController.updatePaymentStatus);
// Cancel Order
router.delete('/:orderId', auth, orderController.cancelOrder);

module.exports = router;