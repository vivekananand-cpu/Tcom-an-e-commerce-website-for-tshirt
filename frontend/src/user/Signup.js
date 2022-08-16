import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../auth/helper';

import Base from '../core/Base';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });


    const { name, email, password, error, success } = values;

    const handleChange = name => event => {

        setValues({ ...values, error: false, [name]: event.target.value })

    }


    const onSubmit = (e) => {

        e.preventDefault();

        setValues({ ...values, error: false });

        signup({ name, email, password })

            .then(data => {

                if (data.error) {

                    console.log('the error is',data.error);

                    setValues({ ...values, error: data.error, success: false });

                } else {

                    setValues({

                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        error: "",
                        success: true

                    })
                }

            })
            .catch(err => console.log(err));


    }

    const successMessage = () => {
        return (
            <div className="text-green-400" style={{ display: success ? "" : "none" }}>

                <p>New account created successfully. please <Link to="/signin" className="text-blue-300">Login here</Link> </p>

            </div>
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
        <Base title="Sign up" description="A page for user to sign up!" >
        {successMessage()}
        {errorMessage()}
            <div className="w-full flex justify-center pt-10">

                <form className="">
                    <div className="flex flex-col justify-center w-[40vw] gap-3">
                        <div className="flex flex-col w-full gap-3">
                            <label className="font-bold" htmlFor="name">Name</label>
                            <input onChange={handleChange("name")} value={name} className="p-2 w-full rounded-lg text-black" name="name" type="text" />
                        </div>

                        <div className="flex flex-col w-full gap-3">
                            <label className="font-bold" htmlFor="name">Email</label>
                            <input onChange={handleChange("email")} value={email} className="p-2 w-full rounded-lg text-black" name="email" type="text" />
                        </div>

                        <div className="flex flex-col w-full gap-3">
                            <label className="font-bold" htmlFor="name">Password</label>
                            <input onChange={handleChange("password")} value={password} className="p-2 w-full rounded-lg text-black" name="password" type="text" />
                        </div>

                        <button onClick={onSubmit} className="p-2 bg-blue-400 rounded-lg mt-2 font-bold text-xl">Submit</button>
                    </div>

                </form>

            </div>

            <p>{JSON.stringify(values)}</p>

        </Base>
    )
};

export default Signup;
