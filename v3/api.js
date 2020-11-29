const express = require("express");
const http = require("http");

const SensorGen = require(".");

(async () => {
  const app = express();
  const server = http.createServer(app);
  app.get("/gen", async (req, res) => {
    const cookie = await new SensorGen("gamestop", {
      makeCookie: true,
    }).initSensorGen();

    return res.status(200).json({
      cookie: cookie,
      length: cookie.length,
    });
  });

  server.listen(8080, () => {
    console.log("connected 8080");
  });
})();
