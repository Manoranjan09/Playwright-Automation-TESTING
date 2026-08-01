import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

// Credentials
const USER_EMAIL = 'kashyapsri507@gmail.com';
const USER_PASSWORD = 'Mano123@';

// Helper
async function login(page) {
  await page.goto(`${BASE_URL}/login`);

  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  await page.getByLabel('Password').fill(USER_PASSWORD);
  await page.locator('#login-btn').click();

  await expect(
    page.getByRole('link', { name: 'Browse Events →' })
  ).toBeVisible();
}

test('create event via UI, book it, and verify seat reduction', async ({ page }) => {

  // Step 1
  await login(page);

  // Step 2
  await page.goto(`${BASE_URL}/admin/events`);

  const eventTitle = `Test Event ${Date.now()}`;

  await page.locator('#event-title-input').fill(eventTitle);
  await page.locator('#admin-event-form textarea').fill('Playwright test event');

  await page.getByLabel('City').fill('Test City');
  await page.getByLabel('Venue').fill('Test Venue');

  await page.getByLabel('Event Date & Time').fill('2027-12-31T10:00');

  await page.getByLabel('Price ($)').fill('100');
  await page.getByLabel('Total Seats').fill('50');

  await page.locator('#add-event-btn').click();

  await expect(page.getByText('Event created!')).toBeVisible();

  console.log(`Created event : ${eventTitle}`);

  // Step 3
  await page.goto(`${BASE_URL}/events`);

  const eventCards = page.getByTestId('event-card');

  await expect(eventCards.first()).toBeVisible();

  const targetCard = eventCards.filter({ hasText: eventTitle }).first();

  await expect(targetCard).toBeVisible();

  const seatsBeforeBooking = parseInt(
    await targetCard.getByText('seat').first().innerText()
  );

  console.log("Seats Before :", seatsBeforeBooking);

  await targetCard.getByTestId('book-now-btn').click();

  // Step 4

  const ticketCount = page.locator('#ticket-count');

  await expect(ticketCount).toHaveText('1');

  await page.getByLabel('Full Name').fill('Manoranjan Kumar');

  await page.locator('#customer-email').fill(USER_EMAIL);

  await page
    .getByPlaceholder('+91 98765 43210')
    .fill('9876543210');

  await page.locator('.confirm-booking-btn').click();

  // Step 5

  const bookingRefEl = page.locator('.booking-ref').first();

  await expect(bookingRefEl).toBeVisible();

  const bookingRef = (await bookingRefEl.innerText()).trim();

  console.log(`Booking Ref : ${bookingRef}`);

  // Step 6

  await page.getByRole('link', { name: 'View My Bookings' }).click();

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);

  const bookingCards = page.locator('#booking-card');

  await expect(bookingCards.first()).toBeVisible();

  const matchingCard = bookingCards.filter({
    has: page.locator('.booking-ref', {
      hasText: bookingRef
    })
  });

  await expect(matchingCard).toBeVisible();

  await expect(matchingCard).toContainText(eventTitle);

  console.log("Booking Verified Successfully");

  // Step 7

  await page.goto(`${BASE_URL}/events`);

  await expect(eventCards.first()).toBeVisible();

  const updatedCard = eventCards.filter({
    hasText: eventTitle
  }).first();

  await expect(updatedCard).toBeVisible();

  const seatsAfterBooking = parseInt(
    await updatedCard.getByText('seat').first().innerText()
  );

  console.log("Seats After :", seatsAfterBooking);

  expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

});