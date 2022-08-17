const express = require('express');
require('dotenv').config();
const connect= require('./database/database');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//my routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const catagoryRoutes = require('./routes/catagory');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');






const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cookieParser());



app.use('/api',authRoutes);
app.use('/api/',userRoutes);
app.use('/api/',catagoryRoutes);
app.use('/api/',productRoutes);
app.use('/api/',orderRoutes);





connect();

const {PORT} = process.env;





const admin = (req,res)=>{
    try{
        res.send('hello admin')

    }catch(err){
        res.status(500).send(err);
    }
}

const isAdmin = (req,res, next)=>{
    console.log('is admin running');
    next();
}

app.get('/',(req,res)=>{
    res.send("hello from server")
})


app.get('/admin',isAdmin,admin);



app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})