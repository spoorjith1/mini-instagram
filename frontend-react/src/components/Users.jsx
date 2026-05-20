import React from 'react'
import { useNavigate } from 'react-router-dom'
import FriendRequest from './FriendRequest'

function Users({ user }) {
  const navigate = useNavigate()

  const openProfile = () => {
    navigate(`/users/${user.id}`)
  }
  return (
    <div className='user-box'>
      <div className='user-left' onClick={openProfile}>
        <img src={user.profile_pic} alt='profile' className='users-profile-pic' />
        <div className='users-info'>
          <h3 className='users-username'>{user.username}</h3>
          <p className='users-fullname'>{user.first_name} {user.last_name}</p>
        </div>
      </div>

      <div className='user-right'>
        <FriendRequest userId={user.id} />
      </div>
    </div>
  )
}

export default Users