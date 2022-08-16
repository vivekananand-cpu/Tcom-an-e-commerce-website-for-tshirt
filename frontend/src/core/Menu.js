import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';

import { useNavigate } from 'react-router-dom';

const navClasses = "hover:text-gray-400 text-blue-300";

const currentTab = (path) => {

    if (window.location.pathname === path) {

        return { color: "white" }

    } else {

        return { color: "" }
    }
}




const Menu = () => {

    const history = useNavigate();
    return (
        <div className="w-screen p-5 border-b-[1px] border-gray-500">
            <ul className="flex gap-4 font-bold">
                <li className={navClasses}>

                    <Link style={currentTab('/')} to="/">Home</Link>
                </li>
                <li className={navClasses}>

                    <Link style={currentTab('/cart')} to="/cart">Cart</Link>
                </li>

                {
                    isAuthenticated() && isAuthenticated().user.role === 0 && (

                        <li className={navClasses}>
                            <Link style={currentTab('/user/dashboard')} to="/user/dashboard">User Dashboard</Link>
                        </li>
                    )
                }


                {
                    isAuthenticated() && isAuthenticated().user.role === 1 && (

                        <li className={navClasses}>
                            <Link style={currentTab('/admin/dashboard')} to="/admin/dashboard">Admin Dashboard</Link>
                        </li>
                    )
                }
                {
                    !isAuthenticated() && (
                        <>
                            <li className={navClasses}>
                                <Link style={currentTab('/signup')} to="/signup">Signup</Link>
                            </li>
                            <li className={navClasses}>
                                <Link style={currentTab('/signin')} to="/signin">Sign In</Link>
                            </li>
                        </>
                    )
                }

                {isAuthenticated() && (
                    
                    <li className={navClasses}>

                        <span className="cursor-pointer text-red-400"

                            onClick={() => {
                                signout(() => {
                                    history('/')

                                })
                            }} style={currentTab('/signout')} to="/signout">Sign out</span>
                    </li>
                )}


            </ul>
        </div>
    )
}

export default Menu
