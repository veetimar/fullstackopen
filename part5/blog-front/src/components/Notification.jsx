const Notification = ({ text }) => {
  const style = {
    color: 'grey',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!text) {
    return null
  }
  return (
    <div style={style} class="notification">
      {text}
    </div>
  )
}

export default Notification
