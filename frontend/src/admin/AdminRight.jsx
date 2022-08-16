import React from 'react';
import { isAuthenticated } from '../auth/helper';



const AdminRight = () => {

    const { user :{name , userEmail}} = isAuthenticated();

    


    return (
        <>
            <div className='flex  flex-col p-3'>
                <div className="w-full justify-center flex">
                    <h1 className="text-xl text-yellow-400 font-bold">
                        Admin Information

                    </h1>
                </div>

                <div className="mt-5 flex flex-col gap-3">

                    <div className="flex gap-3 bg-gray-800 p-3 rounded-md hover:bg-gray-700">
                        <p className="text-cyan-300 font-bold">name :</p>
                        <p>{name}</p>
                    </div>

                    <div className="flex gap-3 bg-gray-800 p-3 rounded-md hover:bg-gray-700">
                        <p className="text-cyan-300 font-bold">email :</p>
                        <p>{userEmail}</p>
                    </div>


                    <div className="flex gap-3 bg-red-800 p-3 rounded-md hover:bg-red-700">
                        <p className="text-gray-300 font-bold">Admin Area</p>
                       
                    </div>

                  

                </div>
            </div>
        </>
    )
}

export default AdminRight
