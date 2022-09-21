import { test, expect } from '@playwright/test';
test('CodeGen Test', async ({ page }) => {
	// Go to https://www.google.com/?gws_rd=ssl
	await page.goto('https://www.google.com/?gws_rd=ssl');
	// Click button:has-text("Accept all")
	await page.locator('button:has-text("Accept all")').click();
	await expect(page).toHaveURL('https://www.google.com/?gws_rd=ssl');
	// Click [aria-label="Search"]
	await page.locator('[aria-label="Search"]').click();
	// Fill [aria-label="Search"]
	await page.locator('[aria-label="Search"]').fill('rahul shetty');
	// Press Enter
	await page.locator('[aria-label="Search"]').press('Enter');
	await expect
		.soft(page)
		.toHaveURL(
			'https://www.google.com/search?q=rahul+shetty&source=hp&ei=yxYAY9PlNciA8gKXoKjIBg&iflsig=AJiK0e8AAAAAYwAk2yLOg-3DCnOAbjIqY5GXdTI9ynlL&ved=0ahUKEwiT9-HegdT5AhVIgFwKHRcQCmkQ4dUDCAk&uact=5&oq=rahul+shetty&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOg4IABCPARDqAhCMAxDlAjoOCC4QjwEQ6gIQjAMQ5QI6EQguEIAEELEDEIMBEMcBENEDOg4ILhCABBCxAxCDARDUAjoLCAAQgAQQsQMQgwE6DgguEIAEELEDEMcBENEDOggILhCxAxCDAToFCC4QgAQ6CAgAELEDEIMBOggILhCABBCxAzoLCC4QgAQQsQMQgwE6CwguEIAEELEDENQCOg4ILhCxAxCDARDHARCvAToICAAQgAQQsQM6CAguEIAEENQCUJsFWO4zYI9HaAFwAHgAgAFDiAG4BZIBAjEymAEAoAEBsAEK&sclient=gws-wiz'
		);
	// Click text=Rahul Shetty Academyhttps://rahulshettyacademy.com >> h3
	await page
		.locator('text=Rahul Shetty Academyhttps://rahulshettyacademy.com >> h3')
		.click();
	await expect(page).toHaveURL('https://rahulshettyacademy.com/');
	// Click text=Access to All Courses
	await page.locator('text=Access to All Courses').click();
	await expect(page).toHaveURL(
		'https://rahulshettyacademy.com/lifetime-access'
	);
	// Click text=Enroll Now
	await page.locator('text=Enroll Now').click();
	await expect(page).toHaveURL(
		'https://courses.rahulshettyacademy.com/p/get-access-to-all-courses/'
	);
	// Click a:has-text("Enroll in Course")
	await page.locator('a:has-text("Enroll in Course")').click();
	// Click label:nth-child(3) > .col-sm-1 > .custom-radio
	await page.locator('label:nth-child(3) > .col-sm-1 > .custom-radio').click();
});
