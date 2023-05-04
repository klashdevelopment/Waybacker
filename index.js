import puppeteer from 'puppeteer';
var SPN_URL = `https://archive.org/save/`;
var SPN_INPUT_SELECTOR = `#web-save-url-input`;
var SPN_SAVE_SELECTOR = `#web-save-form > input.web-save-button.web_button.web_text`;
var SPN_SAVE_ERROR_SELECTOR = `#capture_all`;

export default {
    async savePage(url, saveErrors=true) {
        console.log('(Waybacker Debug) On macOS, you may see some notification popups: please ignore them!');
        var browser = await puppeteer.launch({headless: 'new'});
        var page = await browser.newPage();
        await page.goto(SPN_URL);
        if (saveErrors) {
            page.waitForSelector(SPN_SAVE_ERROR_SELECTOR).then(thing => thing.getProperty('checked'));
        }
        await page.type(SPN_INPUT_SELECTOR, url);
        await page.click(SPN_SAVE_SELECTOR);
        await browser.close();
        return true;
    }
}