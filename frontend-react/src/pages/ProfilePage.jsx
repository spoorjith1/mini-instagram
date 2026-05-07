import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=> {
    const fetchProfileData = async ()=> {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/profile/me/')
        setProfileData(response.data)
      }
      catch (error) {
        setError("Failed to fetch Data")
      }
      finally {
        setLoading(false)
      }
    }
    fetchProfileData();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Profile</h2>
      {profileData && (
        <>
        <img src={profileData.profile_pic} alt='profile_pic' width='120' />
        <h3>{profileData.username}</h3>
        <p>{profileData.first_name}</p>
        <p>{profileData.last_name}</p>

        {profileData.posts?.map((post) => (
          <div key={post.id}>
            <img src={post.image} alt='post' width='300' />
            <p>{post.caption}</p>
            <p>{new Date(post.created_at).toLocaleDateString('en-GB')}</p>
          </div>
        ))}

        {error && <div>{error}</div>}
        </>
      )}
    </div>
  )
}

export default ProfilePage;
