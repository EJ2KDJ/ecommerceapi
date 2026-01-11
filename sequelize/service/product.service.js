const { Product } = require('../models');


//Simple service to get product by id
async function getProductById(id) {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error('Product not found');
    }
    return product;
}

// Listing all products a.k.a get all
async function listProducts(filters = {}) {
    return Product.findAll({where: filters});
}

// Stock Validation
async function validateStock(productId, requestedQuantity) {
    //check Product stock
    const product = await getProductById(productId);

    if (product.quantity <= 0) {
        throw new Error('Product is out of stock');
    }

    if (requestedQuantity > product.quantity) {
        throw new Error('Insufficient stock');
    }

    return true;
}

// Create Product
async function createProduct(data) {

    //Validate data
    if (data.quantity < 0) throw new Error('Invalid quantity');
    if (data.price < 0) throw new Error('Invalid price');

    //Create and return product
    return Product.create(data)
}

//Update Product
async function updateProduct(id, data) {
    //Retrieve product by id
    const product = await getProductById(id);

    //Validate data
    if (data.quantity !== undefined && data.quantity < 0) throw new Error('Invalid quantity');
    if (data.price !== undefined && data.price < 0) throw new Error('Invalid price');

    await product.update(data);
    return product;


}

// Increment product stock
async function incrementStock(productId, quantity, transaction = null) {
    // get product by id
    const product = await getProductById(productId, transaction);

    product.quantity += quantity;
    await product.save({ transaction });
    return product;
}

async function decrementStock(productId, quantity, transaction = null) {
    // get product by id
    const product = await getProductById(productId, transaction);

    if (product.quantity < quantity) throw new Error('Insufficient stock to decrement');

    product.quantity -= quantity;
    await product.save({ transaction });
    return product;
}

module.exports = {
    getProductById,
    listProducts,
    validateStock,
    createProduct,
    updateProduct,
    incrementStock,
    decrementStock
};