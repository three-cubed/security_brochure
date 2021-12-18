const mainURL = 'http://localhost:3200';
const buyPageURL = `${mainURL}/toBuy/buy`;

const { 
    launchPuppeteerAndOpenPage,
    getClassListArray
} = require('../javascripts/utils_for_tests.js')

describe('testing buy page functionality with automated browsers', () => {

    const timeLimitInSeconds = 20;
    const timeLimitInMilli = timeLimitInSeconds * 1000;

    test('click to open up available divs', async () => {
        const page = await launchPuppeteerAndOpenPage(buyPageURL);
        await page.evaluate(() => {
            let elems = document.getElementsByClassName('groupTitleSpan');
            for (let i = 0; i < elems.length; i++) {
                setTimeout (() => {
                    elems[i].scrollIntoView();
                    elems[i].click();
                }, ((i + 1) * 2000));
            }
        });
    }, timeLimitInMilli);

    test('click though all available buyables', async () => {
        const page = await launchPuppeteerAndOpenPage(buyPageURL);

        await page.evaluate(() => {
            let elems = document.getElementsByClassName('groupTitleSpan');
            for (let i = 0; i < elems.length; i++) {
                    elems[i].click();
            }
        });

        await page.evaluate(() => {
            let btns = document.getElementsByClassName('addToBasketBtn');
            for (let i = 0; i < btns.length; i++) {
                setTimeout (() => {
                    btns[i].click();
                }, ((i + 1) * 500));
            }
        });

    }, timeLimitInMilli);


    test('buy all available buyables, get a total displayed on an active payment modal', async () => {
        const page = await launchPuppeteerAndOpenPage(buyPageURL);

        await page.evaluate(() => {
            let elems = document.getElementsByClassName('groupTitleSpan');
            for (let i = 0; i < elems.length; i++) {
                    elems[i].click();
            }
        });

        await page.evaluate(() => {
            let btns = document.getElementsByClassName('addToBasketBtn');
            for (let i = 0; i < btns.length; i++) {
                    btns[i].click();
            }
        });

        await page.evaluate(() => {
            let btnPurchase = document.getElementsByClassName('btn-purchase')[0];
            btnPurchase.click();
        });

        const paymentModalClassList = await getClassListArray(page, '#payment-modal');
        expect(paymentModalClassList.includes('active')).toBe(true);

        const totalVal =  await page.$eval('#totalOnModal', el => el.innerText);
        expect(parseFloat(totalVal.replace(',', ''))).toEqual(expect.any(Number));

    }, timeLimitInMilli);

})
