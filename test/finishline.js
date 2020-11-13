const { CookieJar } = require("tough-cookie");
const got = require("got");

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
        const cookie = await new SensorGen().makeCookie("finishline");
        // # add to cart
        await addToCart(cookie);
        i++;
      }
    }),
    1000
  );

  t();
}

async function addToCart(cookie) {
  //   try {

  //   } catch (e) {
  //     if (e) {
  //       Logger.red("INVALID COOKIE");
  //     }
  //   }

  console.log(cookie);

  const resp = await got(
    "https://www.finishline.com/store/browse/productDetail.jsp?productId=prod2800331&_DARGS=/store/browse/productDetailDisplay.jsp.flAddToCart",
    {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        Cookie: `_abck=${cookie}`,
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
      timeout: 10000,
      decompress: true,
      http2: true,
      cookieJar: new CookieJar(),
    }
  );

  Logger.yellow(cookie);
  console.log(resp.statusCode);

  //   Logger.green(`ATC STATUS: ${resp.statusCode}`);
}

createTest(2);
