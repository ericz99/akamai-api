const { app, BrowserWindow } = require("electron");
const { performance } = require("perf_hooks");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("https://www.google.com/");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

/**
 * @returns {string} MR Value
 */
function getmr() {
  for (
    var a = "",
      t = 1e3,
      e = [
        Math.abs,
        Math.acos,
        Math.asin,
        Math.atanh,
        Math.cbrt,
        Math.exp,
        Math.random,
        Math.round,
        Math.sqrt,
        isFinite,
        isNaN,
        parseFloat,
        parseInt,
        JSON.parse,
      ],
      n = 0;
    n < e.length;
    n++
  ) {
    var o = [],
      m = 0,
      r = performance.now(),
      i = 0,
      c = 0;
    if (void 0 !== e[n]) {
      for (i = 0; i < t && m < 0.6; i++) {
        for (var b = performance.now(), d = 0; d < 4e3; d++) e[n](3.14);
        var k = performance.now();
        o.push(Math.round(1e3 * (k - b))), (m = k - r);
      }
      var l = o.sort();
      c = Math.round(l[Math.floor(l.length / 2)] / 5);
    }
    a = a + c + ",";
  }
  return a != null ? a : getmr();
}

function genMR() {
  let harvested = [];
  let i = 0;
  let intv;

  intv = setInterval(() => {
    if (i == 100) {
      console.log(harvested);
      clearInterval(intv);
      return;
    } else {
      harvested.push(getmr());
      i++;
    }
  }, 2000);
}
