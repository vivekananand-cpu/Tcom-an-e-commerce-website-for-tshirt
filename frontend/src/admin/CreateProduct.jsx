import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import { createProduct, getAllCatagories } from '../auth/helper/adminapicalls';
import Base from '../core/Base';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';






const CreateProduct = () => {

    const {user,token} = isAuthenticated();

    // const [values, setValues] = useState({
    //     name: "",
    //     description: "",
    //     price: "",
    //     stock: "",
    //     photo:"",
    //     catagories:[],
    //     catagory:"",
    //     loading:false,
    //     error:"",
    //     createdProduct:"",
    //     getRedirect:false,
    //     formData : []
       
    // })

    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [stock,setStoke] = useState('');
    const [photo,setPhoto] = useState('');
    const [catagories,setCatagories] = useState([]);
    const [catagory,setCatagory] = useState('');
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [createdProduct,setCreatedProduct] = useState('');
    const [getRedirect,setGetRedirect] = useState(false);

    const [file,setFile] = useState([]);

    const [formData,setFormData] = useState(new FormData());


    // const { name, description, price, stock,
    //     catagories,catagory,loading,error,
    //     createdProduct,getRedirect ,formData} = values;

         

       

        





    
    // const handleChange = name => event => {

    //     const value = name ==="photo" ? event.target.files[0] : event.target.value;

    //     formData.append(name,value);

    //     setValues({...values,[name]:value})
    
    
    
    //     };




    const preload = () =>{

      

        getAllCatagories().then(data =>{

            if(data.error){

                // setValues({...values,error:data.error})
                setError(data.error)

               
            }else{

                // setValues({...values,catagories:data });
                setCatagories(data)

               
            }
        })

      
    }

    // const onSubmit = (e) => {

    //     e.preventDefault();

    //     setValues({...values,error:"",loading:true});

    //     createProduct(user._id,token,values)

    //     .then(data =>{
    //         if(data.error){

    //             setValues({...values,error:data.error});
    //             toast.error(`something went wrong`)
    //         }else{

    //             setValues({...values,
    //                 name:"",
    //                 description:"",
    //                 price:"",
    //                 stock:"",
    //                 loading:false,
    //                 catagory:"",
    //                 createdProduct:data.name
    //         })

    //         toast.success("Product created successfully")
    //         }
    //     })

    // };

    const  onSubmit =(e) =>{

        e.preventDefault();

        setFormData({...formData,

            "name":name,
            "description":description,
            "price":price,
            "stock":stock,
            "photo":photo,
            "catagory":catagory
    });

    console.log(formData);

    setLoading(true);

    createProduct(user._id,token,formData)
    .then(data=>{

        if(data.error){
            setError(data.error);
            console.log(error);
            toast.error("something went wrong");

        }else{
            
            toast.success("product created successfully")
        }
    })

        



    } 

    


   

    



    useEffect(()=>{

        preload();

    },[])



    return (
        <><ToastContainer />
            <Base title="Add a Product"
                className="p-2  w-[60%] rounded-md   "
                description="here you can add your product">


                <form>

                    <div className="border-[1px] flex flex-col gap-3 border-gray-600 rounded-md">
                        <div className="w-full flex justify-center mt-3">
                            <h1 className="text-xl font-bold text-green-300">Post photo</h1>
                        </div>

                        <div className="w-full flex flex-col items-center gap-3">

                            <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex justify-center rounded-lg">
                                <input onChange={(e)=>setPhoto(e.target.files[0])} type="file" />
                            </div>

                             <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Name  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>

                          <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <textarea onChange={(e)=>setDescription(e.target.value)} value={description} placeholder="Description  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>
                            
                            <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <input onChange={(e)=>setPrice(e.target.value)} type="text" value={price} placeholder="Price  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>

                            <div className="bg-gray-800 flex flex-col gap-2 hover:bg-gray-700 p-2 w-full   rounded-lg">
                                <label htmlFor="catagory" className="font-bold text-gray-400">Category</label>


                                <select onChange={(e)=>setCatagory(e.target.value)}  name="catagory" id="" className="w-full p-2 focus:outline-none rounded-lg  font-bold text-cyan-300 bg-gray-600 border-cyan-200">
                                    
                                     <option >Select</option>
                                    {
                                        catagories && 
                                        catagories.map((cat)=>(
                                            <option key={cat._id} value={cat._id}  >{cat.name}</option>
                                        ))
                                    }

                                </select>
                            </div>
                            <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <input onChange={(e)=>setStoke(e.target.value)} value={stock} type="text" placeholder="Stock  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>

                            <button onClick={(e)=>onSubmit(e)}>Create Product</button> 


                        </div>
                    </div>

                  

                </form>
               
                {
                    JSON.stringify(formData)
                }
            </Base>
        </>
    )
}

export default CreateProduct
