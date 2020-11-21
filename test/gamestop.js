const { CookieJar } = require("tough-cookie");
const got = require("got");

const SensorGen = require("../v2/sensorGen");
const Logger = require("../libs/logger")("GAMESTOP");

async function createTest(amount) {
  let harvested = [];
  let i = 0;
  let successCount = 0;
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
          isKact: true,
          proxy: false,
        }).makeCookie("gamestop");

        if (cookie.length > 400 || cookie.length == 417) {
          Logger.green(`[${i}] [${cookie.length}] COOKIE VALID: ${cookie}`);
          successCount++;
        } else {
          Logger.red(`[${i}] [${cookie.length}] INVALID COOKIE: ${cookie}`);
        }

        // // # add to cart
        // await addToCart("136307", cookie, i);
        i++;
      }
    }),
    350
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
//   "176D7B9D56913770D94D1C113F2D05A5~-1~YAAQTgEkF2bkBd51AQAA5BkT5gRaM/ptE2y6HddYNNE2L+yL1eKMlrM47BsdQphxkvRYt6GnFN6T57q3Mf5brr4YHdMBPjtNFA23TAVrRSSA3DMAKD15lmJMkjnpNwqfoOjjNY1hZIRrnHe1n5+5IGkJ/pra71lz4Xa3eLP6LpAPl5Tw/E1mWeJtk9PhhYhSeLaHthMPG4YRFcBmBkq8dBcQP1dd/Lxp0QNww0ZnaMkWaSBzGCtnyExcK61uNZcyg1etnFBP+wYRfqKefE0YJPyRUylhaKF/3KAR54RIxn4rOj9OA14FIBxR7qR4r+BYxtZ7wZHec/bGnxhOxTRKF/AHA+OybUNONbmRUvaMPoIxaIxJSA==~-1~-1~-1",
//   0
// );

// # make test
createTest(1000);

// 450/500 - 90% - k = 1000, 1500, 1,20
// 280/1000 - 28% - k = 1000, 1500, 1,15
// 289/300 - 96% - NEWDEVICE.json
// 300/300 - 100% success rate - olddevice.json
