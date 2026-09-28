const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog, createUser } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await createUser(request, 'testing', 'Teppo Testaaja', 'salaisuus')
    await page.goto('/')
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'testing', 'salaisuus')
      await expect(page.getByText('Blogs')).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
      await expect(page.locator('.notification')).toContainText('Login succesful')
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'testing', 'väärä')
      await expect(page.getByText('Blogs')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).not.toBeVisible()
      await expect(page.locator('.notification')).toContainText('Wrong login credentials')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'testing', 'salaisuus')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'otsikko', 'tekijä', 'osoite')
      await expect(page.locator('.blogs').getByText('otsikko')).toBeVisible()
    })

    describe('and a few blogs are created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'otsikko', 'tekijä', 'osoite')
        await createBlog(page, 'toinen otsikko', 'toinen tekijä', 'toinen osoite')
        await createBlog(page, 'kolmas otsikko', 'kolmas tekijä', 'kolmas osoite')
      })

      test('blogs can be liked', async ({ page }) => {
        await page.getByText('otsikko', { exact: true }).click()
        const likeElement = page.locator('.blog').getByText('likes')
        await expect(likeElement).toContainText('0')
        await page.getByRole('button', { name: 'like' }).click()
        await expect(likeElement).toContainText('1')
      })

      test('blog can be deleted', async ({ page }) => {
        await page.getByText('toinen otsikko', { exact: true }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('Blogs')).toBeVisible()
        await expect(page.getByText('toinen otsikko', { exact: true })).not.toBeVisible()
      })
    })
  })
})
