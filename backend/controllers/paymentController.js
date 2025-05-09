const Razorpay = require('razorpay');
const Order = require('../models/Order');
const User = require('../models/User');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order
exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = 'INR' } = req.body;

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: `order_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating payment order'
        });
    }
};

// Verify payment and create order
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = req.body;

        // Verify payment signature
        const crypto = require('crypto');
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Create order in database
            const order = await Order.create({
                user: req.user._id,
                items: orderData.items,
                totalAmount: orderData.totalAmount,
                shippingAddress: orderData.shippingAddress,
                paymentMethod: 'card',
                paymentId: razorpay_payment_id,
                status: 'processing'
            });

            // Update user's orders
            await User.findByIdAndUpdate(
                req.user._id,
                { $push: { orders: order._id } }
            );

            res.json({
                success: true,
                message: 'Payment successful',
                order
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid payment signature'
            });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing payment'
        });
    }
}; 