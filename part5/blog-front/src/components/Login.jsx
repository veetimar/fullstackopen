import { useState } from 'react'
import { Button, Input } from './Styled'

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
            <Input value={username} onChange={event => setUsername(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            password
            <Input type="password" value={password} onChange={event => setPassword(event.target.value)} />
          </label>
        </div>
        <Button>Login</Button>
      </form>
    </div>
  )
}

export default Login
