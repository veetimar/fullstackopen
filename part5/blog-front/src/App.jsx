import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

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
  }

  const HandleBlogCreation = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    let blog
    try {
      blog = await blogService.create({ title, author, url})
    } catch {
      setNotification('Blog creation failed')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setBlogs(blogs.concat(blog))
    setNotification('Created blog ' + blog.title)
    setTimeout(() => setNotification(''), 5000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    blogService.setToken('')
    setNotification('Logout succesful')
    setTimeout(() => setNotification(''), 5000)
  }

  const loginSuccesful = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef} >
        <BlogForm createBlog={HandleBlogCreation} />
      </Togglable>
      <Blogs blogs={blogs} />
    </div>
  )

  return (
    <div>
      <Notification text={notification}/>
      {user && loginSuccesful()}
      {!user && <Login login={handleLogin} />}
    </div>
  )
}

export default App
