import React from 'react'
import { useLocation } from 'react-router-dom'

function UserProfile() {
    const location = useLocation();

    console.log(location)
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile