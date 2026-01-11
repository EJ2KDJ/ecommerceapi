const {Order, OrderItem, Product, Cart, CartItem} = require('../models');
const {sequelize} = require('../models');

async function createOrderFromCart(userId) {
    const transaction = await sequelize.transaction();

    try {
        //get Active cart

        const cart = await Cart.findOne({
            where: { userId, status: true },
            include: [{ 
                model: CartItem,
                include: [{ model: Product }]
            }],
            transaction
        });

        if (!cart || !cart.CartItems || cart.CartItems.length === 0 ) {
            throw new Error('No active cart or cart is empty');
        }

        let totalAmount = 0;
        const orderItems = [];

        // Calculate total amount and prepare order items
        for (const cartItem of cart.CartItems) {
            const product = cartItem.Product;
            const quantity = cartItem.quantity;
            if (product.quantity < quantity) {
                throw new Error(`Insufficient quantity for product ${product.name}`);
            }

            // Calculate total amount
            const itemTotal = product.price * quantity;
            totalAmount += itemTotal;

            // Prepare order item
            orderItems.push({
                productId: product.id,
                quantity,
                price: product.price
            });

            // Deduct product quantity
            product.quantity -= quantity;
            await product.save({ transaction });
        }

        // Create order and order items
        const order = await Order.create({
            userId,
            total_amount: totalAmount,
            pay_status: 'pending'
        }, { transaction });

        // clear Cart
        await CartItem.destroy({
            where: { cartId: cart.id },
            transaction
        });

        cart.status = false; // Mark cart as inactive
        await cart.save({ transaction });

        await transaction.commit();

        return order;
    } catch (err) {
        transaction.rollback();
        throw err;

    }
}

//Get user's orders
async function getUsersOrders(userId) {
    return await Order.findAll({
        where: { userId },
        include: [{
            model: Product,
            through: { attributes: ['quantity', 'price_at_purchase'] }
        }],
        order: [['createdAt', 'DESC']]
    });
}


//Get order by id for a user
async function getOrderById(userId, orderId) {
    const order = await Order.findOne({
        where: { id: orderId, userId },
        include: [{
            model: Product,
            through: { attributes: ['quantity', 'price_at_purchase'] }
        }]
    });

    if (!order) throw new Error('Order not found');

    return order;
}

//Update payment status of an order
async function updateOrderPaymentStatus(orderId, userId, payStatus) {
    // Set valid payment statuses
    const validstats = ['pending', 'paid', 'fail'];

    // If not within valid statuses, throw error
    if (!validstats.includes(payStatus)) {
        throw new Error('Invalid payment status');
    }
    
    const order = await Order.findOne({
        where: { id: orderId, userId }
    });

    // Order not found, throw error
    if (!order) throw new Error('Order not found');

    order.pay_status = payStatus;
    await order.save();

    return order;
}

async function cancelOrder(orderId, userId) {
    const transaction = sequelize.transaction();

    try {
        const order = await Order.findOne({
            where: { id: orderId, userId },
            include: [{
                model: Product,
                through: { attributes: ['quantity', 'price_at_purchase']}
            }],
            transaction
        })

        if (!order) throw new Error('Order not found');

        if (order.pay_status !== 'pending') throw new Error('Only pending orders can be cancelled');

        for (const product of order.Products) {
            const quantity = product.OrderItem.quantity;
            product.quantity += quantity;
            await product.save({ transaction });
        }

        order.pay_status = 'fail';
        await order.save({ transaction });

        await transaction.commit();

        return order;
    } catch (err) {
        await transaction.rollback();
        throw err;
    }
}

module.exports = {
    createOrderFromCart,
    getUsersOrders,
    getOrderById,
    updateOrderPaymentStatus,
    cancelOrder
};