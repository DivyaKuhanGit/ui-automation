const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
var webdriver = require('selenium-webdriver');

describe('Log in', () => {
  const hostUrl = 'https://ssh-tenantadmin-test-ui.azurewebsites.net';

  let driver;

  beforeAll(async () => {
    driver = new webdriver.Builder().forBrowser('chrome').build();
  });

  it('happy path log in', async () => {
    try {
      await driver.get(hostUrl);

      await waitForPageLoad(driver);

      console.warn("finished waiting for page")

      driver.findElement(By.className('MuiButtonBase-root')).click();
      driver.findElement(By.id('logonIdentifier')).sendKeys('smart.apprentice.automation@gmail.com');
      driver.findElement(By.id('password')).sendKeys('Smart1@Apprentice');
      driver.findElement(By.id('next')).click();
      const url = await driver.getCurrentUrl();
      console.warn(url);
    } catch (e) {
      console.dir(e);
    }
  });
});



 async function waitForPageLoad(driver){
  await driver.wait(function() {
    return driver.executeScript('return document.readyState').then(function(readyState) {
      return readyState === 'complete';
    });
  });
}