const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production', {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    
    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
    try {
        // console.log('Registration request body:', req.body);
        
        const { name, email, password, passwordConfirm, address, phone, city, pincode, role } = req.body;

        // 1) Check if passwords match
        if (password !== passwordConfirm) {
            console.log('Password mismatch');
            return next(new AppError('Passwords do not match', 400));
        }

        const userData = {
            name,
            email,
            password,
            address,
            phone,
            city,
            pincode
        };

        const newUser = await User.create(userData);
        console.log('User created successfully:', newUser);

        // 3) Generate token and send response
        createSendToken(newUser, 201, res);
    } catch (error) {
        console.error('Registration error details:', {
            message: error.message,
            code: error.code,
            name: error.name,
            stack: error.stack,
            errors: error.errors
        });
        
        if (error.code === 11000) {
            return next(new AppError('This email is already registered. Please use a different email or try logging in.', 400));
        }
        return next(new AppError(error.message || 'Error creating user', 500));
    }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// @desc    Update password
// @route   PATCH /api/auth/updatePassword
// @access  Private
exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
        return next(new AppError('Your current password is wrong', 401));
    }

    // 3) If so, update password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();

    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
});