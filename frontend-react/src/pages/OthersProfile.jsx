import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

function OthersProfile() {
  const { id } = useParams()
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=> {
    const fetchUserData = async () => {
      try {
        const Data = await axiosInstance.get(`/users/${id}/`)
        setUserData(Data.data)
      }
      catch (error) {
        setError("Failed to fetch User")
      }
    }
    fetchUserData()
  }, [id])
  return (
    <div>
      {error && <div>{error}</div>}
      <h2>Profile</h2>
      {userData && (
        <div>
          <img src={userData.profile_pic} alt='profile_pic' width='120' />
          <h3>{userData.username}</h3>
          <p>{userData.first_name}</p>
          <p>{userData.last_name}</p>

          {userData.posts?.map((post) => (
          <div key={post.id}>
            <img src={post.image} alt='post' width='300' />
            <p>{post.caption}</p>
            <p>{new Date(post.created_at).toLocaleDateString('en-GB')}</p>
          </div>
        ))}
        </div>
      )}
    </div>
  )
}

export default OthersProfile
