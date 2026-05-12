import React from 'react'

function PostsInhome({ post }) {
  return (
    <div>
      <img src={`http://127.0.0.1:8000/media/${post.profile_pic}`} width='40' /><span>{post.username}</span>
      <img src={post.image} alt='post' width='300' />
      <p>{post.caption}</p>
      <p>{new Date(post.created_at).toLocaleDateString('en-GB')}</p>
    </div>
  )
}

export default PostsInhome
