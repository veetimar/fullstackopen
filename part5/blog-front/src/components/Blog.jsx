import { useState } from "react"

const Blog = ({ blog, like, remove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [infovisible, setVisible] = useState(false)
  const showWhenVisible = { display: infovisible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!infovisible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{infovisible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible}>
        {blog.url}<br />
         likes {blog.likes} <button onClick={() => like(blog)}>like</button><br />
        {blog.user.name}<br />
        {user.username === blog.user.username && <button onClick={() => remove(blog)}>remove</button>}
      </div>
    </div>  
  )
}

export default Blog
