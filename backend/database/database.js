const mongoose = require('mongoose');
const express = require('express');

const {DB} = process.env;

const connect = async()=>{
    try{
        await mongoose.connect(DB);
        console.log('connected to database');


    }catch(err){
        console.log(err);
    }
}


module.exports = connect;