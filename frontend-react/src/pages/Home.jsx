import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../axiosInstance'
import UsersInHome from '../components/UsersInHome'
import PostsInhome from '../components/PostsInhome'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function Home() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [postsNextPage, setPostsNextPage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const usersScrollRef = useRef(null)

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axiosInstance.get('/users/')
        setUsers(response.data.results)
      }
      catch (error) {
        setError('Failed to load users')
      }
    }
    fetchUsersData()
  }, [])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/posts/')
        setPosts(res.data.results)
        setPostsNextPage(res.data.next)
      }
      catch (error) {
        setError('Failed to load posts')
      }
      finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const loadMorePosts = async () => {
    if (!postsNextPage) return
    try {
      const response = await axiosInstance.get(postsNextPage)
      setPosts((prevPosts) => {
        const newPosts = response.data.results.filter(
          (newPost) =>
            !prevPosts.some((prevPost) => prevPost.id === newPost.id)
        )
        return [...prevPosts, ...newPosts]
      })
      setPostsNextPage(response.data.next)
    }
    catch (error) {
      setError('Failed to load more posts')
    }
  }

  const scrollLeft = () => {
    usersScrollRef.current.scrollBy({
      left: -220,
      behavior: 'smooth'
    })
  }

  const scrollRight = () => {
    usersScrollRef.current.scrollBy({
      left: 220,
      behavior: 'smooth'
    })
  }

  if (loading) {
    return (
      <div className='page-container'>Loading...</div>
    )
  }

  return (
    <div className='page-container'>
      {error && (<div>{error}</div>)}

      <div className='home-users-wrapper'>

        <button onClick={scrollLeft} className='users-slide-btn'><FaChevronLeft /></button>
        
        <div className='home-users-container' ref={usersScrollRef}>
          {users.map((user) => (
            <UsersInHome key={user.id} user={user} />
          ))}
        </div>
        
        <button onClick={scrollRight} className='users-slide-btn'><FaChevronRight /></button>
      </div>

      <div className='home-posts'>
        {posts.map((post) => (
          <PostsInhome key={post.id} post={post} />
        ))}
      </div>

      {postsNextPage && (
        <div className='load-more-container'>
          <button onClick={loadMorePosts} className='load-more-btn'>Load More</button>
        </div>
      )}
    </div>
  )
}

export default Home