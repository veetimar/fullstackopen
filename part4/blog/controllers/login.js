const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, password } = request.body
  const user = await User.findOne({ username })

  const correctPassword = !user
    ? false
    : await bcrypt.compare(password, user.passhash)
  if (!correctPassword) {
    return response.status(400).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  response.json({ token, username, name: user.name})
})

module.exports = router
