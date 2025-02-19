import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NavBar.css';
import DSLogo from '../../asserts/images/DSLogo1.png';
import { IoMenu } from "react-icons/io5";
import Sidebar from '../sidebar/Sidebar';
import Box from '@mui/material/Box';
import { AppBar, Link, Toolbar } from '@mui/material';


export const NavBar = ({ toggleSidebar }) => {

    const [showSideBar, setshowSideBar] = useState(false);
    const location = useLocation();
    useEffect(() => {
    }, [location]); // Re-run the effect whenever location changes

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="nav_body">
                    <Box>
                    {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && (
                        <div className='icon-size' onClick={() => { setshowSideBar(!showSideBar); toggleSidebar() }}>
                            <IoMenu />
                        </div>
                    )}
                    </Box>
                    
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "flex-end", gap: 2 }}>
                        {(location.pathname === '/' || location.pathname === '/signup' || location.pathname === '/login' || location.pathname === '/contact-us') ? (
                            <>
                                <Link href="/" className='text-primary fw-bold'>Home</Link>
                                <Link href="/login" className='text-primary fw-bold'>Login</Link>
                                <Link href="/contact-us" className='text-primary fw-bold'>Contact us</Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className='text-primary fw-bold'>Logout</Link>
                                <Link href="/user-profile" className='text-primary fw-bold'>Profile</Link>
                            </>

                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Sidebar showSideBar={showSideBar} />
        </Box>

    )
}

export default NavBar