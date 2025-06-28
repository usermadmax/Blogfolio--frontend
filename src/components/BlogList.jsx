import { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(data => {
      const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      setBlogs(sorted)
    })
  }, [])

  const handleDelete = (id) => {
    setBlogs(blogs.filter(b => b.id !== id && b._id !== id))
  }
 const handleUpdate = (updatedBlog) => {
    setBlogs(prev =>
      prev.map(blog =>
        (blog.id || blog._id) === (updatedBlog.id || updatedBlog._id) ? updatedBlog : blog
      )
    )
  }
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Latest Blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id || blog._id} blog={blog} currentUser={user} onDelete={handleDelete} onUpdate={handleUpdate} />
      ))}
    </div>
  )
}

export default BlogList;