const { Cart, CartItem, Product } = require('../models');


// Function to get the active cart for a user
async function getActiveCart(userId) {
    //
    let cart = await Cart.findOne({
         where: { userId, status: true}
    });

    if (!cart) {
        cart = await Cart.create({ userId }); // Create a new cart under the user
    }

    return cart;
}

// Function to add a product to the user's cart
async function addProductToCart(userId, productId, quantity) {
    
    // Ensure the user has an active cart
    const cart = await getActiveCart(userId);

    const product = await Product.findByPk(productId);
    if (!product) throw new Error('Product not found');

    if (product.quantity < quantity) {
        throw new Error('Insufficient product quantity');
    }


    // Find or create a cart item
    const [item, created] = await CartItem.findOrCreate({
        where: { // Look for existing cart item
            cartId: cart.id,
            productId: product.id
        },
        defaults: { quantity }
    });

    if (!created) {
        // If the item already exists, update the quantity
        item.quantity += quantity;
        await item.save();
    }

    return item;
}


// Function to update the quantity of a product in the user's cart
async function updateCartItem(userId, productId, quantity) {
    const cart = await getActiveCart(userId);

    const item = await CartItem.findOne({
        where: {
            cartId: cart.id,
            productId
        }
    });

    if (!item) throw new Error('Cart item not found');

    if (quantity <= 0) {
        await item.destroy(); // Remove item if quantity is zero or less
        return null;
    }

    item.quantity = quantity;        
    await item.save();

    return item;
}

async function getCartItems(userId) {
    const cart = await getActiveCart(userId);

    return CartItem.findAll({
        where: { cartId: cart.id },
        include: [Product]
    });
}

module.exports = {
    getActiveCart,
    addProductToCart,
    updateCartItem,
    getCartItems
};