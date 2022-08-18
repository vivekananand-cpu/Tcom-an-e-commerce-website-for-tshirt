
import { Routes, Route } from "react-router-dom";
import AddCatagory from "./admin/AddCatagory";
import AdminDashboard from "./admin/AdminDashboard";
import CreateProduct from "./admin/CreateProduct";
import ManageCatagories from "./admin/ManageCatagories";
import ManageProducts from "./admin/ManageProducts";
import  AdminRoute  from "./auth/AdminRoute";
import PrivateRoute from "./auth/PrivateRoutes";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signout from "./user/Signout";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";



function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/signin" element={<Signin />} />

      <Route path="/signout" element={<Signout />} />

      <Route path="/admin/dashboard" element={<AdminRoute Child={AdminDashboard}   />} />

      <Route path="/admin/catagories" element={<AdminRoute Child={ManageCatagories}   />} />

      <Route path="/admin/products" element={<AdminRoute Child={ManageProducts}   />} />


      <Route path="/admin/create/product" element={<AdminRoute Child={CreateProduct}   />} />

      <Route path="/admin/create/catagory" element={<AdminRoute Child={AddCatagory}   />} />

      <Route path="/user/dashboard" element ={<PrivateRoute Child={UserDashboard} /> } />



    </Routes>

  );
}

export default App;
