import React from 'react'
import { useNavigate } from 'react-router-dom'

function UsersInHome({ user }) {
  const navigate = useNavigate()
  return (
    <div className='home-user-card' onClick={() => navigate(`/users/${user.id}`)}>
      <img src={user.profile_pic} alt='profile' className='home-user-pic' />
      <p className='home-user-name'>{user.username}</p>
    </div>
  )
}

export default UsersInHome