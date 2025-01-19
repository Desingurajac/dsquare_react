import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import BreadCrumb from "./components/breadcrumb/BreadCrumb";
import Sidebar from "./components/sidebar/Sidebar";


const Layout = ({ showSideBar }) => {
  const location = useLocation();
  const excludedRoutes = ['/', '/login', '/signup'];
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
  // Toggle Sidebar Visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  return (
    <>
      <NavBar toggleSidebar={toggleSidebar}/>
      

      <main className={`main-align ${isSidebarVisible ? 'main-with-sidebar' : ''}`}>
      {!excludedRoutes.includes(location.pathname) && <BreadCrumb />}
        <Sidebar showSideBar={showSideBar} isVisible={isSidebarVisible} />
        <Outlet />
      </main>
    </>
  );
};


export default Layout; 