import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { createCatagory } from '../auth/helper/adminapicalls';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import Base from '../core/Base';



const AddCatagory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = (event) => {

        setError("");

        setName(event.target.value);


    };

    

    const onSubmit = (event) => {

        event.preventDefault();

        createCatagory(user._id, token, { name })

            .then(data => {

                if (data.error) {

                    setError(true);

                    toast.error("Failed to create Category")
                }

                else {
                    setError("");

                    setSuccess(true);

                    toast.success("Category created successfully");

                    setName('')


                }
            })


    }


    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <Base title="Create a Category here"
                description="Add a new catagery for new product"
                className="p-2  w-[40%] h-full rounded-md "
            >

                <div className="w-full flex justify-center h-full p-5 border border-gray-600 rounded-md">
                    <form className="h-full w-full flex flex-col gap-4">

                        <div className="flex justify-center">
                            <p className="font-bold text-green-400 text-xl">Enter the Catagery</p>
                        </div>

                        <div className="">


                            <input value={name} type="text" required placeholder="eg. Summer"

                                onChange={handleChange}
                                className=" p-2 bg-gray-700 border-[1px] focus:border-[2px] font-bold border-blue-300 focus:border-blue-200  w-full text-cyan-200 rounded-md focus:outline-0" />


                        </div>

                        <div className="w-full flex justify-center mt-5">
                            <button
                                onClick={onSubmit}
                                className="p-2 bg-gray-800 border-[1px] border-cyan-200 font-bold rounded-lg w-[300px]">Create Catagery</button>
                        </div>


                    </form>
                </div>

            </Base>

        </>
    )
}

export default AddCatagory
