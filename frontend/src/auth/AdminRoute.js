import React from 'react';

import {Route,Navigate} from 'react-router-dom';


import { isAuthenticated } from './helper';




const AdminRoute =({Child}) => {

  return isAuthenticated() && isAuthenticated().user.role==1  ? <Child /> : <Navigate to='/signin' />
    
      
      
    
  
}

export default AdminRoute;