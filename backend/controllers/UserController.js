const User = require('../Models/User');
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create new user
const createUser = async (req, res) => {
    try {
        const { name, email, password, phone, role = 'user' } = req.body;

        // Check for existing user (email or phone)
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });
        
        if (existingUser) {
            return res.status(400).json({
                message: existingUser.email === email 
                    ? 'Email already in use' 
                    : 'Phone number already in use'
            });
        }

        // Create user (no name splitting needed)
        const user = await User.create({
            name,
            email,
            phone,
            password,
            role
        });

        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'User created successfully',
            user: userResponse
        });
    } catch (error) {
        console.error('Error creating user:', error);
        
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: 'Validation failed', errors });
        }

        res.status(500).json({ 
            message: 'Error creating user',
            error: error.message 
        });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { password, ...updateData } = req.body;

        if (password) {
            updateData.password = await bcrypt.hash(password, 12);
        }

        // Prevent email/phone duplication
        if (updateData.email || updateData.phone) {
            const existingUser = await User.findOne({
                $and: [
                    { _id: { $ne: req.params.id } }, // Not the current user
                    { $or: [
                        ...(updateData.email ? [{ email: updateData.email }] : []),
                        ...(updateData.phone ? [{ phone: updateData.phone }] : [])
                    ]}
                ]
            });

            if (existingUser) {
                return res.status(400).json({
                    message: existingUser.email === updateData.email
                        ? 'Email already in use'
                        : 'Phone number already in use'
                });
            }
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            message: 'User updated successfully',
            user
        });
    } catch (error) {
        console.error('Error updating user:', error);
        
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: 'Validation failed', errors });
        }

        res.status(500).json({ 
            message: 'Error updating user',
            error: error.message 
        });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ 
            message: 'Error deleting user',
            error: error.message 
        });
    }
};

// Deactivate user
const deactivateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deactivated successfully', user });
    } catch (error) {
        console.error('Error deactivating user:', error);
        res.status(500).json({ 
            message: 'Error deactivating user',
            error: error.message 
        });
    }
};

// Get user orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate('products.product', 'name brand price imageUrl cylinderSize')
            .sort({ createdAt: -1 });
        
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ 
            message: 'Error fetching orders',
            error: error.message 
        });
    }
};

// Get issued gases
const getUserIssuedGases = async (req, res) => {
    try {
        const userId = req.user.role === 'admin' ? req.params.id : req.user._id;
        
        const user = await User.findById(userId)
            .select('issuedGases')
            .populate('issuedGases.gasId', 'name brand price gasType cylinderSize');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.issuedGases);
    } catch (error) {
        console.error('Error fetching issued gases:', error);
        res.status(500).json({ 
            message: 'Error fetching issued gases',
            error: error.message 
        });
    }
};

// Return gas cylinder
const returnGasCylinder = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Authorization check
        if (req.user._id.toString() !== req.params.userId && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const issuedGas = user.issuedGases.find(
            gas => gas._id.toString() === req.params.issueId && !gas.returned
        );

        if (!issuedGas) {
            return res.status(404).json({ 
                message: 'Gas not found or already returned' 
            });
        }

        // Update gas status
        issuedGas.returned = true;
        issuedGas.returnedAt = Date.now();
        await user.save();

        // Update product stock
        await Product.findByIdAndUpdate(
            issuedGas.gasId,
            { $inc: { stockQuantity: 1 } }
        );

        res.json({ 
            message: 'Gas cylinder returned successfully',
            issuedGas 
        });
    } catch (error) {
        console.error('Error returning gas cylinder:', error);
        res.status(500).json({ 
            message: 'Error returning gas cylinder',
            error: error.message 
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    deactivateUser,
    getUserIssuedGases,
    returnGasCylinder,
    getMyOrders
};