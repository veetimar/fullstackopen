const Blogs = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
      </p>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

const Blog = ({ blog }) => {
  return (
    <div>
      {blog.title} {blog.author}
    </div>  
  )
}

export default Blogs
