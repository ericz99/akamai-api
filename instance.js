const puppeteer = require("puppeteer-extra").default;
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const lodash = require("lodash");
const os = require("os");
const url = require("url");
const fs = require("fs").promises;
const { EventEmitter } = require("events");
puppeteer.use(StealthPlugin());

const logger = require("./libs/logger");

class Instance {
  constructor(url, proxy) {
    this.url = url;
    this.proxy = proxy;
    this.page = null;
    this.browser = null;
    this.browserStarted = false;
    this.browserShouldRestart = false;
    this.collected = [];
    this.events = new EventEmitter();

    // # DO NOT MODIFY #
    this.log = logger("null");
    this.options = {
      headless: true,
      ignoreHTTPSErrors: true,
      executablePath:
        os.platform() == "win32"
          ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
          : "/usr/bin/chromium-browser",
      args: [
        "--disable-gpu",
        "--no-sandbox",
        "--disable-infobars",
        "--auto-open-devtools-for-tabs",
      ],
    };

    // # open browser
    this.openBrowser();
  }

  async getCookie(url) {
    // Here's the navigation. From now on we'll have a mouse cursor on the page.
    await this.page.goto(url);
    // # get cookie after
    const cookie = await this.page.evaluate(() => {
      return bmak.get_cookie();
    });

    // # clear browser after
    await this.clearSession();
    // # return cookie
    return cookie;
  }

  requestFilter(request) {
    const resourceTypes = ["font", "image", "stylesheet"];
    resourceTypes.includes(request.resourceType())
      ? request.abort()
      : request.continue();
  }

  async openBrowser() {
    this.browser = await puppeteer.launch(this.options);
    this.page = await this.browser.newPage();
    // # intercept request
    await this.page.setRequestInterception(true);
    // # filter all css, images, e tc
    this.page.on("request", (request) => this.requestFilter(request));
  }

  /**
   *
   * @param {*} page
   * @description minimize window
   */
  async minimize(page) {
    // Create raw protocol session.
    const session = await page.target().createCDPSession();
    const { windowId } = await session.send("Browser.getWindowForTarget");
    await session.send("Browser.setWindowBounds", {
      windowId,
      bounds: { windowState: "minimized" },
    });
  }

  /**
   *
   * @param {*} page
   * @description clear session
   */
  async clearSession(page) {
    const client = await this.page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");
    await client.send("Network.clearBrowserCache");
    // # clear browser after
    await this.page.reload();
  }

  /**
   *
   * @param {*} ms
   * @description sleep function
   */
  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

module.exports = Instance;
