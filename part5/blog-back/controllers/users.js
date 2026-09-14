const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
  response.json(users)
})

router.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const saltRounds = 10
  const passhash = await bcrypt.hash(password, saltRounds)

  if (!(username && password) || (username.length < 3 || password.length < 3)) {
    return response.status(400).json({error: 'Illegal username or password'})
  }

  const user = new User({
    username,
    name,
    passhash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = router
