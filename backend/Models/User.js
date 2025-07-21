const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    phonenumber: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10,15}$/.test(v); // Basic phone number validation
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    issuedGases: [{
        gasId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        issuedAt: {
            type: Date,
            default: Date.now
        },
        returned: {
            type: Boolean,
            default: false
        },
        returnedAt: Date
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        // Clean phone number before saving
        if (this.isModified('phonenumber')) {
            if (this.phonenumber) {
                this.phonenumber = this.phonenumber.replace(/\D/g, ''); // Remove all non-digit characters
            }
        }
        
        this.password = await bcrypt.hash(this.password, 12);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);