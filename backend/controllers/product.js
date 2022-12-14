const Product = require('../models/product');

const _ = require('lodash');

const fs = require('fs');

const formidable = require('formidable');

const multer = require('multer');





exports.getProductById = async (req, res, next, id) => {

    try {

        const product = await Product.findById(id).populate("catagory");

        req.product = product;

        next();


    } catch (err) {
        res.status(400).json({ error: "no product found" });
    }

};


// creating a product with multer

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

exports.upload = multer({storage:storage})



exports.createProduct =async (req,res) =>{

    const {photo, price, name, description, catagory, stock } = req.body;

   

    try{
        console.log("name",name,photo);
        const newProduct = await Product.create({
        name,
        description,
        price,
        catagory,
        stock,
        photo:{
            data:fs.readFileSync(`uploads/${req.file.filename}`),
            contentType:"image/png"
        }

    })

    res.send(newProduct)
    console.log('product creared');

    }catch(error){

        res.status(400).json({error:"failed to save product"})
    }

    


}

exports.getProduct = (req,res) =>{
    try{

        req.product.photo = undefined;

       res.send(req.product);

    }catch (err) {
        res.status(400).json({ error: "failed to get product" });
    }
}

// middleware

exports.photo = (req,res,next) =>{

    if(req.product.photo.data){

        res.set('Content-Type',req.product.photo.contentType);
        res.send(req.product.photo.data);

    }
    next();
}



exports.deleteProduct = async (req,res) =>{

    try{

        let product = req.product;

        const deletedProduct = await product.remove();

        res.json({success: "deleted",deletedProduct});

    }catch (err) {
        res.status(400).json({ error:"failed to delete"})
    }


}

exports.updateProduct = async (req,res) =>{

    try{

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, async(err, fields, file) => {
           
            if (err) return res.status(400).json({
                error: "problem with image"
            })
           
           

          
            //updation code 

            let product = req.product;
            product = _.extend(product,fields);
            //handle file here

            if (file.photo) {
                if (file.photo.size > 3000000) {
                    return res.status(400).json({ error: "file too large" })
                }
                product.photo.data = fs.readFileSync(file.photo.filepath);

                product.photo.contentType = file.photo.mimetype;

            };

            //save to db 

            let newProduct = await product.save();
            
            if (!newProduct) {
                res.status(400).json({ error: "failed to update product" })
            }

            return res.send(newProduct);




        });


    }catch (err) {

        res.status(400).json({ error:"failed to update"})
    }
    
};


exports.getAllProducts = async (req, res) => {
    //we are taking limit from user

    let limit = parseInt(req.query.limit) || Infinity;

    let sortBy = req.query.sortBy || "_id";

   try{

    const products = await Product
    .find()
    .populate("catagory")
    .select("-photo")
    .sort([[sortBy,'asc']])
    .limit(limit)


    res.send(products);

   }catch(err){

       res.status.json({ err:"no product found"});

   }
    
};

exports.getAllUniqueCatagories = async(req, res) => {

    try{

        const categories = await Product.distinct('catagory');

        res.send(categories);

    }catch(err){
        res.status(400).json({ err:"failed to get all categories"});
    }
}


exports.updateStock = (req, res,next) => {

    let myOperations = req.body.order.products.map((product)=>{

        return {

            updateOne:{
                filter:{_id:product._id},
                update:{$inc : {stock : -product.count , sold: +product.count}}
            }
        }
    });

     Product.bulkWrite(myOperations,{},(err,products)=>{

         if(err){
             return res.status(400).json({error:"bulk operations failed"})
         }

         next();
     })

};