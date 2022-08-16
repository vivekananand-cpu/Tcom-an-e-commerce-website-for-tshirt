import React from 'react';

import {Route,Navigate} from 'react-router-dom';

import { isAuthenticated } from './helper';




const PrivateRoute =({Child}) => {

  return (
   


   isAuthenticated() &&isAuthenticated().user.role==0 ? <Child /> : <Navigate to='/signin' />
  
    
    
  


  );
}

export default PrivateRoute;