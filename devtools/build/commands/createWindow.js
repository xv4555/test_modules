"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createWindow_1 = __importDefault(require("../scripts/createWindow"));
const WINDOW_FEATURES = 'menubar=1,toolbar=1,location=1,resizable=1,scrollbars=1';
const NEW_PAGE_URL = 'about:blank';
const DEFAULT_WINDOW_TYPE = 'tab';
/**
 * Create a new top-level browsing context.
 *
 * @alias browser.createWindow
 * @see https://w3c.github.io/webdriver/#new-window
 * @param {string} type  Set to 'tab' if the newly created window shares an OS-level window with the current browsing context, or 'window' otherwise.
 * @return {object}      New window object containing 'handle' with the value of the handle and 'type' with the value of the created window type
 */
async function createWindow({ type }) {
    type = type || DEFAULT_WINDOW_TYPE;
    let newPage;
    if (type === 'window') {
        const page = this.getPageHandle();
        await page.evaluate(createWindow_1.default, NEW_PAGE_URL, WINDOW_FEATURES);
        const newWindowTarget = await this.browser.waitForTarget((target) => target.url() === NEW_PAGE_URL);
        newPage = await newWindowTarget.page();
        if (!newPage) {
            throw new Error('Couldn\'t find page to switch to');
        }
    }
    else {
        newPage = await this.browser.newPage();
    }
    await newPage.bringToFront();
    return {
        handle: this.currentWindowHandle,
        type
    };
}
exports.default = createWindow;