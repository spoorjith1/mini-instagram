import React from 'react'
import ProfilePage from '../pages/ProfilePage'
import { NavLink } from 'react-router-dom'
import { IoHome, IoHomeOutline, IoPeople, IoPeopleOutline } from 'react-icons/io5'
import { FiUser, FiPlusSquare } from 'react-icons/fi'
import { RiAddBoxFill } from 'react-icons/ri'
import { FaUserCircle } from 'react-icons/fa'

function Navbar() {
  return (
    <div className='main-navbar'>
      <h1 className='z-lite-title'>Z Lite</h1>
      <div className='navbar-link-box'>
        <NavLink to='/home'>
          {({ isActive }) =>
            isActive ? (
              <IoHome size={23} className='nav-icons active' />
            ) : (
              <IoHomeOutline size={23} className='nav-icons' />
            )
          }
        </NavLink>
        <NavLink to='/users'>
          {({ isActive }) =>
            isActive ? (
              <IoPeople size={23} className='nav-icons active' />
            ) : (
              <IoPeopleOutline size={23} className='nav-icons' />
            )
          }
        </NavLink>
        <NavLink to='/create_post'>
          {({ isActive }) =>
            isActive ? (
              <RiAddBoxFill size={23} className='nav-icons active' />
            ) : (
              <FiPlusSquare size={23} className='nav-icons' />
            )
          }
        </NavLink>
        <NavLink to='/profile'>
          {({ isActive }) =>
            isActive ? (
              <FaUserCircle size={23} className='nav-icons active' />
            ) : (
              <FiUser size={23} className='nav-icons' />
            )
          }
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
