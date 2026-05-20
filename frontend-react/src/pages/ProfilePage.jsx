import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'
import { FaEdit, FaEllipsisV } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'

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
    return <div className='page-container'>Loading...</div>
  }

  return (
    <div className='page-container'>
      {error && <div>{error}</div>}

      {profileData && (
        <>
        <h3 className='ms-3'>{profileData.username}</h3>
        <img src={profileData.profile_pic} alt='profile_pic' width='120' className='profile-pic ms-3' />
        <p className='full-name ms-3'>{profileData.first_name} {profileData.last_name}</p>
        <div className='profile-configs'>
          <Link to='/profile/edit' className='conf-btns'>Edit Profile <FaEdit /></Link>
          <Link to='/profile/settings' className='conf-btns'>Settings<IoMdSettings /></Link>
        </div>

        {profileData.posts?.map((post) => (
          <div key={post.id} className='single-post-container'>
            <img src={post.image} alt='post' width='300' className='profile-posts' />
            <div className='post-content'>
              <div className='post-top'>
                <p className='post-caption'><b>@{post.username} </b>{post.caption}<br /></p>
                <button onClick={()=> setPostMenu(postMenu === post.id? null : post.id)} className='three-dots'><FaEllipsisV /></button>
              </div>
              <p className='post-date'>{new Date(post.created_at).toLocaleDateString('en-GB')}</p>
              {postMenu === post.id && 
                <button className='delete-btn btn btn-light' onClick={() => deletePost(post.id)}>Delete</button>
              }
            </div>
          </div>
        ))}
        {profileData.posts?.length === 0 && (
          <div className='no-posts-message'>
            <p>No posts yet, <Link to='/create_post'>Add a post</Link></p>
          </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProfilePage;
