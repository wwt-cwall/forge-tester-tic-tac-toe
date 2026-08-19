// Changed by Forge v0.1.0
import { test, expect } from '@playwright/test';

/**
 * End-to-end happy path test for Tic-Tac-Toe application
 * 
 * This test covers the main user flow:
 * 1. User visits the application
 * 2. User is prompted to enter a display name
 * 3. User enters a valid display name
 * 4. User sees the welcome screen with their name
 * 5. User can change their display name
 */

test.describe('Tic-Tac-Toe Happy Path', () => {
  test('should complete the full user journey from landing to welcome screen', async ({ page }) => {
    // Step 1: Navigate to the application
    await test.step('Navigate to home page', async () => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Tic-Tac-Toe/i);
    });

    // Step 2: Verify the display name prompt appears
    await test.step('Display name prompt should be visible', async () => {
      await expect(page.getByRole('heading', { name: /Welcome to Tic-Tac-Toe!/i })).toBeVisible();
      await expect(page.getByText(/Please enter a display name to get started/i)).toBeVisible();
      await expect(page.getByLabel(/Display Name/i)).toBeVisible();
    });

    // Step 3: Enter a valid display name
    await test.step('Enter valid display name', async () => {
      const displayNameInput = page.getByLabel(/Display Name/i);
      await displayNameInput.fill('TestPlayer');
      
      // Verify the input value
      await expect(displayNameInput).toHaveValue('TestPlayer');
      
      // Click the continue button
      await page.getByRole('button', { name: /Continue/i }).click();
    });

    // Step 4: Verify the welcome screen appears with the user's name
    await test.step('Welcome screen should display user name', async () => {
      // Modal should be closed
      await expect(page.getByRole('heading', { name: /Welcome to Tic-Tac-Toe!/i })).not.toBeVisible();
      
      // Welcome message should be visible
      await expect(page.getByText(/Welcome,/i)).toBeVisible();
      await expect(page.getByRole('heading', { name: 'TestPlayer' })).toBeVisible();
      
      // Main content should be visible
      await expect(page.getByRole('heading', { name: /^Tic-Tac-Toe$/i })).toBeVisible();
      await expect(page.getByText(/Play tic-tac-toe with your friends online/i)).toBeVisible();
      
      // Start Game button should be visible (even if disabled)
      await expect(page.getByRole('button', { name: /Start Game/i })).toBeVisible();
    });

    // Step 5: Test the "Change Name" functionality
    await test.step('Change display name', async () => {
      // Click the "Change Name" button
      await page.getByRole('button', { name: /Change Name/i }).click();
      
      // Modal should reappear
      await expect(page.getByRole('heading', { name: /Welcome to Tic-Tac-Toe!/i })).toBeVisible();
      
      // Enter a new name
      const displayNameInput = page.getByLabel(/Display Name/i);
      await displayNameInput.clear();
      await displayNameInput.fill('NewPlayer');
      await page.getByRole('button', { name: /Continue/i }).click();
      
      // Verify the new name is displayed
      await expect(page.getByRole('heading', { name: 'NewPlayer' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'TestPlayer' })).not.toBeVisible();
    });
  });

  test('should validate display name input', async ({ page }) => {
    await page.goto('/');

    // Test empty input
    await test.step('Should show error for empty input', async () => {
      await page.getByRole('button', { name: /Continue/i }).click();
      await expect(page.getByText(/Please enter a display name/i)).toBeVisible();
    });

    // Test too short input
    await test.step('Should show error for too short input', async () => {
      const displayNameInput = page.getByLabel(/Display Name/i);
      await displayNameInput.fill('A');
      await page.getByRole('button', { name: /Continue/i }).click();
      await expect(page.getByText(/Display name must be at least 2 characters/i)).toBeVisible();
    });

    // Test too long input
    await test.step('Should show error for too long input', async () => {
      const displayNameInput = page.getByLabel(/Display Name/i);
      await displayNameInput.fill('ThisNameIsWayTooLongForTheValidation');
      await page.getByRole('button', { name: /Continue/i }).click();
      await expect(page.getByText(/Display name must be 20 characters or less/i)).toBeVisible();
    });

    // Test valid input after errors
    await test.step('Should accept valid input after errors', async () => {
      const displayNameInput = page.getByLabel(/Display Name/i);
      await displayNameInput.clear();
      await displayNameInput.fill('ValidPlayer');
      await page.getByRole('button', { name: /Continue/i }).click();
      
      // Should successfully close modal and show welcome
      await expect(page.getByRole('heading', { name: 'ValidPlayer' })).toBeVisible();
    });
  });

  test('should persist display name in session', async ({ page, context }) => {
    // Set a display name
    await page.goto('/');
    await page.getByLabel(/Display Name/i).fill('PersistentPlayer');
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByRole('heading', { name: 'PersistentPlayer' })).toBeVisible();

    // Open a new page in the same context (same session)
    const newPage = await context.newPage();
    await newPage.goto('/');
    
    // The display name should be remembered (modal should not appear)
    await expect(newPage.getByRole('heading', { name: 'PersistentPlayer' })).toBeVisible();
    await expect(newPage.getByRole('heading', { name: /Welcome to Tic-Tac-Toe!/i })).not.toBeVisible();
    
    await newPage.close();
  });
});
