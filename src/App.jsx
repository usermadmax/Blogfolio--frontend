// --- App.jsx ---
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import blogService from './services/blogs'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateBlog from './pages/CreateBlog'
import MyBlogs from './components/MyBlogs'
import Spinner from './components/Spinner'
import Footer from './components/Footer'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    setLoading(false)
  }, [])


  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(prev => [...prev, newBlog])
    } catch (err) {
      alert('Failed to create blog')
    }
  }
  if (loading) return <Spinner />
  return (
    <Router>
     
      <div className="  flex flex-col min-h-screen ">
         <Navbar user={user} setUser={setUser} />
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Navigate to="/blogs" />} />
            <Route path="/blogs" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
            <Route path="/myblogs" element={user ? <MyBlogs user={user} /> : <Navigate to="/login" />} />
            <Route path="/create" element={user ? <CreateBlog createBlog={createBlog} /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>

    </Router>
  )
}

export default App;