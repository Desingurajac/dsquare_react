
import React, { Suspense } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Home,Contactus,Dashboard,Forgotpassword,AddNewProduct,Profile,Signup,NotFound,ProductList} from './lazyloading'
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
          <Route path='/contact-us' element={<Contactus/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>

  );
}

export default App;
