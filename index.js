const UserAgent = require("user-agents");
const fs = require("fs");
const lodash = require("lodash");
const request = require("request-promise");
const siteOptions = require("./stores.json");
const canvas = require("./canvas.json");

const userAgent = new UserAgent(/Chrome/, { deviceCategory: "desktop" });

/**
 *
 * @param {*} site
 * @param {*} proxy
 * @description get initial cookie
 */
async function getInitialCookie(site, proxy) {
  try {
    const cookieJar = new request.jar();
    const usedUserAgent = userAgent.toString().replace(/\|"/g, "");
    const getUABrowser = getUaBrowser(usedUserAgent);
    const site = siteOptions.find((s) => s[site] && s)[site];

    // # make request
    const resp = await request({
      method: "GET",
      uri: site.url,
      headers: {
        ...site.headers,
        "user-agent": usedUserAgent,
      },
      proxy: proxy !== undefined ? `http://${proxy}` : null,
      timeout: 2000,
      resolveWithFullResponse: true,
      jar: cookieJar,
      simple: false,
    });

    let p = /src="\/(static|assets|api|resources)\/(\w+)/gm.exec(resp.body);
    let post_url = `${p[1]}/${p[2]}`;
    let abck = resp.headers["set-cookie"]
      .toString()
      .split("_abck=")[1]
      .split("; Domain")[0];

    // # generate sensor data
    return generateSensorData(
      abck,
      cookieJar,
      ua_browser,
      usedUserAgent,
      proxy,
      site,
      post_url
    );
  } catch (e) {
    if (e) {
      if (e.message == "Cannot read property 'toString' of undefined") {
        console_log(`[GET] ABCK cookie error`, "error");
      } else if (e.message == "Error: ESOCKETTIMEDOUT") {
        console_log(`[GET] Proxy Banned`, "error");
      } else {
        console_log(`[GET] ${e.message}`, "error");
      }
    }
  }
}

async function generateSensorData(
  cookie,
  cookieJar,
  ua_browser,
  usedUserAgent,
  proxy,
  site,
  postURL
) {
  let bmak = {
    ver: 1.66,
    loc: "",
    sensor_data: 0,
    xagg: -1,
    pen: -1,
    brow: "",
    psub: "-",
    lang: "-",
    prod: "-",
    wen: 0,
    den: 0,
    plen: -1,
    z1: 0,
    start_ts: get_cf_date(true) - lodash.random(200000, 250000),
    doact: 0,
    dmact: 0,
    me_cnt: 0,
    me_vel: 0,
    ta: 0,
    n_ck: "0",
    doe_cnt: 0,
    doe_cnt_lmt: 10,
    doa_throttle: 0,
    brv: 0,
    informinfo: "",
    kact: "",
    doe_vel: 0,
    ke_vel: 0,
    te_vel: 0,
    pe_vel: 0,
    dme_vel: 0,
    init_time: 0,
    d2: 0,
    ke_cnt: 0,
    pe_cnt: lodash.random(2, 10),
    te_cnt: 0,
    api_public_key: "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq",
    cs: "0a46G5m17Vrp4o4c",
    aj_indx: 0,
    aj_type: -1, // event type depend on certain event
    mr: "-1",
    o9: 0,
    fmh: "", // probably different from every browser && screen size,
    fmz: "", // device pixel aka zoom in and out || DIFFERENT FROM EVEERY BROWSER && screen size
    ssh: "", // could be hard coded || different from every browser && screen size,
  };

  let fpValstr = data(ua_browser).replace(/"/g, '"') + ";-1";
  let p = ab(fpValstr);
  let yy = type === 0 ? -1 : Math.floor(1e3 * Math.random()).toString();
  let zz = canvasArray[yy].toString();

  // # get doact
  var doact = cdoa(bmak);
  // # get dmact
  var dmact = cdma(bmak);
  // # execute certain function first
  to(bmak);

  // # our sensor data
  let sensor_data =
    bmak.ver +
    "-1,2,-94,-100," +
    gd(ua_browser, usedUserAgent, bmak) +
    "-1,2,-94,-101," +
    "do_en,dm_en,t_en" +
    "-1,2,-94,-105," +
    // getinform static value
    site.informinfo +
    "-1,2,-94,-102," +
    // getinform static value
    site.informinfo +
    "-1,2,-94,-108," +
    // bmak.kact is 0 || is empty
    "-1,2,-94,-110," +
    // bmak.mact == mouse mouvement gonna use browser to generate
    genMouseData(bmak) +
    "-1,2,-94,-117," +
    // bmak.tact is empty
    "-1,2,-94,-111," +
    doact +
    "-1,2,-94,-109," +
    dmact +
    "-1,2,-94,-114," +
    // bmak.pact is empty
    "-1,2,-94,-103," +
    // bmak.vcact is empty
    "-1,2,-94,-112," +
    site.url +
    "-1,2,-94,-115," +
    [
      1, // 1
      bmak.me_vel + 32, // 2
      32, // te_val // 3
      bmak.doe_vel, // 4
      bmak.dme_vel, // 5
      0, // pe_vel // 6
      bmak.ke_vel + // 7
        bmak.me_vel +
        bmak.doe_vel +
        bmak.dme_vel +
        bmak.te_vel +
        bmak.pe_vel,
      updatet(bmak), // 8
      bmak.init_time, // 9
      bmak.start_ts, // 10
      updatetd(), // 11
      pi(bmak.z1 / 23), // bmak.d2 // 12
      bmak.ke_cnt, // 13
      bmak.me_cnt, // 14
      pi(pi(bmak.z1 / 23) / 6), // 15 // f var
      bmak.pe_cnt, // 16
      bmak.te_cnt, // 17
      get_cf_date(true) - bmak.start_ts, // 18
      bmak.ta, // 19 bmak.ta
      bmak.n_ck, // 20
      cookie, // 21 // get cookie which is our abck cookie
      ab(cookie), // 22
      yy, // 23 fpcf.rVal == the index of our canvas position
      zz, // 24 rpcf.rCFP our actual canvas
      30261693, // 25 bmak.fas()
      ff(80) + ff(105) + ff(90) + ff(116) + ff(69), // 26 == PiZte
      jrs(bmak.start_ts)[0], // 27
      jrs(bmak.start_ts)[1], // 28
    ].join(",") +
    "-1,2,-94,-106," +
    bmak.aj_type + // aj_type is the  type of event for example; 6 is something to do with mouse
    "," +
    bmak.aj_indx;

  // # second sensor data
  sensor_data =
    sensor_data +
    "-1,2,-94,-119," +
    getmr() +
    "-1,2,-94,-122," +
    sed() +
    "-1,2,-94,-123," +
    "" + // for challenge cookie i think
    "-1,2,-94,-124," +
    "" + // also for challenge cookie
    "-1,2,-94,-126," +
    "" + // also for challenge cookie
    "-1,2,-94,-127," +
    "11321144241322243122"; // bmak.nav_perm;

  // # encode our current sensor data
  var L = 24 ^ ab(sensor_data);
  // # third sensor data string
  sensor_data =
    sensor_data +
    "-1,2,-94,-70," +
    fpValstr +
    "-1,2,-94,-80," +
    p +
    "-1,2,-94,-116," +
    bmak.o9 +
    "-1,2,-94,-118," +
    L +
    "-1,2,-94,-129,";
}

generateSensorData();

/**
 *
 * @param {*} usedUserAgent
 * @description get browser
 */
function getUaBrowser(usedUserAgent) {
  if (usedUserAgent.indexOf("Chrome") > -1) {
    return "chrome";
  } else if (usedUserAgent.indexOf("Safari") > -1) {
    return "safari";
  } else if (usedUserAgent.indexOf("Firefox") > -1) {
    return "firefox";
  } else {
    return ie;
  }
}

function jrs(a) {
  for (
    var t = Math.floor(1e5 * Math.random() + 1e4),
      e = String(a * t),
      n = 0,
      o = [],
      m = e.length >= 18;
    o.length < 6;

  )
    o.push(parseInt(e.slice(n, n + 2))), (n = m ? n + 3 : n + 2);
  return [t, bmak.cal_dis(o)];
}

function cal_dis(a) {
  var t = a[0] - a[1],
    e = a[2] - a[3],
    n = a[4] - a[5],
    o = Math.sqrt(t * t + e * e + n * n);
  return Math.floor(o);
}

function sed() {
  return [0, 0, 0, 0, 1, 0, 0].join(",");
}

/**
 * @returns {string} MR Value
 */
function getmr() {
  var x = lodash.random(10000, 20000);
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
        for (var b = performance.now() + x, d = 0; d < 4e3; d++) e[n](3.14);
        var k = performance.now() + x;
        o.push(Math.round(1e3 * (k - b))), (m = k - r);
      }
      var l = o.sort();
      c = Math.round(l[Math.floor(l.length / 2)] / 5);
    }
    a = a + c + ",";
  }
  return a != null ? a : getmr();
}

