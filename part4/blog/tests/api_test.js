const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const blog = require('../models/blog')

api = supertest(app)

const initialBlogs = [
    {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('get returns correct amount of blogs', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .then(response => response.body)
  assert(blogs.length === initialBlogs.length)
})

test('unique identifier is .id', async () => {
  const blogs = await getBlogs()
  blogs.forEach(blog => assert(blog.hasOwnProperty('id') && !blog.hasOwnProperty('_id')))
})

test('post works correctly', async () => {
  const newBlog = {
    title: 'Jaakon Keitot',
    author: 'Meikämandoliini',
    url: 'www.com',
    likes: 3
  }
  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    .then(response => response.body)
  assert(blog.title == newBlog.title)
  const blogs = await getBlogs()
  assert(blogs.length === initialBlogs.length + 1)
  const titles = blogs.map(blog => blog.title)
  assert(titles.includes(newBlog.title))
})

test('likes default to 0', async () => {
  const newBlog = {
    title: 'Jaanan Keitot',
    author: 'Meikämanteliini',
    url: 'www.com'
  }
  const blog = await api
    .post('/api/blogs')
    .send(newBlog)
    .then(response => response.body)
  assert(blog.likes === 0)
})

test('return 400 if title or url missing', async () => {
  const missingTitle = {
    author: 'Meikämandariini',
    url: 'www.com',
  }
  const missingUrl = {
    title: 'Jaalin Keitot',
    author: 'Meikämandariini'
  }
  await api
    .post('/api/blogs')
    .send(missingTitle)
    .expect(400)
  await api
    .post('/api/blogs')
    .send(missingUrl)
    .expect(400)
})

test('delete works correctly', async () => {
  const blogToDelete = (await getBlogs())[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const blogsAtEnd = await getBlogs()
  const ids = blogsAtEnd.map(b => b.id)
  assert(!ids.includes(blogToDelete.id))
})

function getBlogs() {
  return api.get('/api/blogs').then(response => response.body)
}

after(async () => {
  await mongoose.connection.close()
})
