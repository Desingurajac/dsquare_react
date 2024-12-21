
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Signin } from './pages/signin/Signin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home'
import Signup from './pages/signup/Signup';
import Forgotpassword from './pages/forgotpassword/Forgotpassword';
import AddNewProducts from './pages/product/addnewproduct/AddNewProducts';
import NotFound from './components/notfound/NotFound';
import Layout from './Layout';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route index element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgotpassword' element={<Forgotpassword />} />
          <Route path='/add-product' element={<AddNewProducts />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>

  );
}

export default App;
