const cartService = require('../sequelize/service/cart.service');

async function getCart(req, res) {
    try {
        const cart = await cartService.getCartByUserId(req.user.id);
        return res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function addToCart(req, res) {
    try {
        const cartItem = await cartService.addProductToCart(req.user.id, req.body.productId, req.body.quantity);
        return res.status(201).json(cartItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function updateCartItem(req, res) {
    try {
        const updatedItem = await cartService.updateCartItem(req.user.id, req.params.productId, req.body.quantity);
        return res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function getCartItems(req, res) {
    try {
        const items = await cartService.getCartItems(req.user.id);
        return res.status(200).json(items);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    getCartItems
}