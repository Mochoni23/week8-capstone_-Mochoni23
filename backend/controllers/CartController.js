const Cart = require('../Models/Cart');
const Product = require('../Models/Product');

module.exports = {
    // Get cart by user ID
    getCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            res.json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Add item to cart
    addItem: async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            let cart = await Cart.findOne({ user: req.params.userId });
            if (!cart) {
                cart = new Cart({ user: req.params.userId, items: [] });
            }
            await cart.addItem(productId, quantity);
            await cart.populate('items.product');
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Remove item from cart
    removeItem: async (req, res) => {
        try {
            const { productId } = req.body;
            const cart = await Cart.findOne({ user: req.params.userId });
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            await cart.removeItem(productId);
            await cart.populate('items.product');
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Update item quantity
    updateQuantity: async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            const cart = await Cart.findOne({ user: req.params.userId });
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            await cart.updateQuantity(productId, quantity);
            await cart.populate('items.product');
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Clear cart
    clearCart: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.params.userId });
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            await cart.clearCart();
            res.status(200).json({ message: 'Cart cleared' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Convert cart to order
    createOrder: async (req, res) => {
        try {
            const cart = await Cart.findOne({ user: req.params.userId }).populate('items.product');
            if (!cart) return res.status(404).json({ message: 'Cart not found' });
            const { emptyCylinderReturned, deliveryType, scheduledDate } = req.body;
            const order = await cart.createOrder({ emptyCylinderReturned, deliveryType, scheduledDate });
            res.status(201).json(order);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}; 