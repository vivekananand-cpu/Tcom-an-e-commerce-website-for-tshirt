
const Catagory = require('../models/catagory');


exports.getCatagoryById = async (req, res, next, id) => {

    try {

        const catagory = await Catagory.findById(id);

        if (!catagory) {
            res.send(400).json({ error: "catagory not found" });
        };

        req.catagory = catagory;

        next();


    } catch (err) {
        res.status(400).send(err);
    }

};


exports.createCatagory = async(req, res) => {

    try{

        if(!req.body){

         res.status(400).json({error:"Catagery name is required"});


        }

        const catagory = await Catagory.create(req.body);

        res.json(catagory);

    }catch(error){
        res.status(400).json({error:"Catagery name is required"});
    }
};


exports.getCatagory =(req,res) =>{

    res.send(req.catagory);
   
};


exports.getAllCatagory =async(req,res) =>{

    try{

        const catagories = await Catagory.find();

        res.json(catagories);



    }catch(err){

        res.status(400).json({error:"no catagory found"});
    }
   
};

exports.updateCatagory = async (req,res)=>{

    try{

        const catagory = req.catagory;

        catagory.name = req.body.name;

        const updatedCatagory = await catagory.save();

        res.send(updatedCatagory);

    }catch(err){
        res.status(400).send("cannot update");

    }
};


exports.removeCatagory = async(req,res)=>{
    try{

        const catagory = req.catagory;

        await catagory.remove();


        res.json({message:"succesfuly deleted"});


    }catch(err){
        res.status(400).send(err);
    }
}