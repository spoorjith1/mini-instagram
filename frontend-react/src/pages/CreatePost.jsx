import React from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'

function CreatePost() {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [postPreview, setPostPreview] = useState('')

  const handlePost = async (e)=> {
    e.preventDefault();

    if(!image) {
      setError("Please Select an Image")
      setTimeout(()=> {setError('')}, 3000)
      return
    }

    setLoading(true)

    const postData= new FormData()

    postData.append('image', image)
    postData.append('caption', caption)

    try {
        await axiosInstance.post('/post/create/', postData)
        setSuccess("Post Created successfully")
        setTimeout(()=> {setSuccess('')}, 3000)
        setError('')

        setImage(null)
        setCaption('')
        setPostPreview('')

        e.target.reset()
    }
    catch (error) {
      setError("Failed to Upload Post. Try again")
      setTimeout(()=> {setError('')}, 3000)
      setSuccess('')
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className='create-post-main'>
      <div className='create-post-box'>
        <form onSubmit={handlePost} encType='multipart/form-data'>
        {postPreview && <img src={postPreview} className='create-post-preview' />}
        <div className='create-inputs'>
          <div>
            <input type='file' accept='image/*' className='create-post-file'
            onChange={(e)=> {
              setImage(e.target.files[0])
              setPostPreview(URL.createObjectURL(e.target.files[0]))
              }} />
          </div>
          <div>
            <textarea value={caption} onChange={(e)=> setCaption(e.target.value)} placeholder='Post caption' className='create-post-textarea'></textarea>
          </div>
            {loading ? 
            (<button type='submit' disabled className='btn btn-post'>posting...</button>) 
            : 
            (<button type='submit' className='btn btn-post'>post</button>)
            }
        </div>
        </form>
        <div>{success && <span className=' text-success'>{success}</span>}</div>
        <div>{error && <span className=' text-danger'>{error}</span>}</div>
      </div>
    </div>
  )
}

export default CreatePost
