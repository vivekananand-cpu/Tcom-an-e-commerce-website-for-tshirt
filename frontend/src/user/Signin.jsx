import React, { useState } from 'react';
import { authenticate, isAuthenticated, signin } from '../auth/helper';

import Base from '../core/Base';

import {Navigate,Link} from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {

    const [values,setValues] = useState({

        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false,

    });

    const {email,password,error,didRedirect,loading} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event =>{

        setValues({...values,[name]:event.target.value});

    }

    const onSubmit = (e) =>{

        e.preventDefault();
        
        setValues({...values,loading:true})

        signin({email,password})

        .then(data=>{

            if(data.error){


                setValues({...values,error:data.error,loading:false})

                toast.error("fill all the data")


            }else{

               authenticate(data, ()=>{
                   setValues({
                       ...values,
                       didRedirect:true
                   })
               })
            }
        })
        .catch(err=>console.error("req failed"))

    };

    const performRedirect = ()=>{
       
        if(didRedirect){
            if(user && user.role==1){

                return <Navigate to="/admin/dashboard" />
            }
            else{
                return <Navigate to="/user/dashboard" />
            } 

           
        }

        if(isAuthenticated()){
            return <Navigate to='/' />
        }
    }


    const successMessage = () => {
        return (
            <div className="text-green-400" style={{ display: loading ? "" : "none" }}>

                <p>Logged in successfully. </p>

            </div>
        )


    }

    const loadingMessage =() =>{
        return(
            loading && (
                <div >
                    loading ...
                </div>
            )
        )
    }


    const errorMessage = () => {

        return (
            <div className="text-red-500" style={{ display: error ? "" : "none" }}>

                {error}

            </div>
        )
    }


    return (
        <Base title="Sign in" description="A page for user to sign in!" >
        {loadingMessage()}
        <ToastContainer />
        {/* {errorMessage()} */}

            <div className="w-full flex justify-center pt-10">

                <form className="">
                    <div className="flex flex-col justify-center w-[40vw] gap-3">
                       
                        <div className="flex flex-col w-full gap-3">
                            <label className="font-bold" htmlFor="email">Email</label>
                            <input onChange={handleChange("email")} value={email} className="p-2 w-full rounded-lg text-black" name="email" type="text" />
                        </div>

                        <div className="flex flex-col w-full gap-3">
                            <label className="font-bold" htmlFor="password">Password</label>
                            <input onChange={handleChange("password")} value={password} className="p-2 w-full rounded-lg text-black" name="name" type="text" />
                        </div>

                        <button onClick={onSubmit} className="p-2 bg-blue-400 rounded-lg mt-2 font-bold text-xl">Login</button>
                    </div>

                </form>

            </div>

            
            {performRedirect()}
        </Base>
    )
}

export default Signin