/**
 * @description uses fingerprint of user browser screen
 */
function gd(ua_browser, usedUserAgent, bmak) {
  const screen_size = screenSize();
  var a = usedUserAgent,
    t = "" + ab(a),
    e = bmak.start_ts / 2,
    n = screen_size[0],
    o = screen_size[1],
    m = screen_size[2],
    r = screen_size[3],
    i = screen_size[4],
    c = screen_size[5],
    b = screen_size[6];
  bmak.z1 = parseInt(bmak.start_ts / (2016 * 2016));
  var d = Math.random(),
    k = parseInt((1e3 * d) / 2),
    s = d + "";
  return (
    (s = s.slice(0, 11) + k),
    get_browser(ua_browser, bmak),
    bc(ua_browser, bmak),
    bmisc(bmak),
    a +
      ",uaend," +
      bmak.xagg +
      "," +
      bmak.psub +
      "," +
      bmak.lang +
      "," +
      bmak.prod +
      "," +
      bmak.plen +
      "," +
      bmak.pen +
      "," +
      bmak.wen +
      "," +
      bmak.den +
      "," +
      bmak.z1 +
      "," +
      bmak.d3 +
      "," +
      n +
      "," +
      o +
      "," +
      m +
      "," +
      r +
      "," +
      i +
      "," +
      c +
      "," +
      b +
      "," +
      bd(ua_browser) +
      "," +
      t +
      "," +
      s +
      "," +
      e +
      "," +
      bmak.brv +
      ",loc:" +
      bmak.loc
  );
}

