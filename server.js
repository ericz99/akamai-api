const express = require("express");
const http = require("http");
const os = require("os");

const Instance = require("./instance");

(async () => {
  const app = express();
  const server = http.createServer(app);
  const browser = new Instance();

  // # open browser
  await browser.openBrowser();

  app.get("/?", async (req, res, next) => {
    const { query } = req;
    // # get the cookie
    const cookie = await browser.getCookie(query.site);
    // # send back response
    return res.status(200).json({
      status: 200,
      cookie: cookie,
    });
  });

  server.listen(5000, () => {
    console.log("Server is listening on port 5000");
  });
})();
