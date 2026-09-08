const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const userFromToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!userFromToken.id) {
    throw new jwt.JsonWebTokenError()
  }

  const user = await User.findById(userFromToken.id)
  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

router.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  const { title, author, url, likes } = request.body
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = router
