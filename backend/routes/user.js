const express = require('express');
const { signupUser, loginUser, getAllUsers,blockUser, deleteUser, addToCart,getCart, removeFromCart, clearCart, adjustCartQuantity, updateUserDetails, getUserDetails } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/signup', signupUser);

// Protected routes
router.use(requireAuth);

router.get('/me', getUserDetails);
router.put('/me', updateUserDetails);

router.post('/cart', addToCart);
router.get('/cart', getCart);

router.post('/cart/remove', removeFromCart);
router.post('/cart/clear', clearCart);

router.post('/cart/adjust', adjustCartQuantity);


router.get('/all', getAllUsers);
router.delete('/:id', deleteUser);
router.patch('/block/:id', blockUser);

module.exports = router;

