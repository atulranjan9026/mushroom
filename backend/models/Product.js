const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: [0, 'Price cannot be negative'],
    },
    image: {
        type: String,
        required: [true, 'Please provide product image URL'],
    },
    stock: {
        type: Number,
        required: [true, 'Please provide product stock'],
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    category: {
        type: String,
        required: [true, 'Please provide product category'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 