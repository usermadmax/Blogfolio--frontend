import React, { useState } from 'react'
import blogService from '../services/blogs'
import { formatDistanceToNow } from 'date-fns'

const Blog = ({ blog, currentUser, onDelete, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [editedTitle, setEditedTitle] = useState(blog.title)
  const [editedAuthor, setEditedAuthor] = useState(blog.author)
  const [editedShort, setEditedShort] = useState(blog.shortDescription)
  const [editedFull, setEditedFull] = useState(blog.fullDescription)

  const timeAgo = formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })

  const toggleDetails = () => setShowDetails(!showDetails)

  const handleDelete = async () => {
    if (window.confirm(`Delete blog "${blog.title}"?`)) {
      try {
        await blogService.remove(blog.id || blog._id)
        onDelete(blog.id || blog._id)
      } catch (error) {
        alert('Failed to delete blog')
      }
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const updatedBlog = {
        title: editedTitle,
        author: editedAuthor,
        shortDescription: editedShort,
        fullDescription: editedFull,
        user: blog.user.id || blog.user._id
      }

      const result = await blogService.update(blog.id || blog._id, updatedBlog)
      onUpdate(result)
      setIsEditing(false)
    } catch (err) {
      alert('Failed to update blog')
    }
  }

  return (
    <div className="border p-4 mb-3 bg-blue-50 rounded shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold text-lg">{blog.title}</p>
          <p className="text-xs text-gray-400 italic">Posted {timeAgo}</p>
          <p className="text-sm text-gray-700">{blog.author}</p>
          <p className="text-sm text-gray-900">{blog.shortDescription}</p>
        </div>
        <button onClick={toggleDetails} className="text-blue-500 hover:underline">
          {showDetails ? 'Hide' : 'View'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-2">
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-2">
              <input
                className="w-full border p-1"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <input
                className="w-full border p-1"
                value={editedAuthor}
                onChange={(e) => setEditedAuthor(e.target.value)}
              />
              <input
                className="w-full border p-1"
                value={editedShort}
                onChange={(e) => setEditedShort(e.target.value)}
              />
              <textarea
                className="w-full border p-1"
                value={editedFull}
                onChange={(e) => setEditedFull(e.target.value)}
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
              </div>
            </form>
          ) : (
            <div>
              <p><strong>Description:</strong> {blog.fullDescription}</p>
              <p><strong>Posted by:</strong> {blog.user?.name}</p>

              {currentUser?.username === blog.user?.username && (
                <div className="mt-2 flex gap-2">
                  <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    Delete
                  </button>
                  <button onClick={handleEdit} className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
