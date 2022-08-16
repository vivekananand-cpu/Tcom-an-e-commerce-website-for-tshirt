import React from 'react'
import { Link } from 'react-router-dom'

const AdminLeft = () => {
    return (
        <>
            <div className="w-full text-center border-[1px] border-gray-500 rounded-md p-2 ">
                <div className="  rounded-lg p-2">
                    <h4 className="font-bold text-xl text-green-400">Admin Navigation</h4>
                </div>

                <div className="w-full mt-3">

                    <ul className="flex flex-col gap-5  w-full">


                        <Link to="/admin/create/catagory">
                            <li className="rounded-md hover:bg-gray-700 font-bold bg-gray-800  p-3 text-blue-300 w-full">
                                Create Categories
                            </li>


                        </Link>

                        <Link to="/admin/catagories">
                            <li className="rounded-md hover:bg-gray-700 font-bold bg-gray-800  p-3 text-blue-300 w-full">
                                Manage Categories
                            </li>


                        </Link>

                        <Link to="/admin/create/product">
                            <li className="rounded-md hover:bg-gray-700 font-bold bg-gray-800  p-3 text-blue-300 w-full">
                                Create Product
                            </li>


                        </Link>

                        <Link to="/admin/products">
                            <li className="rounded-md hover:bg-gray-700 font-bold bg-gray-800  p-3 text-blue-300 w-full">
                                Manage Products
                            </li>


                        </Link>

                        <Link to="/admin/orders">
                            <li className="rounded-md hover:bg-gray-700 font-bold bg-gray-800  p-3 text-blue-300 w-full">
                                Manage Orders
                            </li>


                        </Link>


                        

                    </ul>

                </div>
            </div>
        </>
    )
}

export default AdminLeft
