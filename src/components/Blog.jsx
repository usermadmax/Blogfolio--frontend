import React from "react"
import { useState } from "react"
const Blog = ({ blog,onLike}) => {  
  const [showDetails,setShowDetails]=useState(false)
 
    const toggleDetails = () => {
    setShowDetails(!showDetails)
  }
  return (
 <div style={{ border: '1px solid #ccc', margin: '5px', padding: '5px' }}>
      <p>
        {blog.title} {blog.author} 
        <button onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </p>

      {showDetails && (
        <div>
          <p><strong>URL:</strong><a href={blog.url}>{blog.url}</a> </p>
          {/* You can add more fields like likes, user etc. */}
          <p><strong>Like:</strong>{blog.likes} <button onClick={()=>onLike(blog)}>like</button></p>
           <p><strong>User:</strong>{blog.user.name}</p>
        </div>
      )}
    </div>
)
}
export default Blog