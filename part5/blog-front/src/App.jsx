import { useState, useEffect, useRef } from 'react'
import { Route, Routes, Link, useNavigate, useMatch } from 'react-router-dom'
import blogService from './services/blogs'
import login from './services/login'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const navigate = useNavigate()
  const blogFormRef = useRef()
  const match = useMatch('/blogs/:id')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(sortBlogs(blogs)))
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  const sortBlogs = (blogs) => {
    return blogs.toSorted((a, b) => b.likes - a.likes)
  }

  const handleLogin = async (username, password) => {
    let user
    try {
      user = await login({ username, password })
    } catch {
      setNotification('Wrong login credentials')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
    setNotification('Login succesful')
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const HandleBlogCreation = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    let blog
    try {
      blog = await blogService.create(newBlog)
    } catch {
      setNotification('Blog creation failed')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setBlogs(blogs.concat(blog))
    setNotification('Created blog ' + blog.title)
    setTimeout(() => setNotification(''), 5000)
  }

  const likeBlog = async (blogToUpdate) => {
    const newBlog = {
      user: blogToUpdate.user.id,
      likes: blogToUpdate.likes + 1,
      author: blogToUpdate.author,
      title: blogToUpdate.title,
      url: blogToUpdate.url
    }
    const returnedBlog = await blogService.update(newBlog, blogToUpdate.id)
    let newBlogs = blogs.map(blog => blog.id === blogToUpdate.id ? returnedBlog : blog)
    setBlogs(sortBlogs(newBlogs))
  }

  const deleteBlog = async blog => {
    if (!confirm(`Remove blog ${blog.title}?`)) {
      return
    }
    const id = blog.id
    try {
      await blogService.remove(id)
    } catch {
      setNotification('Blog deletion failed')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setBlogs(blogs.filter(b => b.id !== id))
    setNotification('Deleted blog')
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken('')
    setNotification('Logout succesful')
    setTimeout(() => setNotification(''), 5000)
    navigate('/')
  }

  const margin = {
    margin: 5
  }

  return (
    <div>
      <Notification text={notification}/>
      <div>
        <Link to='/' style={margin}>home</Link>
        {!user && <Link to='/login' style={margin}>login</Link>}
        {user && <button onClick={handleLogout} style={margin}>logout</button>}
      </div>
      <Routes>
        <Route path='/' element={<Blogs blogs={blogs} like={likeBlog} remove={deleteBlog} user={user} />} />
        <Route path='/login' element={<Login login={handleLogin} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} like={likeBlog} remove={deleteBlog} user={user} />} />
      </Routes>
    </div>
  )
}

export default App
