const mainURL = 'http://localhost:3200';

const { launchPuppeteerAndOpenPage } = require('../javascripts/utils_for_tests.js')

test('click though head banner choices (automated browser)', async () => {
    const page = await launchPuppeteerAndOpenPage(mainURL, 'headless');
    await page.evaluate(() => {
        let elems = document.getElementsByClassName('headBannerChoiceToClick');
        for (let i = 0; i < elems.length; i++) {
            setTimeout (() => {
                elems[i].click();
            }, ((i + 1) * 2200));
        }
    });
}, 24000);
