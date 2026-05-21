import React from 'react'
import { useNavigate } from 'react-router-dom'

function PostsInhome({ post }) {
  const navigate = useNavigate()

  return (
    <div className='home-post-card'>
      <div className='home-post-top' onClick={() => navigate(`/users/${post.user_id}`)}>
        <img src={`http://127.0.0.1:8000/media/${post.profile_pic}`} alt='profile' className='home-post-profile-pic' />
        <p className='home-post-username'>{post.username}</p>
      </div>

      <img src={post.image} alt='post' className='home-post-image'/>
      <p className='home-post-caption'><b>@{post.username}</b> {post.caption}</p>
      <p className='home-post-date'>
        {new Date(post.created_at)
          .toLocaleDateString('en-GB')}
      </p>
    </div>
  )
}

export default PostsInhome