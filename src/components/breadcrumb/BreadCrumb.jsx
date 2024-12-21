import React from 'react'
import './BreadCrumb.css'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumbs } from '@mui/material';

const BreadCrumb = () => {

    const location = useLocation();
    // console.log(location)
    // const crumbPath = location.pathname
    let crumbLink = '';
    const crumbPath = location.pathname.split('/').filter((path) => path !== '')
        .map((crumb) => {
            crumbLink += `/${crumb}`
            return <Link to = {crumbLink} key = {crumb}>
                {crumb}
            </Link>
                        })
    return (
        <div className='bc'>
        <Breadcrumbs  aria-label="breadcrumb">
     {crumbPath}
      </Breadcrumbs>
      </div>
    )
}

export default BreadCrumb