/**
 * @description list of screen size of browser
 */
function screenSize() {
  var x = lodash.sample([
    ["1098", "686", "1098", "686", "1098", "583", "1098"],
    ["1280", "680", "1280", "720", "1280", "578", "1280"],
    ["1440", "776", "1440", "900", "1440", "660", "1440"],
    ["1440", "826", "1440", "900", "1440", "746", "1440"],
    ["1440", "860", "1440", "900", "1440", "757", "1440"],
    ["1440", "831", "1440", "900", "1440", "763", "1440"],
    ["1440", "851", "1440", "900", "1420", "770", "1420"],
    ["1440", "786", "1440", "900", "1440", "789", "1440"],
    ["1440", "900", "1440", "900", "1440", "821", "1440"],
    ["1536", "824", "1536", "864", "1536", "722", "1536"],
    ["1680", "972", "1680", "1050", "1680", "939", "1680"],
    ["1680", "1020", "1680", "1050", "1680", "917", "1680"],
    ["1920", "1040", "1920", "1080", "1920", "937", "1920"],
    ["1920", "1040", "1920", "1080", "1920", "969", "1920"],
    ["1920", "1080", "1920", "1080", "1920", "1007", "1920"],
    ["2560", "1400", "2560", "1440", "2560", "1327", "2576"],
    ["1024", "1024", "1024", "1024", "1024", "1024", "1024"],
    ["1680", "973", "1680", "1050", "1133", "862", "1680"],
    ["1680", "973", "1680", "1050", "1680", "862", "1680"],
    ["1024", "768", "1024", "768", "1256", "605", "1272"],
  ]);
  return x;
}

/**
 * @param {boolean} start
 * @returns
 */
function get_cf_date(start) {
  if (Date.now) {
    return start ? new Date(Date.now()).getTime() : Date.now();
  } else {
    return start ? new Date(+new Date()).getTime() : +new Date();
  }
}

// # some type of absolute bit function
function ab(a) {
  if (null == a) return -1;
  try {
    for (var t = 0, e = 0; e < a.length; e++) {
      var n = a.charCodeAt(e);
      n < 128 && (t += n);
    }
    return t;
  } catch (a) {
    return -2;
  }
}

// # get browser navigator
function get_browser(ua_browser, bmak) {
  (bmak.psub = productSub(ua_browser)),
    (bmak.lang = "en-US"),
    (bmak.prod = "Gecko"),
    (bmak.plen = pluginsLength(ua_browser));
}

// # get plugin length of browser
function pluginsLength(browser) {
  switch (browser) {
    case "chrome":
      return 3;
    case "ie":
      return 1;
    case "opera":
      return 1;
    case "firefox":
      return 0;
    case "safari":
      return 1;
  }
}

// # get product sub of browser
function productSub(browser) {
  switch (browser) {
    case "chrome":
      return 20030107;
    case "ie":
      return 20030107;
    case "opera":
      return 20030107;
    case "firefox":
      return 20100101;
    case "safari":
      return 20030107;
  }
}

