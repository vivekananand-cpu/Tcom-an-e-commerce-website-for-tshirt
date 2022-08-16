const express = require('express');

const router = express.Router();


const { getUserById } = require('../controllers/user');

const { isAuthenticated, isLoggedIn, isAdmin } = require('../controllers/auth');
const { getCatagoryById, createCatagory, getCatagory, getAllCatagory, updateCatagory, removeCatagory } = require('../controllers/catagory');


router.param('userId', getUserById);

router.param('catagoryId', getCatagoryById);

//actual routes


//create route
router.post(

    "/catagory/create/:userId",
    isLoggedIn,
    isAuthenticated,
    isAdmin,
    createCatagory
);

//read route

router.get('/catagory/:catagoryId',getCatagory);
router.get('/catagories',getAllCatagory);

//update route

router.put(

    "/catagory/:catagoryId/:userId",
    isLoggedIn,
    isAuthenticated,
    isAdmin,
    updateCatagory
);


//delete route


router.delete(

    "/catagory/:catagoryId/:userId",
    isLoggedIn,
    isAuthenticated,
    isAdmin,
    removeCatagory
);


module.exports = router;