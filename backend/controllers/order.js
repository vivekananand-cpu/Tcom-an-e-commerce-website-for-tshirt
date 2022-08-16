

const {Order,ProductCart} = require('../models/product');

exports.getOrderById = async (req,res,next,id) =>{

    try{

        const order  = Order.findById(id)
        .populate('products.product','name price')

        req.order = order;

        next();

    }catch(err){
        res.status(400).json({
            error:"no order found"
        })
    }
};


exports.createOrder = async(req, res) => {

    try{
        req.body.order.user = req.profile;

        const order = new Order(req.body.order);
    
        await order.save();

        res.send(order);
        

    }catch(err){
        res.status(400).json({error:"failed to create order"})
    }

   


};


exports.getAllOrders = async (req, res) =>{

    try{

        const orders = await Order.find()
        .populate('user','_id name');
        if(!orders){
        res.status(400).json({error:"no order found"})
            
        }
        res.send(orders);
        
    }catch(err){
        res.status(400).json({error:"failed to get all orders"})
    }
};


exports.getOrderStatus = async (req, res) => {

    try{

        res.send(Order.schema.path('status').enumValues);

        
    }catch(err){
        res.status(400).json({error:"failed to get order status"})
    }
};

exports.updateOrderStatus = async (req, res) => {
    
    try{
        
        const updatedOrder = await Order.update(
            {_id:req.body.orderId},
            {$set:{status:req.body.status}}
        );

        res.send(updatedOrder);
        
    }catch(err){
        res.status(400).json({error:"failed to get order status"})
    }
}


// exports.getOrderStatus = async (req, res) => {
    
//     try{

        
//     }catch(err){
//         res.status(400).json({error:"failed to get order status"})
//     }
// }