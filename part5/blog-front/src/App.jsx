import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLoginSubmit = async event => {
    event.preventDefault()
    let user
    try {
      user = await login({ username, password })
    } catch {
      setNotification('Wrong login credentials')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setUsername('')
    setPassword('')
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
    blogService.setToken(user.token)
    setNotification('Login succesful')
    setTimeout(() => setNotification(''), 5000)
  }

  const handleCreateSubmit = async event => {
    event.preventDefault()
    let blog
    try {
      blog = await blogService.create({ title, author, url})
    } catch {
      setNotification('Blog creation failed')
      setTimeout(() => setNotification(''), 5000)
      return
    }
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
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

  const loginform = () => (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>
            username
            <input value={username} onChange={event => setUsername(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" value={password} onChange={event => setPassword(event.target.value)} />
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )

  const loginSuccesful = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>Create new</h2>
        <form onSubmit={handleCreateSubmit}>
          <div>
            <label>
              title
              <input value={title} onChange={event => setTitle(event.target.value)} />
            </label>
          </div>
          <div>
            <label>
              author
              <input value={author} onChange={event => setAuthor(event.target.value)} />
            </label>
          </div>
          <div>
            <label>
              url
              <input value={url} onChange={event => setUrl(event.target.value)} />
            </label>
          </div>
          <button>Create</button>
        </form>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  return (
    <div>
      <Notification text={notification}/>
      {user && loginSuccesful()}
      {!user && loginform()}
    </div>
  )
}

export default App
