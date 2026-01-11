const productService = require('../sequelize/service/product.service');

async function listProducts(req, res) {
    try {
        const products = await productService.listProducts();
        return res.status(200).json(products);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function getProduct(req, res) {
    try {
        const product = await productService.getProductById(req.params.id);
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function createProduct(req, res) {
    try {
        const product = await productService.createProduct(req.body);
        return res.status(201).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

async function updateProduct(req, res) {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'server error' });
    }
}

module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct
};