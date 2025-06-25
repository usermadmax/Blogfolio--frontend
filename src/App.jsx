import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  // handle like
  const handleLike = async (blogToUpdate) => {
  try {
    const updatedBlog = {
      user: blogToUpdate.user.id,           // ✅ send only the ID
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url
    }

    const returnedBlog = await blogService.update(blogToUpdate.id || blogToUpdate._id, updatedBlog)

    // Replace old blog with updated one in state
    setBlogs(blogs.map(blog =>
      (blog.id || blog._id) === (returnedBlog.id || returnedBlog._id) ? returnedBlog : blog
    ))
  } catch (error) {
    console.error('Failed to like blog:', error.message)
    setErrorMessage('Error updating like count')
    setTimeout(() => setErrorMessage(null), 5000)
  }
}


  const blogFormRef = useRef()
  // Load blogs
  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  // Check if user is already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login handler
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Logout handler
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }



 

  // Blogs list
  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id || blog._id} blog={blog} onLike={handleLike}/>
      )}
    </div>
  )
  const addBlog = (blogObject) => {


    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        blogFormRef.current.toggleVisibility()
      })
  }

  return (
    <div>
      <h1>Blog App</h1>

      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}

      {user === null
        ? <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
        : (
          <div>
            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable> {blogsList()}
          </div>
        )
      }
    </div>
  )
}

export default App
