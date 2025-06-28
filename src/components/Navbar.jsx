import { Link } from 'react-router-dom'

const Navbar = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <nav className="bg-gray-100 shadow-md py-3 px-6 flex justify-between items-center">
      <h1 className="text-3xl font-bold text-blue-600">Blogfolio</h1>
      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/blogs" className="hover:underline text-md">All Blogs</Link>
            <Link to="/myblogs" className="hover:underline text-md">My Blogs</Link>
            <Link to="/create" className="hover:underline text-md">Create</Link>
            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-700 cursor-pointer">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;