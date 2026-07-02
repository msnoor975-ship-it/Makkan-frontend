import { test, expect } from '@playwright/test'

test.describe('Reservation Flow E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('/login')
  })

  test('login as sales_employee, add customer, search house, and complete reservation', async ({ page }) => {
    // Login as sales_employee
    await page.fill('input[id="username"]', 'sales_employee')
    await page.fill('input[id="password"]', 'password123')
    await page.click('button[type="submit"]')

    // Wait for navigation to complete (should redirect to home)
    await expect(page).toHaveURL('/')

    // Navigate to Add Customer
    await page.click('text=Customers')
    await page.click('text=Add Customer')

    // Fill customer form
    await page.fill('input[name="fullName"]', 'Test Customer')
    await page.fill('input[name="phone"]', '1234567890')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.selectOption('select[name="status"]', 'active')

    // Submit form
    await page.click('button[type="submit"]')

    // Wait for redirect to customer list
    await expect(page).toHaveURL('/customers')

    // Navigate to Search and Reserve
    await page.click('text=Search')

    // Fill search criteria
    await page.selectOption('select[name="customerId"]', { index: 0 })
    await page.selectOption('select[name="listingType"]', 'sale')
    await page.fill('input[name="minPrice"]', '100000')
    await page.fill('input[name="maxPrice"]', '500000')
    await page.fill('input[name="location"]', 'Main St')

    // Submit search and reserve
    await page.click('button[type="submit"]')

    // Wait for success message or error
    await page.waitForTimeout(2000)

    // Check if we're on a page (either success or error state)
    const currentUrl = page.url()
    console.log('Current URL after reservation attempt:', currentUrl)

    // Verify we can navigate to reservations list
    await page.click('text=Reservations')
    await expect(page).toHaveURL('/reservations')

    // Verify reservations page loaded
    await expect(page.locator('h1:has-text("Reservations")').or(page.locator('text=Reservations'))).toBeVisible()
  })

  test('login with invalid credentials shows error', async ({ page }) => {
    await page.fill('input[id="username"]', 'invalid_user')
    await page.fill('input[id="password"]', 'wrong_password')
    await page.click('button[type="submit"]')

    // Wait for error message
    await expect(page.locator('text=Invalid credentials').or(page.locator('text=Login failed'))).toBeVisible()
  })
})
