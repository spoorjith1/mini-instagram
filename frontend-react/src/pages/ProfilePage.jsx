import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

function ProfilePage() {
  const [loading, setLoading] = useState(false)
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState('')
  const [postMenu, setPostMenu] = useState(null)

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

  const deletePost = async (id)=> {
    try {
      await axiosInstance.delete(`/post/delete/${id}/`)

      setProfileData({
        ...profileData,
        posts: profileData.posts.filter((post)=> post.id !== id)
      })

      setPostMenu(null)
    }
    catch (error) {
      alert("Failed to delete Post. Try again")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Profile</h2>
      {error && <div>{error}</div>}

      {profileData && (
        <>
        <img src={profileData.profile_pic} alt='profile_pic' width='120' />
        <h3>{profileData.username}</h3>
        <p>{profileData.first_name}</p>
        <p>{profileData.last_name}</p>
        <Link to='/profile/edit' className=' btn btn-info'>Edit Profile</Link>
        <Link to='/profile/settings' className=' btn btn-danger'>Settings</Link>

        {profileData.posts?.map((post) => (
          <div key={post.id}>
            <button onClick={()=> setPostMenu(postMenu === post.id? null : post.id)}>⋮</button>
            {postMenu === post.id && <div>
            <button className='btn btn-dark' onClick={() => deletePost(post.id)}>Delete</button>
            </div>}
            <img src={post.image} alt='post' width='300' />
            <p>{post.caption}</p>
            <p>{new Date(post.created_at).toLocaleDateString('en-GB')}</p>
          </div>
        ))}
        </>
      )}
    </div>
  )
}

export default ProfilePage;
