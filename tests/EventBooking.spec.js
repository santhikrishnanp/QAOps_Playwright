const {test, expect} = require('@playwright/test');

async function loginToEventHub(page){
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("p.santhi@example.com");
    await page.getByLabel("password").fill("Santhi@88");
    await page.locator(".login-submit-btn").click();
    await expect(page.getByText("Browse Events →")).toBeVisible();
}
test('Event hub booking login', async ({page})=>
{
 loginToEventHub(page);
// await page.goto("https://eventhub.rahulshettyacademy.com/login");
// await page.getByPlaceholder("you@email.com").fill("p.santhi@example.com");
// await page.getByLabel("password").fill("Santhi@88");
// await page.locator(".login-submit-btn").click();
await expect(page.getByText("Browse Events →")).toBeVisible();

});

test.only('Creating Event test', async ({page})=>
{
await loginToEventHub(page);

await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");

// await page.locator("#nav-events").click();
const eventName = `Test Event ${Date.now()}`; 
console.log(eventName);
// await page.getByRole("button", {name: /add event/i}).scrollIntoViewIfNeeded();
// await page.getByRole("button", {name: /add event/i}).click();
await page.locator('#event-title-input').fill(eventName);
await page.getByPlaceholder("Describe the event…").fill("This is a test event created using Playwright automation.");
await page.selectOption('#category', 'Conference');
await page.getByLabel("city").fill('Bengaluru');
await page.getByLabel("venue").fill('Test Venue');
await page.getByLabel('Event Date & Time').fill('2027-12-31T18:00');
await page.getByLabel('Price ($)').fill('100');
await page.getByLabel('Total Seats').fill("100");
await page.locator('#add-event-btn').click();
await expect(page.getByText('Event created!')).toBeVisible();
await page.locator("#nav-events").click();
await expect(page.locator('#book-now-btn').first()).toBeVisible();
// const eventCards = page.getByTestId('event-card'); // another appraoch to get the event cards using testid attribute,
//  but in this case we dont have that attribute in the dom, so we are using the id of the parent div which is unique for each event card
//   await expect(eventCards.first()).toBeVisible();

const eventTitles = await page.locator('#event-card');
const count = await eventTitles.count();
console.log("Total events: " + count);
//  const targetCard = eventCards.filter({ hasText: eventTitle }).first(); 
    //another approach to get the particular event card using filter method of locator, 
    // but in this case we are using the id of the parent div which is unique for each event card,
    //  so we are directly getting the list of event cards and then iterating through them to find the target event card
//   await expect(targetCard).toBeVisible({ timeout: 5000 });

// const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
 //another approach to get the seats count before booking using the target card locator.
 // 

for(let i=0; i<count; ++i){
if(await eventTitles.nth(i).locator('h3').textContent() == eventName){
    // await expect(eventTitles.nth(i).locator('.font-semibold')).toBeVisible();
    const seatcount = parseInt(await eventTitles.nth(i).locator('span').getByText(' seats available').first().innerText());
    console.log("Seats available: " + seatcount);
    await eventTitles.nth(i).locator('a').getByText('Book Now').click();
    

    // await eventTitles.nth(i).locator('text=Book Now').click();

}}});

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