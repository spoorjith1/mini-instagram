import React from 'react'
import { useNavigate } from 'react-router-dom'


function Users({ user }) {
  const navigate = useNavigate()

  const openProfile = ()=> {
    navigate(`/users/${user.id}`)
  }

  return (
    <div onClick={openProfile} className='users-list'>
      <img src={user.profile_pic} alt='profile' width='80' />
      <h3>{user.username}</h3>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
    </div>
  )
}

export default Users
