const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/:id', getProduct);

// Protect all routes below this middleware
router.use(protect);

// Restrict routes below to admin only
router.use(restrictTo('admin'));

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router; 