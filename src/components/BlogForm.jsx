import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newShort, setNewShort] = useState('')
  const [newDesc, setNewDesc] = useState('')
const [successMessage, setSuccessMessage] = useState(null)
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      shortDescription: newShort,
      fullDescription: newDesc
    })
    setNewTitle('')
    setNewAuthor('')
    setNewShort('')
    setNewDesc('')

     setSuccessMessage('✅ Blog created successfully!')
      setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  return (
     <div>
      {successMessage && (
        <div className="mb-4 text-green-600 font-semibold">{successMessage}</div>
        )}
    <form onSubmit={addBlog} className="space-y-4">
      <div>
        <label className="block font-semibold">Title:</label>
        <input className="border w-full p-2" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
      </div>
      <div>
        <label className="block font-semibold">Author:</label>
        <input className="border w-full p-2" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
      </div>
      <div>
        <label className="block font-semibold">Short Description:</label>
        <input className="border w-full p-2" value={newShort} onChange={({ target }) => setNewShort(target.value)} />
      </div>
      <div>
        <label className="block font-semibold">Full Description:</label>
        <textarea className="border w-full p-2" value={newDesc} onChange={({ target }) => setNewDesc(target.value)} />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Create Blog</button>
    </form>
    </div>
  )
}

export default BlogForm;