const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, logout, createBlog, createUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'testing', 'Teppo Testaaja', 'salaisuus')
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Login to the application')).toBeVisible()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByRole('button'), { name: 'Login' }).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      login(page, 'testing', 'salaisuus')
      await expect(page.getByText('Teppo Testaaja logged in')).toBeVisible()
      await expect(page.getByText('Login to the application')).not.toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      login(page, 'testing', 'väärä')
      await expect(page.getByText('Teppo Testaaja logged in')).not.toBeVisible()
      await expect(page.getByText('Login to the application')).toBeVisible()
      await expect(page.locator('.notification')).toContainText('Wrong login credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(({ page }) => {
      login(page, 'testing', 'salaisuus')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'otsikko', 'tekijä', 'osoite')
      await expect(page.getByText('otsikko tekijä')).toBeVisible()
    })

    describe('and a blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'otsikko', 'tekijä', 'osoite')
      })

      test('blog can be liked', async ({ page }) => {
        const blog = page.getByText('otsikko tekijä').locator('..')
        await blog.getByRole('button', { name: 'view' }).click()
        const likeElement = blog.getByText('likes')
        await expect(likeElement).toContainText('0')
        await likeElement.getByRole('button', { name: 'like' }).click()
        await expect(likeElement).toContainText('1')
      })

      test('blog can be deleted', async ({ page }) => {
        const blog = page.getByText('otsikko tekijä').locator('..')
        await blog.getByRole('button', { name: 'view' }).click()
        page.on('dialog', dialog => dialog.accept())
        await blog.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('otsikko tekijä')).not.toBeVisible()
      })

      describe('With other user logged in', () => {
        beforeEach(async ({ page, request }) => {
          logout(page)
          await createUser(request, 'toinen', 'Toinen Toimittaja', 'salaisuus2')
          login(page, 'toinen', 'salaisuus2')
        })

        test('someone else\'s blog cannot be deleted', async ({ page }) => {
          const blog = page.getByText('otsikko tekijä').locator('..')
          await blog.getByRole('button', { name: 'view' }).click()
          await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
      })
    })
  })
})
