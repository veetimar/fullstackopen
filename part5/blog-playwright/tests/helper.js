const login = async (page, username, password) => {
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const logout = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create new blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', { data: { username, name, password } })
}

const likeBlog = async (page, query) => {
  const blog = page.getByText(query).locator('..')
  const likeElement = blog.getByText('likes')
  const likes = Number((await likeElement.textContent()).split(" ")[1])
  const likeButton =  likeElement.getByRole('button', { name: 'like' })
  if (!await likeButton.isVisible()) {
    await blog.getByRole('button', { name: 'view' }).click()
  }
  await likeButton.click()
  await likeElement.getByText(likes + 1).waitFor()
}

module.exports = { login, logout, createBlog, createUser, likeBlog }
