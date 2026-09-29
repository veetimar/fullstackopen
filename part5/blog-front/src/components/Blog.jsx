import { Unit, Button } from './Styled'

const Blog = ({ blog, like, remove, user }) => {
  if (!blog) {
    return null
  }

  return (
    <Unit className="blog">
      <h3>{blog.author}: {blog.title}</h3>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} {user && <Button onClick={() => like(blog)}>like</Button>}
        </div>
        <div>
          Added by {blog.user.name}
        </div>
        <div>
          {user && (user.username === blog.user.username) && <Button onClick={() => remove(blog)}>remove</Button>}
        </div>
      </div>
    </Unit>
  )
}

export default Blog
