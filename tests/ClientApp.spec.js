const {test, expect} = require('@playwright/test');
test.only('More assignment1', async ({page})=>
{
const productName = "ZARA COAT 3"
const products = await page.locator(".card-body h5");
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

const titles = await page.locator(".card-body h5").allTextContents();
const count = products.count();
for(let i =0; i<count ; i++){
    if(await products.nth(i).locator("h5").textContent() == productName){
       products.nth(i).locator("text = Add To Cart").click();
        break;
    }
}
await page.pause();
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const isPresent = page.locator("h3:has-text(productName)").isVisible();
expect(isPresent).toBeTruthy();
await page.locator("text=Checkout").click();
await page.locator("[placeholder*='Country']").pressSequentially("ind");
const dropdown = page.locator(".ta-results");
await dropdown.waitFor();
const optionsCount = await dropdown.locator("button").count();
for(let i=0; i<optionsCount; ++i){
 const text = await dropdown.locator("button").nth(i).textContent();
 if(text == "India"){
    await dropdown.locator("button").nth(i).click();
    break;
 }
 await page.pause();
}});

