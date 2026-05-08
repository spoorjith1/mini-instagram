import React from 'react'
import { useEffect, useState, useContext } from 'react'
import axiosInstance from '../axiosInstance'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const handleLogin = async (e)=> {
    e.preventDefault();
    if (!email) {
      setError('Please Enter email')
      setTimeout(()=> {setError('')}, 3000 )
      return
    }
    if (!password) {
      setError('Please Enter password')
      setTimeout(()=> {setError('')}, 3000 )
      return
    }

    setLoading(true)

    const userData = {email, password}

    try {
      const response = await axiosInstance.post('/token/', userData)
      localStorage.setItem('accessToken', response.data.access)
      localStorage.setItem('refreshToken', response.data.refresh)
      setIsLoggedIn(true)
      setError('')
      navigate('/home')
    }
    catch (error) {
      setError('InValid email or password')
      setTimeout(()=> {setError('')}, 3000 )
      setEmail('')
      setPassword('')
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email : </label>
        <input type='email' placeholder='myemail@gmail.com' value={email} onChange={(e)=> setEmail(e.target.value)} />
        <br />
        <label>Password : </label>
        <input type='password' placeholder='password123#$%' value={password} onChange={(e)=> setPassword(e.target.value)} />
        <br />
        {error && <div className='text-danger'>{error}</div>}
        <br />
        {loading ? 
        (<button type='submit' disabled>Logging In...</button>) 
        : 
        (<button type='submit'>Login</button>)
        }
      </form>
      <div>New to Z Lite? <Link to='/register'>Register</Link></div>
    </div>
  )
}

export default Login
