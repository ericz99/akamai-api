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
          "_abck=7EED424C17ECF89BA9B0907A01F3A42E~-1~YAAQrCckF1ivLbJ1AQAAyOyAvwRdHHqbRuaJM7uEF+Dz0Z9DQz/B8Q0afFAUnScGoOtKS8hVz3JPZsmfXkAlSBz7Z/AAq1e9o2LEfszoCB0k4vWldfwhHVTkINKZV5ik1dmRPDafpLnHh+UEaq0izg9pQJfRUDFucGF6ooqFjza3eTDQyuQmmSXQVS5ANTvXl3b75mRih2yPCNy6yzjv7s32beCmjgRaznB2H9ghr2t4zWCZIcnCQ3WUnXySYm7sBeuSZv30G21XxapGmu7JcZDurUV1Dd2icgTZMagc4PYnwmN+ci85GyeQM1b8esNGED1bUXseXNG5WpVxv7ST1zQWgzSbu9+XAJC/rYNpq/iuU6Hovw==~-1~-1~-1",
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
