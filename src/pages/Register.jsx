import { useState } from 'react'
import userService from '../services/userService'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      await userService.register({ username, name, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      setTimeout(() => setError(null), 3000)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  )
}

export default Register;