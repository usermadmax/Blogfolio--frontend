import { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const MyBlogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(data => {
      const userBlogs = data.filter(blog => blog.user?.username === user.username)
      setBlogs(userBlogs)
    })
  }, [user.username])

   const handleDelete = (id) => {
    setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== id && b._id !== id))
  }

  const handleUpdate = (updatedBlog) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        (blog.id || blog._id) === (updatedBlog.id || updatedBlog._id)
          ? updatedBlog
          : blog
      )
    )
  }
  return (
    <div className='m-3'>
      <h2 className="text-xl font-semibold m-2">My Blogs</h2>
      {blogs.length === 0 ? <p>No blogs found.</p> : blogs.map(blog => (
        <Blog key={blog.id || blog._id} blog={blog} currentUser={user} onDelete={handleDelete} onUpdate={handleUpdate} />
      ))}
    </div>
  )
}

export default MyBlogs;