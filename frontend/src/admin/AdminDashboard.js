import React from 'react';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import AdminLeft from './AdminLeft';
import AdminRight from './AdminRight';



const AdminDashboard = () => {

    const { user: { name, email, role } } = isAuthenticated();

    return (
        <div>
            <Base title="Welcome to Admin area"
            className="p-2  w-[80%] rounded-md  "
             description="manage all of your product here">

                <div className="w-full max-h-full flex gap-5">
                    <div className="w-[30%] " >
                        <AdminLeft />

                    </div>

                    <div  className="w-[70%] max-h-full border-[1px] border-gray-500 rounded-md">
                   
                        <AdminRight />
                       
                    </div>
                </div>
            </Base>
        </div>
    )
}

export default AdminDashboard;
