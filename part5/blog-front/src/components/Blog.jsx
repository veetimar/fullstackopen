const Blog = ({ blog, like, remove, user }) => {
  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <h3>{blog.author}: {blog.title}</h3>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes} {user && <button onClick={() => like(blog)}>like</button>}
        </div>
        <div>
          Added by {blog.user.name}
        </div>
        {user && (user.username === blog.user.username) && <button onClick={() => remove(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
