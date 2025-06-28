const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center text-sm text-gray-600 py-4 mt-8 shadow-inner">
      <p>
        &copy; {new Date().getFullYear()} Blogfolio. Made with 💙 by Ganesh (Gannu)
      </p>
      <p className="text-blue-500">
       <a href="https://github.com/usermadmax/Blogfolio-backend"> View Source code</a>
      </p>
    </footer>
  )
}

export default Footer
