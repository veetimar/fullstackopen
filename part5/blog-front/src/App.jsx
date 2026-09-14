import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLoginSubmit = async event => {
    event.preventDefault()
    const user = await login({ username, password })
    setUsername('')
    setPassword('')
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = event => {
    setUser(null)
    window.localStorage.removeItem('user')
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

  return (
    <div>
      {user && <Blogs blogs={blogs} user={user} onLogout={handleLogout} />}
      {!user && loginform()}
    </div>
  )
}

export default App
