import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import { createProduct, getAllCatagories } from '../auth/helper/adminapicalls';
import Base from '../core/Base';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';






const CreateProduct = () => {

    const {user,token} = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo:"",
        catagories:[],
        catagory:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirect:false,
        formData :""
    })

    const { name, description, price, stock,
        catagories,catagory,loading,error,
        createdProduct,getRedirect,formData } = values;



        





    
    const handleChange = name => event => {

        const value = name ==="photo" ? event.target.files[0] : event.target.value;

        formData.set(name,value);

        setValues({...values,[name]:value})
    
    
    
        };


    const preload = () =>{

      

        getAllCatagories().then(data =>{

            if(data.error){

                setValues({...values,error:data.error})

               
            }else{

                setValues({...values,catagories:data });

               
            }
        })

      
    }

    const onSubmit = (e) => {

        e.preventDefault();

        setValues({...values,error:"",loading:true});

        createProduct(user._id,token,values)

        .then(data =>{
            if(data.error){

                setValues({...values,error:data.error});
                toast.error(`something went wrong`)
            }else{

                setValues({...values,
                    name:"",
                    description:"",
                    price:"",
                    stock:"",
                    loading:false,
                    catagory:"",
                    createdProduct:data.name
            })

            toast.success("Product created successfully")
            }
        })

    };

    



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
                                <input onChange={handleChange("photo")} type="file" />
                            </div>

                            <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <input onChange={handleChange("name")} value={name} type="text" placeholder="Name  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>

                            <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <textarea onChange={handleChange("description")} value={description} placeholder="Description  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>
                            
                            <div className="bg-gray-800 hover:bg-gray-700 p-2 w-full flex  rounded-lg">
                                <input onChange={handleChange("price")} type="text" value={price} placeholder="Price  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>

                            <div className="bg-gray-800 flex flex-col gap-2 hover:bg-gray-700 p-2 w-full   rounded-lg">
                                <label htmlFor="catagory" className="font-bold text-gray-400">Category</label>


                                <select onChange={handleChange("catagory")}  name="catagory" id="" className="w-full p-2 focus:outline-none rounded-lg  font-bold text-cyan-300 bg-gray-600 border-cyan-200">
                                    
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
                                <input onChange={handleChange("stock")} value={stock} type="text" placeholder="Stock  " className="w-full p-2 focus:outline-none rounded-lg border-[1px] font-bold text-cyan-300 bg-gray-800 border-cyan-200" />
                            </div>

                            <button onClick={onSubmit}>Create Product</button>


                        </div>
                    </div>

                  

                </form>
               

             {JSON.stringify(formData)}
            </Base>
        </>
    )
}

export default CreateProduct
