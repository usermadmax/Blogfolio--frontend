import BlogList from '../components/BlogList'

const Home = ({ user }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Blogfolio</h1>
      <h1 className="text-2xl font-bold mb-4">Hello,{user.name}</h1>

      <BlogList user={user} />
    </div>
  )
}

export default Home;