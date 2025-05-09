const express = require('express');
const router = express.Router();
const {
    getOrders,
    getUserOrders,
    getOrder,
    createOrder,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, getUserOrders);
router.get('/:id', protect, getOrder);
router.post('/', protect, createOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router; 