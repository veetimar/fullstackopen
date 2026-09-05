const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  result = await blog.save()
  response.status(201).json(result)
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
