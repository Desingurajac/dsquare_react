import React  from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";
import DSwhite from '../../asserts/images/DS-white.png';
import { LuLayoutDashboard } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { FaPhoneSquareAlt } from "react-icons/fa";
function Sidebar({ showSideBar,isVisible }) {
    return (
    <div className={`sidebar ${isVisible ? 'visible' : ''} ${showSideBar ? 'active' : ''}`}>
      <img src={DSwhite} alt='DSwhite' className='logo' />
      <ul>
        <li>
          <Link to = "/dashboard" className='sidebar-link'> <LuLayoutDashboard /> <span>Dashboard</span></Link>
        </li>
        <li>
          <Link to = "/add-product" className='sidebar-link'><RiProductHuntLine /><span>Product</span></Link>
        </li>
        <li>
          <Link to= "/contact-us" className='sidebar-link'><FaPhoneSquareAlt /><span>Contact us</span></Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar