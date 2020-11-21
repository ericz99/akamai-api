const { CookieJar } = require("tough-cookie");
const got = require("got");
const request = require("request-promise");

const SensorGen = require("../v2/sensorGen");
const Logger = require("../libs/logger")("FINISHLINE");

async function createTest(amount) {
  let harvested = [];
  let i = 0;
  let intv = null;
  let t;

  intv = setInterval(
    (t = async () => {
      if (i == amount) {
        clearInterval(intv);
        console.log("DONE!");
      } else {
        // # gen cookie
        const cookie = await new SensorGen({ isMact: true }).makeCookie(
          "finishline"
        );
        // # add to cart
        await addToCart(cookie, i);
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
