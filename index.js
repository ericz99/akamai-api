const fs = require("fs");
const path = require("path");

const startSensorGen = require("./gen");

function start(amount) {
  let harvested = [];
  let i = 0;
  let intv = null;
  let t;

  intv = setInterval(
    (t = async () => {
      if (i == amount) {
        clearInterval(intv);
        // # save to file
        fs.appendFile("finishline.txt", harvested.join("\n"), (err) => {
          if (!err) {
            console.log("saved!");
          }
        });
      } else {
        const cookie = await startSensorGen("finishline", null);
        harvested.push(cookie);
        i++;
      }
    }),
    1000
  );

  t();
}

start(1);
