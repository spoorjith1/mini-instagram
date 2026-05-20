import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { FaUserFriends } from 'react-icons/fa'

function FriendRequest({ userId }) {
  const [friendshipStatus, setFriendshipStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchFriendshipStatus = async () => {
      try {
        const response = await axiosInstance.get(`/friends/status/${userId}/`)
        setFriendshipStatus(response.data.status)
      }
      catch (error) {
        setError('Failed to load friendship status')
      }
    }
    fetchFriendshipStatus()
  }, [userId])

  const sendRequest = async () => {
    setLoading(true)
    try {
      await axiosInstance.post(`/friends/request/${userId}/`)
      setFriendshipStatus('pending')
    }
    catch (error) {
      setError(error.response?.data?.non_field_errors?.[0] || 'Failed to send request')
      setTimeout(() => { setError('') }, 3000)
    }
    finally {
      setLoading(false)
    }
  }

  const renderButton = () => {
    if ( friendshipStatus === null || friendshipStatus === 'rejected' ) {
      return (
        <button onClick={sendRequest} disabled={loading} className='friend-btn'>
          {loading ? 'Sending...' : 'Add Friend'}
        </button>
      )
    }
    if (friendshipStatus === 'pending') {
      return (
        <button disabled className='friend-btn-disabled'>
          Request Sent
        </button>
      )
    }
    if (friendshipStatus === 'accepted') {
      return (
        <button disabled className='friend-success'>
          <FaUserFriends /> Friends
        </button>
      )
    }
  }

  return (
    <div>
      {renderButton()}
      {error && (
        <p className='text-danger'>
          {error}
        </p>
      )}
    </div>
  )
}

export default FriendRequest