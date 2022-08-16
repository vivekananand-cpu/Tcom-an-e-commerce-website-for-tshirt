const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },

    lastname:{

        type:String,
        trim:true,
        maxlength:32,
       

    },

    email:{

        type:String,
        required:true,
        trim:true,
        unique:true
        
    },

    userInfo:{
        type:String,
        trim:true

    },

    password:{
        type:String,
        trim:true,
        required:true

    },

    salt:String,

    role:{
        type:Number,
        default:0
    },

    purchases : {
        type:Array,
        default:[]
    }
},{timestamps:true})

module.exports = mongoose.model('user',userSchema);
