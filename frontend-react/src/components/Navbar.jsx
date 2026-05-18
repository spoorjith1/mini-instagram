import React from 'react'
import ProfilePage from '../pages/ProfilePage'
import { NavLink } from 'react-router-dom'
import { IoHome, IoPeople } from 'react-icons/io5'
import { FaUserCircle, FaPlusSquare } from 'react-icons/fa'

function Navbar() {
  return (
    <div className='main-navbar'>
      <h1 className='z-lite-title'>Z Lite</h1>
      <div className='navbar-link-box'>
        <NavLink to='/home' className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}><IoHome size={23}/></NavLink>
        <NavLink to='/users' className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}><IoPeople size={23}/></NavLink>
        <NavLink to='/create_post' className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}><FaPlusSquare size={23}/></NavLink>
        <NavLink to='/profile' className={({isActive})=> isActive ? 'nav-icons active' : 'nav-icons'}><FaUserCircle size={23}/></NavLink>
      </div>
    </div>
  )
}

export default Navbar
