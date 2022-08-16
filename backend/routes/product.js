const express = require('express');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCatagories } = require('../controllers/product');
const { getUserById } = require('../controllers/user');

const router = express.Router();

//all are params 
router.param('userId',getUserById);
router.param('productId',getProductById);

//actual routes


router.post('/product/create/:userId/',isLoggedIn,isAuthenticated,isAdmin,createProduct);

router.get('/product/:productId',getProduct);

router.get('/product/photo/:productId',photo);

router.delete('/product/:productId/:userId',isLoggedIn, isAuthenticated, isAdmin,deleteProduct);

router.put('/product/:productId/:userId',isLoggedIn, isAuthenticated, isAdmin,updateProduct);

router.get('/products',getAllProducts);

router.get('/products/catagories',getAllUniqueCatagories);



module.exports = router;
