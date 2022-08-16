const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema;


const ProductCartSchema = new mongoose.Schema({

    product:{
        type:ObjectId,
        ref:"product"
    },

    name:String,

    count:Number,

    price:Number
})

const ProductCart = mongoose.model('productCart',ProductCartSchema);


const orderSchema = new mongoose.Schema({
    
    products : [ProductCartSchema],

    transaction_id : {},

    amount : Number,

    address : String,

    updated : Date,

    status:{
        type:String,

        default:"Recieved",
        
        enum:['Cancelled' ,'Delivered','Shipped','Processing' ,'Recieved']
    },

    user : {
        type:ObjectId,
        ref : "user"
    }

},{timestamps:true});


const Order = mongoose.model('order',orderSchema);



module.exports = {ProductCart,Order};