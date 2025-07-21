const Order = require('../Models/Order');

module.exports = {
    // Get all orders
    getAll: async (req, res) => {
        try {
            const orders = await Order.find().populate('userId').populate('products.product');
            res.json(orders);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Get order by ID
    getById: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id).populate('userId').populate('products.product');
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json(order);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Create order
    create: async (req, res) => {
        try {
            const order = new Order(req.body);
            await order.save();
            res.status(201).json(order);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Update order
    update: async (req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json(order);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // Delete order
    remove: async (req, res) => {
        try {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) return res.status(404).json({ message: 'Order not found' });
            res.json({ message: 'Order deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}; 