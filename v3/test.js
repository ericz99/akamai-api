const got = require("got");
const Logger = require("../libs/logger")("GAMESTOP");
const SensorGen = require("./");

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
        const cookie = await new SensorGen("gamestop", {
          makeCookie: true,
        }).initSensorGen();

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
    350
  );

  t();
}

createTest(300);
