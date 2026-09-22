import { screen, render } from '@testing-library/react'
import Blog from './Blog'

test('blog renders correctly at start', async () => {
  const user = {
    name: 'Matti',
    username: 'mmatt',
  }
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: user
  }

  render(<Blog blog={blog} user={user} />)

  const title = screen.getByText('React patterns', { exact: false })
  const author = screen.getByText('Michael Chan', { exact: false })
  const url = screen.getByText('https://reactpatterns.com/', { exact: false })
  const likes = screen.getByText('7', { exact: false })
  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})