// # get our browser plugins like if its chrome etc etc
function bd(browser) {
  switch (browser) {
    case "chrome":
      return [
        ",cpen:0",
        "i1:0",
        "dm:0",
        "cwen:0",
        "non:1",
        "opc:0",
        "fc:0",
        "sc:0",
        "wrc:1",
        "isc:0",
        "vib:1",
        "bat:1",
        "x11:0",
        "x12:1",
      ].join(",");
    case "ie":
      return [
        ",cpen:0",
        "i1:1",
        "dm:1",
        "cwen:0",
        "non:1",
        "opc:0",
        "fc:0",
        "sc:0",
        "wrc:0",
        "isc:0",
        "vib:0",
        "bat:0",
        "x11:0",
        "x12:1",
      ].join(",");
    case "opera":
      return [
        ",cpen:0",
        "i1:0",
        "dm:0",
        "cwen:0",
        "non:1",
        "opc:1",
        "fc:0",
        "sc:0",
        "wrc:1",
        "isc:0",
        "vib:0",
        "bat:1",
        "x11:0",
        "x12:1",
      ].join(",");
    case "firefox":
      return [
        ",cpen:0",
        "i1:0",
        "dm:0",
        "cwen:0",
        "non:1",
        "opc:0",
        "fc:1",
        "sc:0",
        "wrc:1",
        "isc:1",
        "vib:1",
        "bat:0",
        "x11:0",
        "x12:1",
      ].join(",");
    case "safari":
      return [
        ",cpen:0",
        "i1:0",
        "dm:0",
        "cwen:0",
        "non:1",
        "opc:0",
        "fc:0",
        "sc:0",
        "wrc:1",
        "isc:0",
        "vib:0",
        "bat:0",
        "x11:0",
        "x12:1",
      ].join(",");
  }
}

function bmisc(bmak) {
  (bmak.pen = 0), (bmak.wen = 0), (bmak.den = 0);
}

/**
 * @returns - bmak.doact
 */
function cdoa(bmak) {
  try {
    var t = get_cf_date() - bmak.start_ts;
    var e = -1;
    var n = -1;
    var o = -1;
    var m = bmak.doe_cnt + "," + t + "," + e + "," + n + "," + o;
    bmak.doact = m + ";";
    bmak.doe_vel = bmak.doe_vel + bmak.doe_cnt + t;
    bmak.ta += t;
    return bmak.doact;
  } catch (a) {}
}

/**
 * @returns - bmak.dmact
 */
function cdma(bmak) {
  try {
    var t = get_cf_date() - bmak.start_ts + lodash.random(50, 300);
    var k = "0," + t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    bmak.dmact = bmak.dmact + k + ";";
    bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    bmak.ta += t;
    return bmak.dmact;
  } catch (a) {}
}

function cma(bmak) {
  bmak.me_vel = bmak.me_vel + bmak.me_cnt + t + i + n + o;
}

function bc(ua_browser, bmak) {
  var a = 1,
    t = 1,
    e = 0,
    n = 0,
    o = 1,
    m = 1,
    r = touchEvent(ua_browser),
    i = 0,
    c = 1,
    b = 1,
    d = chrome(ua_browser),
    k = 1,
    l = 0,
    s = 1;
  bmak.xagg =
    a +
    (t << 1) +
    (e << 2) +
    (n << 3) +
    (o << 4) +
    (m << 5) +
    (r << 6) +
    (i << 7) +
    (s << 8) +
    (l << 9) +
    (c << 10) +
    (b << 11) +
    (d << 12) +
    (k << 13);
}

function to(bmak) {
  var a = get_cf_date() % 1e7;
  bmak.d3 = a;
  for (var t = a, e = pi(ff(51)), n = 0; n < 5; n++) {
    var o = pi(a / Math.pow(10, n)) % 10,
      m = o + 1;
    (op = cc(o)), (t = op(t, m));
  }
  bmak.o9 = t * e;
}

function ff(a) {
  return String.fromCharCode(a);
}

function pi(a) {
  return parseInt(a);
}

function cc(a) {
  var t = a % 4;
  2 == t && (t = 3);
  var e = 42 + t,
    n = function (a, t) {
      return 0;
    };
  if (42 == e)
    var n = function (a, t) {
      return a * t;
    };
  else if (43 == e)
    var n = function (a, t) {
      return a + t;
    };
  else
    var n = function (a, t) {
      return a - t;
    };
  return n;
}

function touchEvent(browser) {
  switch (browser) {
    case "chrome":
      return 1;
    case "ie":
      return 0;
    case "opera":
      return 1;
    case "firefox":
      return 1;
    case "safari":
      return 0;
  }
}

