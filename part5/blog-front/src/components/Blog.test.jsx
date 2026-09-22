import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blogUser = {
  name: 'Matti',
  username: 'mmatt',
}
const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: blogUser
}

test('blog renders correctly at start', () => {
  render(<Blog blog={blog} user={blogUser} />)

  const title = screen.getByText('React patterns', { exact: false })
  const author = screen.getByText('Michael Chan', { exact: false })
  const url = screen.getByText('https://reactpatterns.com/', { exact: false })
  const likes = screen.getByText('7', { exact: false })
  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('blog renders correctly after view is clicked', async () => {
  render(<Blog blog={blog} user={blogUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('https://reactpatterns.com/', { exact: false })
  const likes = screen.getByText('7', { exact: false })
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})
