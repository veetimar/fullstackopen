import { Alert } from './Styled'

const Notification = ({ text }) => {
  if (!text) {
    return null
  }
  return (
    <Alert className="notification">
      {text}
    </Alert>
  )
}

export default Notification
