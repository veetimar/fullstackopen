const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByLabel('username').fill('testing')
      await page.getByLabel('password').fill('salaisuus')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Teppo Testaaja logged in')).toBeVisible()
      await expect(page.getByText('Login to the application')).not.toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testing')
      await page.getByLabel('password').fill('väärä')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Teppo Testaaja logged in')).not.toBeVisible()
      await expect(page.getByText('Login to the application')).toBeVisible()
      await expect(page.locator('.notification')).toContainText('Wrong login credentials')
    })
  })
})