function chrome(browser) {
  switch (browser) {
    case "chrome":
      return 1;
    default:
      return 0;
  }
}

function updatet(bmak) {
  return get_cf_date() - bmak.start_ts;
}

/**
 * @description for fpcf.td
 */
function updatetd() {
  var td = 0;

  try {
    var a = 0;
    a = Date.now ? Date.now() - lodash.random(2, 12) : +new Date() - 20;
    var n = 0;
    n = Date.now ? Date.now() : +new Date();
    td = n - a;
  } catch (a) {}

  return td;
}

function gen_key(sensor_data, type) {
  var hh = type === 0 ? -1 : lodash.random(4, 50);
  var a = get_cf_date();
  var y = od(
    "0a46G5m17Vrp4o4c",
    "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq"
  ).slice(0, 16);
  var w = Math.floor(get_cf_date() / 36e5);
  var j = get_cf_date();
  var E = y + od(w, y) + sensor_data;
  sensor_data =
    E + ";" + lodash.random(0, 5) + ";" + hh + ";" + (get_cf_date() - j);
  console.log(sensor_data + "\n");
  return sensor_data;
}

/**
 *
 * @param {*} ua_browser
 * @param {*} ver
 * @description get our canvas string
 */
function data(ua_browser) {
  return [
    canvas(),
    canvas_2(),
    "dis",
    pluginInfo(ua_browser),
    true,
    true,
    true,
    new Date().getTimezoneOffset(),
    webrtcKey(ua_browser),
    24,
    24,
    true,
    false,
  ]
    .filter((x) => x !== null)
    .join(";");
}

/**
 * @description get random canvas
 */
function canvas() {
  return lodash.sample(JSON.parse(canvas.canvas));
}

function canvas_2() {
  return lodash.sample([66351601, 1396487819]).toString();
}

/**
 *
 * @param {*} browser
 *
 */
function webrtcKey(browser) {
  switch (browser) {
    case "chrome":
      return true;
    case "ie":
      return false;
    case "opera":
      return true;
    case "firefox":
      return true;
    case "safari":
      return true;
  }
}

/**
 *
 * @param {*} browser
 * @description get plugin info
 */
function pluginInfo(browser) {
  switch (browser) {
    case "chrome":
      return [",7,8"];
    case "ie":
      return [""];
    case "opera":
      return [""];
    case "firefox":
      return [",3"];
    case "safari":
      return [""];
  }
}

/**
 * @param {*} t
 * @param {*} p0
 * @param {*} p1
 * @param {*} p2
 * @param {*} p3
 * @returns {string} Random Mouse Movement
 */
function bezier(t, p0, p1, p2, p3) {
  var cX = 3 * (p1.x - p0.x),
    bX = 3 * (p2.x - p1.x) - cX,
    aX = p3.x - p0.x - cX - bX;

  var cY = 3 * (p1.y - p0.y),
    bY = 3 * (p2.y - p1.y) - cY,
    aY = p3.y - p0.y - cY - bY;

  var x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
  var y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;

  return {
    x: x,
    y: y,
  };
}

/**
 * @returns Random Mouse Data
 */
function genMouseData(bmak) {
  var timeStamp =
    Math.round(get_cf_date() - (new Date() - 20)) + lodash.random(2000, 10000);
  var mouseString = "";
  (p0 = {
    x: 10,
    y: 10,
  }), //use whatever points you want obviously
    (p1 = {
      x: lodash.random(80, 100),
      y: lodash.random(90, 120),
    }),
    (p2 = {
      x: lodash.random(30, 69),
      y: lodash.random(75, 200),
    }),
    (p3 = {
      x: lodash.random(500, 750),
      y: lodash.random(20, 100),
    });
  var loop_amount = lodash.random(90, 99);
  for (var i = 0; i <= loop_amount; i++) {
    var p = bezier(i / 100, p0, p1, p2, p3);
    timeStamp = timeStamp + lodash.random(0, 2);
    if (i == loop_amount) {
      bmak.me_cnt = lodash.random(200, 1400);
      mouseString =
        mouseString +
        bmak.me_cnt +
        ",3," +
        timeStamp +
        "," +
        Math.round(p.x) +
        "," +
        Math.round(p.y) +
        ",-1;";
    } else {
      bmak.me_vel += i + 1 + timeStamp + Math.round(p.x) + Math.round(p.y);
      bmak.ta += timeStamp;
      mouseString =
        mouseString +
        i +
        ",1," +
        timeStamp +
        "," +
        Math.round(p.x) +
        "," +
        Math.round(p.y) +
        ";";
    }
    mouseString = mouseString;
  }

  return mouseString;
}
