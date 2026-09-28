import { screen, render } from '@testing-library/react'
import Blog from './Blog'

const blogUser = {
  name: 'Matti',
  username: 'mmatt',
}
const anotherUser = {
  name: 'Kalle',
  username: 'kall',
}
const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: blogUser
}

test('blog renders correctly when not authenticated', () => {
  render(<Blog blog={blog} user={null} />)

  const title = screen.getByText('Michael Chan: React patterns')
  const url = screen.getByText('https://reactpatterns.com/')
  const likes = screen.getByText('7', { exact: false })
  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('remove')

  expect(title).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(likeButton).toBeNull()
  expect(removeButton).toBeNull()
})

test('blog renders correctly when authenticated', async () => {
  render(<Blog blog={blog} user={anotherUser} />)

  const title = screen.getByText('Michael Chan: React patterns')
  const url = screen.getByText('https://reactpatterns.com/')
  const likes = screen.getByText('7', { exact: false })
  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('remove')

  expect(title).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(likeButton).toBeVisible()
  expect(removeButton).toBeNull()
})

test('blog renders correctly when user owns blog', async () => {
  render(<Blog blog={blog} user={blogUser} />)

  const title = screen.getByText('Michael Chan: React patterns')
  const url = screen.getByText('https://reactpatterns.com/')
  const likes = screen.getByText('7', { exact: false })
  const likeButton = screen.queryByText('like')
  const removeButton = screen.queryByText('remove')

  expect(title).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(likeButton).toBeVisible()
  expect(removeButton).toBeVisible()
})
