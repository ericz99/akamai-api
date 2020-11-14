const { CookieJar } = require("tough-cookie");
const got = require("got");

const SensorGen = require("../v2/sensorGen");
const Logger = require("../libs/logger")("GAMESTOP");

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
        const cookie = await new SensorGen({ isMact: false }).makeCookie(
          "gamestop"
        );
        // # add to cart
        await addToCart("134407", cookie);
        i++;
      }
    }),
    1000
  );

  t();
}

async function addToCart(productID, cookie) {
  try {
    const resp = await got(
      `https://www.gamestop.com/on/demandware.store/Sites-gamestop-us-Site/default/Cart-AddProduct?redesignFlag=true&productID=${productID}`,
      {
        method: "POST",
        form: {
          pid: productID,
          quantity: 1,
          pageSpecified: "PLP",
          recentCheck: true,
        },
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          cookie: `_abck=${cookie}`,
          "content-length": 56,
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
        },
        responseType: "json",
        timeout: 10000,
        decompress: true,
        http2: true,
        cookieJar: new CookieJar(),
      }
    );

    Logger.yellow(cookie);
    Logger.green(`ATC STATUS: ${resp.statusCode}`);
  } catch (e) {
    if (e) {
      Logger.red("INVALID COOKIE");
    }
  }
}

// # make test
createTest(20);
