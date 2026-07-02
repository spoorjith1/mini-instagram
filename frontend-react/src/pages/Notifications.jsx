import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'
import { FaUserFriends } from 'react-icons/fa'

function Notifications() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get('/friends/requests/')
        setRequests(response.data.results)
      }
      catch (error) {
        setError('Failed to load requests')
      }
      finally {
        setLoading(false)
      }
    }
    fetchRequests()
  }, [])

  const acceptRequest = async (id) => {
    try {
      await axiosInstance.patch(`/friends/request/accept/${id}/`)
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, status: 'accepted' }
            : request
        )
      )
    }
    catch (error) {
      alert('Failed to accept request')
    }
  }

  const rejectRequest = async (id) => {
    try {
      await axiosInstance.patch(`/friends/request/reject/${id}/`)
      setRequests((prevRequests) =>
        prevRequests.filter(
          (request) => request.id !== id
        )
      )
    }
    catch (error) {
      alert('Failed to reject request')
    }
  }

  if (loading) {
    return (
      <div className='notifications-page'>Loading...</div>)
  }

  return (
    <div className='notifications-page'>
      <h2 className='notifications-title'>Notifications</h2>
      {error && (
        <div className='notifications-error'>{error}</div>
      )}

      {requests.length === 0 ? (
        <p className='notifications-empty'>No pending requests</p>
      ) : (
        <div className='notifications-container'>
          {requests.map((request) => (
            <div key={request.id} className='notification-box'>
              <div className='notification-top'>
                <img src={request.profile_pic} alt='profile' className='notification-profile-pic'/>
                <div className='notification-user-info'>
                  <h3 className='notification-username'>
                    {request.username}
                  </h3>
                  <p className='notification-text'>sent you a friend request</p>
                </div>
              </div>
              <div className='notification-actions'>
                {request.status === 'pending' ? (
                  <>
                    <button onClick={() => acceptRequest(request.id)} className='btn btn-success notification-btn'>
                      Accept
                    </button>
                    <button onClick={() => rejectRequest(request.id)} className='btn btn-outline-danger notification-btn'>
                      Reject
                    </button>
                  </>
                ) : (
                  <button disabled className='btn btn-secondary notification-friends-btn'>
                    <FaUserFriends /><span className='ms-2'>Friends</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notifications