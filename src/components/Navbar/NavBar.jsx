import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css';
import { IoMdMenu } from "react-icons/io";
// import Layout from '../../Layout';
import { IoMenu } from "react-icons/io5";
import Sidebar from '../sidebar/Sidebar';

export const NavBar = () => {

    const [showSideBar, setshowSideBar] = useState(false);
    const location = useLocation();
    useEffect(() => {
    }, [location]); // Re-run the effect whenever location changes

    return (
        <div>
            <Navbar expand="lg" className="nav_body">

                {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && (
                    <div className='tool-bar' >
                        <div className="icon-size" onClick={() => setshowSideBar(!showSideBar)}><IoMenu /></div>
                    </div>
                )}
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                    {(location.pathname === '/' | location.pathname === '/signup' | location.pathname === '/login') ? (
                        <Nav>
                            <Nav.Link href="/" className='text-primary fw-bold'>Home</Nav.Link>
                            <Nav.Link href="/login" className='text-primary fw-bold'>Login</Nav.Link>
                            <Nav.Link href="/contact-us" className='text-primary fw-bold'>Contact us</Nav.Link>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link href="/" className='text-primary fw-bold'>Logout</Nav.Link>
                            <Nav.Link href="/user-profile" className='text-primary fw-bold'>Profile</Nav.Link>
                        </Nav>

                    )}
                </Navbar.Collapse>

            </Navbar>
            <Sidebar showSideBar={showSideBar} />
        </div>
    )
}

export default NavBar