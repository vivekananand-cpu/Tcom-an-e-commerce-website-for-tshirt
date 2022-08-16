
const express  =require('express');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getOrderById, createOrder, getAllOrders } = require('../controllers/order');
const { updateStock } = require('../controllers/product');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');



const router = express.Router();


//params

router.param('userId', getUserById);
router.param('orderId', getOrderById);


router.post(
    '/order/create/:userId',
    isLoggedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
    );


router.get('/order/all/:userId', isLoggedIn, isAuthenticated,isAdmin,getAllOrders);


module.exports = router;