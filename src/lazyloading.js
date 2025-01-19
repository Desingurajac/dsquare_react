import React from "react";

const Home = React.lazy(() => import("./pages/home/Home"));
// const Signin = React.lazy(() => import("./pages/signin/Signin"));
const Signup = React.lazy(() => import("./pages/signup/Signup")); 
const Contactus = React.lazy(() => import("./pages/contactus/Contactus"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Forgotpassword = React.lazy(() => import("./pages/forgotpassword/Forgotpassword"));
const NotFound = React.lazy(() => import("./components/notfound/NotFound"))
const Profile = React.lazy(() => import("./pages/profile/UserProfile"));

const AddNewProduct = React.lazy(() => import("./pages/product/addnewproduct/AddNewProducts"));
const ProductList = React.lazy(() => import("./pages/product/productlist/ProductList"))


export {Home,Contactus,Dashboard,Forgotpassword,AddNewProduct,Profile,Signup,NotFound,ProductList};