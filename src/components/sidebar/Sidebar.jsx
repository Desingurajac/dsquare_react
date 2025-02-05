import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";
import DSwhite from '../../asserts/images/DS-white.png';
import { LuLayoutDashboard } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { FaAngleDown, FaAngleRight, FaPhoneSquareAlt } from "react-icons/fa";
// import { HiPlus } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import { PiUserListFill } from "react-icons/pi";

function Sidebar({ showSideBar, isVisible }) {
  const [openModule, setOpenModule] = useState(null);
  const sideBarModules = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LuLayoutDashboard />,
      subModules: []
    },
    {
      name: "Role Management",
      icon: <LuLayoutDashboard />,
      subModules: [
        { name: "Add Role", path: "/add-role" },
        { name: "Manage Roles", path: "" }
      ]
    },
    {
      name: "Products",
      icon: <RiProductHuntLine />,
      subModules: [
        { name: "Add Product", path: "/add-product" },
        { name: "Products List", path: "/product-list" },
      ],
    },
    {
      name: "Vendor",
      icon: <HiUsers />,
      subModules: [
        { name: "Add Vendor",path: "/add-vendor" },
        { name: "Vendor List" , path: "/vendor-list" },
      ],
    },
  

    {
      name: "Contact Us",
      path: "/contact-us",
      icon: <FaPhoneSquareAlt />,
      subModules: [],
    }
  ];
   
  const toggleModule = (moduleName) =>{
   setOpenModule(openModule === moduleName ? null : moduleName)
  };

  return (
    <div className={`sidebar ${isVisible ? 'visible' : ''} ${showSideBar ? 'active' : ''}`}>
      <img src={DSwhite} alt='DSwhite' className='logo' />
      <ul>
        {sideBarModules.map((module, index) => (
          <li  key={index}>
            {module.subModules.length > 0 ? (
              <>
                <div className='submodule' onClick={() => toggleModule(module.name)}>
                  {module.icon} <span>{module.name}</span>
                  {openModule === module.name ? <FaAngleDown /> : <FaAngleRight />}
                </div>
                {openModule === module.name && (
                  <ul className='submenu'>
                    {module.subModules.map((subModule, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subModule.path} className='sidebar-link'>
                        <FaAngleRight /> {subModule.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link to={module.path} className='sidebar-link' >
                {module.icon} <span>{module.name}</span>
              </Link>
            )}
          </li>
        ))}
        {/* <li>
          <Link to = "/dashboard" className='sidebar-link'> <LuLayoutDashboard /> <span>Dashboard</span></Link>
        </li>
        <li>
          <Link to= "/add-role" className='sidebar-link' > <HiPlus /> <span>Role</span> </Link>
           </li>
        <li>
          <Link to = "/add-product" className='sidebar-link'><RiProductHuntLine /><span>Product</span></Link>
        </li>
        <li>
          <Link to= "/contact-us" className='sidebar-link'><FaPhoneSquareAlt /><span>Contact us</span></Link>
        </li> */}
      </ul>
    </div>
  );
}

export default Sidebar