const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'testing',
        name: 'Teppo Testaaja',
        password: 'salaisuus'
      }
    })
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
    beforeEach(async ({ page }) => {
      login(page, 'testing', 'salaisuus')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByLabel('title').fill('otsikko')
      await page.getByLabel('author').fill('tekijä')
      await page.getByLabel('url').fill('osoite')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('otsikko tekijä')).toBeVisible()
    })
  })
})
