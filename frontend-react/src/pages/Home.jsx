import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import Users from '../components/Users'
import UsersInHome from '../components/UsersInHome'
import PostsInhome from '../components/PostsInhome'

function Home() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    const fetchUsersData = async ()=> {
        setLoading(true)
        try {
            const response = await axiosInstance.get('/users/')
            setUsers(response.data.results)
        }
        catch (error) {
            setError("Failed to load users")
        }
        finally {
            setLoading(false)
        }
    }
    fetchUsersData();
  }, [])

  useEffect(()=> {
    const fetchPosts = async ()=> {
      setLoading(true)
      
      try {
        const res = await axiosInstance.get('/posts/')
        setPosts(res.data.results)
      }
      catch (error) {
        setError("Failed to load Posts")
      }
      finally {
        setLoading(false)
      }
    }
    fetchPosts();
  }, [])

  if (loading) {
      return <div>Loading...</div>
  }

  return (
    <div className='page-container'>
      <h1>Z Lite</h1>
      <div className='home-users-container'>
        {users.map((user) => (
          <UsersInHome key={user.id} user={user} />
        ))}
      </div>
      <div className='home-posts'>
        {posts.map((post) => (
          <PostsInhome key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home
