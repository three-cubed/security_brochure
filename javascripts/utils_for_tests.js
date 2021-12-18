const puppeteer = require('puppeteer');

async function launchPuppeteerAndOpenPage(pageToOpen, isHeadless = false) {
    if (isHeadless === 'headless') isHeadless = true;
    const browser = await puppeteer.launch({
        headless: isHeadless,
        slowMo: 100,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        // The executable path makes puppeteer open in chrome, not chromium, allowing the video to display.
        // The exectuable path is found by typing chrome://version/ into the chrome browser and finding the relevant info.
    });
    const page = await browser.newPage();
    await page.goto(pageToOpen);
    return page;
}

async function getClassListArray(page, element) {
    const elementHandle = await page.$(element);
    const className = await elementHandle.getProperty("className");
    const classNameString = await className.jsonValue();    
    const classList = await classNameString.split(" ");
    return classList;
}

module.exports = {
    launchPuppeteerAndOpenPage,
    getClassListArray
};
