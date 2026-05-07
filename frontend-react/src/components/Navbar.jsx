import React from 'react'
import ProfilePage from '../pages/ProfilePage'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='side-navbar'>
      <Link to='/home' className='side-navbar-links'>Home</Link>
      <Link to='/profile' className='side-navbar-links'>Profile</Link>
      <Link to='/create_post' className='side-navbar-links'>Post</Link>
      <Link to='/users' className='side-navbar-links'>Users</Link>
    </div>
  )
}

export default Navbar
