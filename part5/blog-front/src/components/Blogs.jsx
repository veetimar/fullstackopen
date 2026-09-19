import Blog from './Blog'

const Blogs = ({ blogs, like }) => {
  return (
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} like={like} />)}
    </div>
  )
}

export default Blogs
