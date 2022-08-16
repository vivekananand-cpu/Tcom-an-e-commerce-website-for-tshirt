const User = require('../models/user');
const Order = require('../models/order');

exports.getUserById = async (req, res, next, id) => {


    try {

        const user = await User.findById(id);

        if (!user) {
            res.status(400).json({
                error: "no user found"
            })
        };

        req.profile = user;

        next();



    } catch (err) {
        res.status(400).send(err);
    }
};


exports.getUser = (req, res) => {

    //to get by here for password
    req.profile.salt = undefined;
    req.profile.password = undefined;

    res.json(req.profile);

}


exports.getAllUsers = async (req, res) => {

    try {

        const users = await User.find();

        if (!users) {
            res.status(400).json({ message: "no users found" });
        }

        res.send(users);

    } catch (err) {
        res.status(400).send(err);
    }
};


exports.updateUser = async (req, res) => {


    try {

        const user = await User.findByIdAndUpdate(

            { _id: req.profile._id }
            , { $set: req.body },
            { new: true, useFindAndModify: false });



        if (!user) {
            res.status(400).json({ message: "not allowed" })
        }

        user.salt = undefined;
        user.password = undefined;

        res.send(user);



    } catch (err) {
        res.status(400).send(err);
    }
};


exports.userPurchaseList = async (req, res) => {

    try {

        const order = await Order.find({ user: req.profile._id })
            .populate('user', "_id name email");

        if (!order) {
            res.status(400).json({ message: "no orders" })
        }

        res.send(order);

    } catch (err) {
        res.status(400).send(err);
    }
};


exports.pushOrderInPurchaseList = async (req, res, next) => {
    try {

        let purchases = [];

        req.body.products.forEach(product => {
            purchases.push({
                
                _id: product._id,
                name: product.name,
                description: product.description,
                catagory: product.catagory,
                quantity: product.quantity,
                amount: req.body.order.amount,
                transaction_id: req.body.order.transaction_id

            })
        });

        //store this in db
        const purchaseslist = await User.findOneAndUpdate(
            {
                _id: product._id
            },
            { $push: { purchases: purchases } },
            { new: true, useFindAndModify: false }
        );

        if (!purchases) {
            res.status(400).json({ error: "unable to save product" });
        }

        next();

    } catch (err) {
        res.status(400).send(err);
    }

}