import { useState } from 'react'
import { Button, Input } from './Styled'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateSubmit = event => {
    event.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog({ title, author, url })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateSubmit}>
        <div>
          <label>
            title
            <Input value={title} onChange={event => setTitle(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            author
            <Input value={author} onChange={event => setAuthor(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            url
            <Input value={url} onChange={event => setUrl(event.target.value)} />
          </label>
        </div>
        <Button>create</Button>
      </form>
    </div>
  )
}

export default BlogForm
