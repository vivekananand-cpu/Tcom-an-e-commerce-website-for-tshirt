import React, { useEffect, useState } from 'react'
import { toast ,ToastContainer} from 'react-toastify';
import { isAuthenticated } from '../auth/helper';
import { deleteProduct, getAllProducts } from '../auth/helper/adminapicalls';
import Base from '../core/Base'

const ManageProducts = () => {


    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {

        getAllProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);

                setProducts(data);
            }
        })
    };

    const deleteThisProduct = (productId) =>{

        deleteProduct(productId,user._id,token)
        .then(data =>{
            if(data.error){
                toast.error(data.error);
            }else{
                toast.success('Product deleted');
                preload();
            }
        })
    

    }


    useEffect(() => {

        preload();
    }, []);



    return (
        <><ToastContainer />
            <Base title="Manage Products" className="w-[80%]">
                <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex justify-center">
                        <h1 className="text-2xl font-bold text-green-400">Total {products.length} Products</h1>
                    </div>
                    {
                        products.map((product) => (

                            <div key={product._id} className="w-full mb-3 mt-4 flex justify-between bg-gray-700 p-5 rounded-lg">
                                <p className="font-bold text-xl text-blue-300">{product.name}</p>

                                <p className="bg-green-600 cursor-pointer font-bold p-2 rounded-lg ">Update</p>

                                <p onClick = {()=>deleteThisProduct(product._id)}
                                className="bg-red-600 cursor-pointer font-bold p-2 rounded-lg ">Delete</p>

                            </div>
                        ))
                    }
                </div>


            </Base>
        </>
    )
}

export default ManageProducts;
