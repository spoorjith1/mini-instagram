import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import Users from '../components/Users'

function UsersPage() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        const fetchUsersData = async ()=> {
            setLoading(true)
            try {
                const response = await axiosInstance.get('/users/')
                setUsers(response.data)
            }
            catch (error) {
                setError("Failed to Load data")
            }
            finally {
                setLoading(false)
            }
        }
        fetchUsersData();
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

  return (
    <div>
      <h2>Users</h2>
      {error && <div>{error}</div>}

      {users.map((user) => (
        <Users key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UsersPage
