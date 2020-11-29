const { CookieJar } = require("tough-cookie");
const got = require("got");
const setTitle = require("console-title");

const SensorGen = require("../v2/sensorGen");
const Logger = require("../libs/logger")("GAMESTOP");

async function createTest(amount) {
  let harvested = [];
  let i = 0;
  let successCount = 0;
  let errorCount = 0;
  let intv = null;
  let t;

  intv = setInterval(
    (t = async () => {
      if (i === amount) {
        const rate = successCount / i;
        clearInterval(intv);
        console.log("DONE!");
        Logger.green(`[${successCount}/${i}] - SUCCESS RATE: ${rate}`);
      } else {
        // # gen cookie
        const cookie = await new SensorGen({
          isMact: false,
          isKact: false,
          proxy: false,
        }).makeCookie("gamestop");

        if (cookie.length > 400 || cookie.length == 417) {
          Logger.green(`[${i}] [${cookie.length}] COOKIE VALID: ${cookie}`);
          successCount++;
        } else {
          Logger.red(`[${i}] [${cookie.length}] INVALID COOKIE: ${cookie}`);
          errorCount++;
        }

        // setTitle(
        //   `Sensor Generator | Generated: ${successCount} | Error: ${errorCount}`
        // );

        // // # add to cart
        // await addToCart("136307", cookie, i);
        i++;
      }
    }),
    500
  );

  t();
}

async function addToCart(productID, cookie, i) {
  // Logger.green(`[${i}] [${cookie.length}] COOKIE VALID: ${cookie}`);
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
      }
    );

    Logger.yellow(cookie);
    Logger.green(`[${i}] ATC STATUS: ${resp.statusCode}`);
  } catch (e) {
    if (e) {
      Logger.red("INVALID COOKIE");
    }
  }
}

// // # add to cart
// addToCart(
//   "134407",
//   "D216C07683A4DAA590A4A68716E5E896~-1~YAAQTgEkFys1Id51AQAA+FFu8QQf7Sq8K0l8z1bsas1yUjvTifMTe+49wd4coR0UHUAJ69bSAa0V+OsDV6nJNyfQOh3Y5HaEkMytV3LsxZVAZg7AzWqGTjO+uALsZoxsgtGfIBM6IeIWXaCFMo5k+wRUslWXGlKPzjdtE952eLj/VsA4/DhJhg9FDFUjLNGXhNK19pfV2bC6oTsQ/HH4tJhTZDoxjl+kGh9myBNTmBIGR0nwj2ySErzqaxcQKpsR7xKym3OH3Sn3546GzzAZrftfc0hC4uzvUXJg09CjdkB/zCIDhRvSI9sTFQXx18w3SHU+2bALVH1UzOojCcQMjXmcRtaSbeiKq6erUDSCx05ZWJl/Fg==~-1~-1~-1",
//   0
// );

// # make test
createTest(300);

// 450/500 - 90% - k = 1000, 1500, 1,20
// 280/1000 - 28% - k = 1000, 1500, 1,15
// 289/300 - 96% - NEWDEVICE.json
// 300/300 - 100% success rate - olddevice.json

// 456/500 - 91% - new device and new kact algo
// 500/500 - 100% - old device and new kact algo :)
// [2020-11-25T19:08:18.614Z] [881/1000] - SUCCESS RATE: 0.881 - kact event + new device
