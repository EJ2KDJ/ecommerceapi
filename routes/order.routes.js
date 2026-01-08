const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const authentication = require('../middleware/auth.middlerware');

// Create Order
router.post('/', authentication, orderController.createOrder);
// Get Orders
router.get('/', authentication, orderController.getOrders);
// Get Single Order
router.get('/:orderId', authentication, orderController.getSingleOrder);
// Update Payment Status
router.put('/:orderId/payment-status', authentication, orderController.updatePaymentStatus);
// Cancel Order
router.delete('/:orderId', authentication, orderController.cancelOrder);