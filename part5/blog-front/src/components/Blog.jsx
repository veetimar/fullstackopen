import { useState } from 'react'

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
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{infovisible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={() => like(blog)}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {user.username === blog.user.username && <div><button onClick={() => remove(blog)}>remove</button></div>}
      </div>
    </div>
  )
}

export default Blog
