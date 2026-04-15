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
const ProductList = React.lazy(() => import("./pages/product/productlist/ProductList"));

const AddRole = React.lazy(() => import("./pages/role/Role"));
const RoleList = React.lazy(() => import("./pages/role/role-list/RoleList"));

const AddVendor = React.lazy(() => import("./pages/vendor/addvendor/AddVendor"));
const VendorList = React.lazy(() =>import("./pages/vendor/vendorlist/VendorList"))

const AddDomain = React.lazy(() => import("./pages/domain/add-domain/AddDomain"));
const ViewDomain = React.lazy(() => import("./pages/domain/view-domain/ViewDomain"));
const EditDomain = React.lazy(() => import("./pages/domain/edit-domain/EditDomain"));
const AddSubDomain = React.lazy(() => import("./pages/subdomain/add-subdomain/AddSubDomain"));
const ViewSubDomain = React.lazy(() => import("./pages/subdomain/view-subdomain/ViewSubDomain"));
export {
    Home, Contactus, Dashboard, Forgotpassword,
    AddNewProduct, Profile, Signup, NotFound, ProductList,
    AddRole, AddVendor,VendorList,RoleList,AddDomain,ViewDomain,
    EditDomain,AddSubDomain,ViewSubDomain
};