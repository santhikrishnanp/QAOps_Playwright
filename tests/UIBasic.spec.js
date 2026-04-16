const {test, expect} = require('@playwright/test');

test('Browser context declaration playwright test', async ({browser})=>
{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/mentorship")

});

test('Direct Page declaration playwright test', async ({page})=>
{

await page.goto("https://www.google.com")
await expect(page).toHaveTitle("Google");

});

test('More validations1', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await page.locator('input#username').fill('rahulshetty');
await page.locator("[type='password']").fill('Learning@830$3mK2');
await page.locator("input#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());
// await expect (page.locator("[style*='block']")).toContainText("test")
await page.locator('input#username').fill("");
page.locator('input#username').fill('rahulshettyacademy');
await page.locator("input#signInBtn").click();
await page.locator(".card-title a").click();
});

test('More assignment1', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
console.log(await page.title());
await page.locator('#userEmail').fill('santhikrishnan64@gmail.com');
await page.locator('#userPassword').fill('Santhi@1988');
await page.locator("#login").click();
// this line is for waiting for the page to load for the network to load completely,but official doc says this migh be a flaky validation
// await page.waitForLoadState('networkidle');
// below is another way for the test to wait till the partickuar webelement is loaded
await page.locator(".card-body h5").first().waitFor();
console.log(await page.locator(".card-body h5").nth(0).textContent());
});

test('More UI actions', async ({page})=>
{

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

await page.locator('input#username').fill('rahulshetty');
await page.locator("[type='password']").fill('Learning@830$3mK2');
await page.locator("span.checkmark").last().click();
await page.locator("button#okayBtn").click();
const dropdown = await page.locator("select.form-control");
await dropdown.selectOption("consult");
await page.locator("input#terms").click();
await expect (page.locator("input#terms")).toBeChecked;
await page.locator("input#terms").uncheck();
expect(await page.locator("input#terms").isChecked()).toBeFalsy();

// this line is for waiting for the page to load for the network to load completely,but official doc says this migh be a flaky validation
// await page.waitForLoadState('networkidle');
// below is another way for the test to wait till the partickuar webelement is loaded
// await page.locator(".card-body h5").first().waitFor();
// console.log(await page.locator(".card-body h5").nth(0).textContent());
});