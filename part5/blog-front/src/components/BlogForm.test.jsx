import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm works correctly', async () => {
  const eventHandler = vi.fn()
  render(<BlogForm createBlog={eventHandler} />)

  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  const submit = screen.getByRole('button')

  const user = userEvent.setup()
  await user.type(titleInput, 'otsikko')
  await user.type(authorInput, 'tekijä')
  await user.type(urlInput, 'osoite')
  await user.click(submit)
  expect(eventHandler.mock.calls[0][0].title).toBe('otsikko')
  expect(eventHandler.mock.calls[0][0].author).toBe('tekijä')
  expect(eventHandler.mock.calls[0][0].url).toBe('osoite')
})
