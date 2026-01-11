const orderService = require('../sequelize/service/order.service');

async function createOrder(req, res) {
    try {
        const order = await orderService.createOrderFromCart(req.user.id, req.body);
        return res.status(201).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await orderService.getOrdersByUserId(req.user.id);
        return res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function getSingleOrder(req, res) {
    try {
        const order = await orderService.getOrderById(req.user.id, req.params.orderId);
        return res.status(200).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function updatePaymentStatus(req, res) {
    try {
        const order = await orderService.updateOrderPaymentStatus(req.params.orderId, req.user.id, req.body.pay_status);
        return res.status(200).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function cancelOrder(req, res) {
    try {
        const order = await orderService.cancelOrder(req.params.orderId, req.user.id);
        return res.status(200).json(order);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

module.exports = {
    createOrder,
    getOrders,
    getSingleOrder,
    updatePaymentStatus,
    cancelOrder
};