const cookiejar = require("tough-cookie");
const got = require("got");

async function addToCart(productID) {
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
        cookie:
          "_abck=B5AF8B10D6E59D051908298369C2C4A7~-1~YAAQ3yckF8miUZZ1AQAAjUp5vwTBRLx05bRynZK3gtuRApJgQll9UZVa1LQztw0yRwFIcHRaOqdYbP6G/QWuo95YScEZh+rNcbo2u5Whbv2QSlPk0wH8ne9r2wbVXW3EHk50RctbCNOn0rDSMV7k47MGVZDiF6BigzvbsUBn9/q6NSJtv5HUFlNAjW6CQvaRKOQRQBUHd3Rj0zvWZTmz6lX5CVtGp6JEoCQRxFAojSM4gDQ9STgaEvr3rnx8zygc3NTSxX+brvFozE+wxy9MwJExHuMCotztgVo+6GBvK6IT9vy7mHQqkqVbtQTfzCGoAJyoUGdL7NJ+cCW2XzfH++FLjxCovH3tBKVbwl1LAnfHNX6JRw==~-1~-1~-1",
        "content-length": 56,
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36",
      },
      responseType: "json",
      timeout: 10000,
      decompress: true,
      http2: true,
      cookiejar,
    }
  );

  console.log(resp.body);
}

addToCart("134407");
