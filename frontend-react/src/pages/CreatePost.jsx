import React from 'react'
import { useState } from 'react'
import axiosInstance from '../axiosInstance'

function CreatePost() {
  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    <div>
      <form onSubmit={handlePost} encType='multipart/form-data'>
        <input type='file' accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
        <textarea value={caption} onChange={(e)=> setCaption(e.target.value)} placeholder='Post caption'></textarea>
        {loading ? 
        (<button type='submit' disabled>posting...</button>) 
        : 
        (<button type='submit'>post</button>)
        }
      </form>
      <div className=' container-lg bg-light border-3'>{success && <span className=' text-success'>{success}</span>}</div>
      <div className=' container-lg bg-light border-3'>{error && <span className=' text-danger'>{error}</span>}</div>
    </div>
  )
}

export default CreatePost
