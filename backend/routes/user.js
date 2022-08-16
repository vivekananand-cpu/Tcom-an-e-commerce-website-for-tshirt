const express = require('express');
const { isAuthenticated, isLoggedIn } = require('../controllers/auth');
const { getUserById, getUser, getAllUsers, updateUser, userPurchaseList } = require('../controllers/user');

const router = express.Router();

router.param('userId',getUserById);


router.get('/user/:userId',isLoggedIn,isAuthenticated,getUser);

router.put('/user/:userId',isLoggedIn,isAuthenticated,updateUser);

router.get('/orders/user/:userId',isLoggedIn,isAuthenticated,userPurchaseList);




router.get('/users',getAllUsers);



module.exports =router;