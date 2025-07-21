const Product = require('../Models/Product');

module.exports = {
    // Get all products
    getAll: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get product by ID
    getById: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Create product
    create: async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update product
    update: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete product
    remove: async (req, res) => {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.json({ message: 'Product deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}; 