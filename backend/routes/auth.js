const express = require('express');
const { signout, signup, signin, isLoggedIn } = require('../controllers/auth');
const { check } = require('express-validator');

const router = express.Router();


router.get('/signout', signout);

router.post('/signup', signup);

router.post('/signin',signin);

router.get('/test',isLoggedIn
       ,(req,res)=>{
            res.json(req.auth);
})


//  [

//     check('name', 'name should be of 3 chars').isLength({ min: 3 }),
//     check('email', 'email required').isEmail(),
//     check('password', 'password should be of 3 chars').isLength({ min: 3 })


// ],
module.exports = router;