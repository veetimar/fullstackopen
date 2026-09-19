import { useState } from "react"

const Blog = ({ blog }) => {
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
         likes {blog.likes} <button>like</button><br />
        {blog.user.name}
      </div>
    </div>  
  )
}

export default Blog
