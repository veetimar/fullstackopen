import { useState } from 'react'

const Login = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = event => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    login(username, password)
  }

  return (
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
}

export default Login
