const login = async (page, username, password) => {
  await page.goto('/login')
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
  await page.locator('.notification').waitFor()
}

const createBlog = async (page, title, author, url) => {
  await page.goto('/create')
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.locator('.notification').waitFor()
}

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', { data: { username, name, password } })
}

module.exports = { login, createBlog, createUser }
