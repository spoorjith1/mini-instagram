import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import Users from '../components/Users'

function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [nextPage, setNextPage] = useState(null)

  const fetchUsers = async (url = '/users/') => {
    try {
      setError('')
        const response = await axiosInstance.get(url)
        setUsers((prevUsers) => {
          const newUsers = response.data.results.filter((newUser) => !prevUsers.some((prevUser) => prevUser.id === newUser.id))
          return [...prevUsers, ...newUsers]
        })
        setNextPage(response.data.next)
    }
    catch (error) {
        setError('Failed to load users')
    }
}
  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    try {
      setUsers([])
      const response = await axiosInstance.get(`/users/?search=${search}`)
      setUsers(response.data.results)
      setNextPage(response.data.next)
    }
    catch (error) {
      setError('Failed to search users')
    }
    finally { setLoading(false) }
    }

  if (loading) {
    return (<div className='page-container'>Loading...</div>)
  }

  return (
    <div className='page-container'>
      <h2 className='users-title'>Users</h2>
      {error && ( <div className='users-error'>{error}</div> )}

      <div className='users-search-container'>
        <input 
        type='text' placeholder='Search users...' value={search} onChange={(e) => setSearch(e.target.value)} 
        className='users-search-input'/>
        <button onClick={handleSearch}className='users-search-btn'>Search</button>
      </div>
      <hr />
      <div className='users-container'>
        {users.map((user) => (
          <Users key={user.id} user={user} />
        ))}
      </div>

      <div className='load-more-container'>
      {nextPage && ( <button onClick={() => fetchUsers(nextPage)} className='load-more-btn'>Load More</button> )}
      </div>
    </div>
  )
}
export default UsersPage