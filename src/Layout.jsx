import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
import Sidebar from "./components/sidebar/Sidebar";


const Layout = ({ showSideBar }) => {
      const location = useLocation();
 
  return (
    <>
      <NavBar />
      {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '*' && (
      <BreadCrumb /> 
      )}
       <Sidebar showSideBar={showSideBar} />
      <main className="main-align">
        <Outlet />
      </main>
    </>
  );
};


export default Layout; 