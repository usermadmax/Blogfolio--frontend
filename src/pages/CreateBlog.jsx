import BlogForm from '../components/BlogForm'

const CreateBlog = ({ createBlog }) => {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create New Blog</h2>
      <BlogForm createBlog={createBlog} />
    </div>
  )
}

export default CreateBlog;
