const router = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {name: 1, username: 1})
  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog({ ...request.body, user: user._id })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', {name: 1, username: 1})
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (user._id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: 'unauthorized' })
  }
  
  await Blog.findByIdAndDelete(blog._id)
  user.blogs = user.blogs.filter(b => b._id !== blog._id)
  await user.save()
  response.status(204).end()
})

router.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (!user) {
    return response.status(401).json({ error: 'unauthorized' })
  }

  const { title, author, url, likes, user: requestUser} = request.body
  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes
  blog.user = requestUser
  const updatedBlog = await blog.save()
  await updatedBlog.populate('user', {name: 1, username: 1})
  response.json(updatedBlog)
})

module.exports = router
