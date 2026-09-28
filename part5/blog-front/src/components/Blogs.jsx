import Blog from './Blog'

const Blogs = ({ blogs, like, remove, user }) => {
  return (
    <div className="blogs">
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} like={like} remove={remove} user={user} />)}
    </div>
  )
}

export default Blogs
