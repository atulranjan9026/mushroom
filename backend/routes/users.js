const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

// Get user profile
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

// Update user profile
router.put('/profile', protect, async (req, res) => {
    try {
        const { name, phone, address, city, pincode } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, phone, address, city, pincode },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});

// Get all users (admin only)
router.get('/', protect, admin, getUsers);

// Get a single user (admin only)
router.get('/:id', protect, getUser);

// Update user role (admin only)
router.put('/:id', protect, updateUser);

// Delete user (admin only)
router.delete('/:id', protect, admin, deleteUser);

module.exports = router; 