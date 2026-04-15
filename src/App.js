
import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home,Contactus,Dashboard,Forgotpassword,AddNewProduct,
        Profile,Signup,NotFound,ProductList, AddRole, AddVendor, 
        VendorList, RoleList,AddDomain,ViewDomain,EditDomain,
        AddSubDomain,
        ViewSubDomain} from './lazyloading'
import { Signin } from './pages/signin/Signin';
import Layout from './Layout';


function App() {


  return (
    <Router>
       <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route index element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/add-product' element={<AddNewProduct />} />
          <Route path='/product-list' element={<ProductList /> } />
          <Route path='/profile' element={< Profile/> } />
          <Route path='/add-vendor' element={<AddVendor />} />
          <Route path='/vendor-list' element={<VendorList />} />
          <Route path='/contact-us' element={<Contactus/>} />
          <Route path='/add-role' element={<AddRole />} />
          <Route path='/role-list' element={<RoleList />} />

          <Route path='/add-domain' element={<AddDomain />} />
          <Route path='/view-domain' element={<ViewDomain />} />
          <Route path='/edit-domain' element={<EditDomain />} />
          <Route path='/add-subdomain' element={<AddSubDomain />} />
          <Route path='/view-subdomain' element={<ViewSubDomain />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>

  );
}

export default App;
