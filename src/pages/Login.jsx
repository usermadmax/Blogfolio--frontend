import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigate('/blogs')
    } catch (err) {
      setError('Invalid credentials')
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  )
}

export default Login;
