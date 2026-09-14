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

  const handleLoginSubmit = async event => {
    event.preventDefault()
    const user = await login({ username, password })
    setUser(user)
    setUsername('')
    setPassword('')
  }

  const loginform = () => (
    <div>
      <h2>Login to the application</h2>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label>
            username
            <input value={username} onChange={() => setUsername(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <input type="password" value={password} onChange={() => setPassword(event.target.value)} />
          </label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )

  return (
    <div>
      {user && <Blogs blogs={blogs} user={user} />}
      {!user && loginform()}
    </div>
  )
}

export default App