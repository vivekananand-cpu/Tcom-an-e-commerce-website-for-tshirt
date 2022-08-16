
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const { validationResult } = require('express-validator');
const { expressjwt } = require("express-jwt");

 
 
 


exports.signup = async(req,res)=>{


    const {email,password,name} = req.body;
    try{

       

        if(!(email && password && name)){

            return res.status(400).json({error:"please fill all the data"});
        }

        const existingUser = await User.findOne({email});

        if(existingUser){

            res.status(400).send("user already exists");
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await  User.create({
            name,
            email,
            password:hashPassword

        });
       
        res.json({

            id:user._id,
            name:user.name,
            email:user.email,
           

        });

    }catch(error){

        res.status(500).json({error:"please fill all data"});
        
    }
};


exports.signin = async(req,res)=>{
    
    try{

        const {email,password} = req.body;

        if(!(email && password)){

        res.status(400).json({error:"fill all fields"});

        }

        const existingUser = await User.findOne({email});

        if(!existingUser){
            res.status(400).json({
                error:"user does not exists"
            })
        }

        const passwordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!passwordCorrect){
            res.status(400).json({

                error:"Wrong Credentials"
            })
        }


        //setting token

        const token = jwt.sign({_id:existingUser._id},process.env.JWT_SECRET);

        //put token in cookie

        res.cookie('token',token,{expire:new Date()+9999});

        //send res to frontend

        const {_id,name,email:userEmail,role} = existingUser;

        res.json({
            token,
            user:{
                _id,
                name,
                userEmail,
                role

            }
        })

    }catch(err){
        res.status(400).json({error:"Wrong credentials"});
    }
}


exports.signout = (req,res)=>{

    res.clearCookie('token');

    res.json({message:'user signed out'});
};

//protected routes


exports.isLoggedIn =  expressjwt({
   

    secret:process.env.JWT_SECRET, 
    algorithms: ["HS256"] ,
    userProperty:'auth'
});




exports.isAuthenticated = (req,res,next) =>{
   
 
    //profile is from frontend
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    
    if(!checker){
        
        return res.status(403).json({
            error:"access denied"
        })
    }
    next();
};


exports.isAdmin = (req,res,next) =>{

    if(req.profile.role ===0){
        return res.status(403).json({
            error:"You are not Admin"
        })
    }
    
    next();


}