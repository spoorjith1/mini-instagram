import React from 'react'
import { useNavigate } from 'react-router-dom'


function Users({ user }) {
  const navigate = useNavigate()

  const openProfile = ()=> {
    navigate(`/users/${user.id}`)
  }

  return (
    <div onClick={openProfile} className='user-box'>
      <img src={user.profile_pic} alt='profile' width='80' className='users-profile-pic' />
      <h3 className='users-username'>{user.username}</h3>
      <p className='users-fullname'>{user.first_name} {user.last_name}</p>
    </div>
  )
}

export default Users
