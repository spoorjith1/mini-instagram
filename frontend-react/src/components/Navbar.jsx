import React from 'react'
import ProfilePage from '../pages/ProfilePage'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <Link to='/home'>Home</Link>
      <Link to='/profile'>Profile</Link>
      <Link to='/create_post'>Post</Link>
    </div>
  )
}

export default Navbar
