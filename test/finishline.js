const { CookieJar } = require("tough-cookie");
const got = require("got");
const request = require("request-promise");
const setTitle = require("console-title");

const SensorGen = require("../v2/sensorGen");
const Logger = require("../libs/logger")("FINISHLINE");

async function createTest(amount) {
  let harvested = [];
  let i = 0;
  let successCount = 0;
  let errorCount = 0;
  let intv = null;
  let t;

  intv = setInterval(
    (t = async () => {
      if (i == amount) {
        const rate = successCount / i;
        clearInterval(intv);
        console.log("DONE!");
        Logger.green(`[${successCount}/${i}] - SUCCESS RATE: ${rate}`);
      } else {
        // # gen cookie
        const cookie = await new SensorGen({ isKact: true }).makeCookie(
          "finishline"
        );

        if (cookie.length > 500 || cookie.length == 529) {
          Logger.green(`[${i}] [${cookie.length}] COOKIE VALID: ${cookie}`);
          successCount++;
        } else {
          Logger.red(`[${i}] [${cookie.length}] INVALID COOKIE: ${cookie}`);
          errorCount++;
        }

        setTitle(
          `Sensor Generator | Generated: ${successCount} | Error: ${errorCount}`
        );

        // # add to cart
        // await addToCart(cookie, i);
        i++;
      }
    }),
    500
  );

  t();
}

async function addToCart(cookie, i) {
  try {
    const opts = {
      uri: `https://www.finishline.com/store/browse/productDetail.jsp?productId=prod2800331&_DARGS=/store/browse/productDetailDisplay.jsp.flAddToCart`,
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        Cookie: `_abck=${cookie}`,
        Connection: "keep-alive",
        Host: "www.finishline.com",
        origin: "https://www.finishline.com",
        referer: "https://www.finishline.com/",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
      },
      form: {
        _dyncharset: "UTF-8",
        requiresSessionConfirmation: false,
        "/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrderSuccessURL":
          "/store/browse/productDetail.jsp?productId=prod2800331",
        "_D:/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrderSuccessURL":
          "",
        "/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrderErrorURL":
          "/store/browse/productDetail.jsp?productId=prod2800331&dontCachePDP=tru",
        "_D:/atg/commerce/order/purchase/CartModifierFormHandler.addItemToOrderErrorURL":
          "",
        catalogRefIds: 5161225,
        "_D:catalogRefIds": "",
        productId: "prod2800331",
        "_D:productId": "",
        items: "",
        "_D:items": "",
        quantity: 1,
        "_D:quantity": "",
        "/atg/commerce/order/purchase/CartModifierFormHandler.dimensionId": "",
        "_D:/atg/commerce/order/purchase/CartModifierFormHandler.dimensionId":
          "",
        addToCartExecutionToken: "",
        "Add To Cart": "Add To Cart",
        "_D:Add To Cart": "",
        _DARGS: "/store/browse/productDetailDisplay.jsp.flAddToCart",
      },
    };

    const resp = await _makeRequest(opts);
    Logger.yellow(cookie);
    Logger.green(`[${i}] [${cookie.length}] ATC STATUS: ${resp.statusCode}`);
  } catch (e) {
    if (e) {
      Logger.red("INVALID COOKIE");
    }
  }
}

async function _makeRequest(options) {
  options.method = options.method || "GET";

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    dnt: "1",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    Host: "www.finishline.com",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  if (options.headers) {
    for (const key of Object.keys(options.headers)) {
      headers[key] = options.headers[key];
    }
  }

  const settings = {
    ...options,
    uri: options.uri,
    json: options.json,
    method: options.method,
    proxy: options.proxy || null,
    resolveWithFullResponse: true,
    qs: options.qs,
    simple: false,
    headers,
  };

  if (options.form) settings.form = options.form;

  return await request.defaults({ gzip: true })(settings);
}

createTest(1000);

// // # add to cart
// addToCart(
//   "1733BA45E48FFBE48168296522270DC3~-1~YAAQFYPXF5FU1vp1AQAAp/3i+wRCea7z+arwpl4355jnKQS4WLe2zm7CwVTp49ZcDeuedD7cfkJ7OoJJgHOtfizu5xNesmI9nlzIVhZCOGo2QFzOHw03hgdDlS6wd0/oxnv/SWqDrgK6DIcQYiZEZ8ip7SpJB57pF6c7g80Muh8vxK6csOt22+TM7LGgtRwXEzedeFLCmgloXOZP+Dvhww0TCsYKcKWjQUZ4Neee/u/HC5rj1iKa/0wny9Zoqgp3jL/2zvJ8hGmHOSCql2G21yERt8x71wy1w/IOO8iKjtjPPI24EHIyA7C1w7CE1L6L/yU9dULXLKqzKseBK0JSkdnb8SfapEJXD0Irm1ECDfw1uJzOxyU5otoZJFOapgkdqoLXICdR5nlFXXJfKWayI9rBnxdXYHoirB7bc7QbkXkxOS1uU8iYPZ9KOMxCGsTl1/vs6vtN5EWGK3aD8cR65K+pHfwJEZU=~-1~-1~-1",
//   0
// );

// [458/500] - SUCCESS RATE: 0.916 eventless
// [472/500] - SUCCESS RATE: 0.944 eventless
// [566/600] - SUCCESS RATE: 0.9433333333333334 eventless
// [799/800] - SUCCESS RATE: 0.99875 - with new device
