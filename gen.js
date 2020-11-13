const fs = require("fs");
const lodash = require("lodash");
const request = require("request-promise");
const { promisify } = require("util");
const got = require("got");
const { CookieJar } = require("tough-cookie");
const tunnel = require("tunnel");
const UserAgent = require("user-agents");

const genBrowserData = require("./genBrowserData");
const siteOptions = require("./stores.json");
const canvasArray = require("./canvas.json");
const mrArray = require("./mrstring.json");
const events = require("./events");

const userAgent = new UserAgent(/Chrome/, {
  deviceCategory: "desktop",
});

/**
 *
 * @param {*} site
 * @param {*} proxy
 */
async function getScript(selectedSite, usedUserAgent, cookieJar, proxy) {
  // # make request
  const resp = await got(selectedSite.url, {
    method: "GET",
    http2: true,
    headers: {
      ...selectedSite.headers,
      "user-agent": usedUserAgent,
    },
    agent: !proxy
      ? null
      : {
          https: tunnel.httpsOverHttp({
            proxy: {
              host: "proxy.packetstream.io",
              port: "31112",
              proxyAuth: "ericz123:eb08eB4QEp2lprWE_country-UnitedStates",
            },
          }),
        },
    cookieJar,
  });

  let p = /src="\/(static|assets|api|resources|public)\/(\w+)/gm.exec(
    resp.body
  );

  let cookie = resp.headers["set-cookie"]
    .toString()
    .split("_abck=")[1]
    .split("; Domain")[0];

  let bm_sz = resp.headers["set-cookie"]
    .toString()
    .split("bm_sz=")[1]
    .split("; Domain")[0];

  return {
    post_url: `${p[1]}/${p[2]}`,
    cookie,
    bm_sz,
  };
}

/**
 *
 * @param {*} site
 * @param {*} proxy
 * @description start our sensor gen
 */
async function startSensorGen(site, proxy) {
  try {
    const browserData = genBrowserData();
    const cookieJar = new CookieJar();
    const usedUserAgent = browserData.userAgent.toString().replace(/\|"/g, "");
    const ua_browser = getUaBrowser(usedUserAgent);
    const selectedSite = siteOptions.find((s) => s[site] && s)[site];

    // // # grab cookie from browser - temp solution
    // const { body } = await got(
    //   `http://localhost:5000?site=${selectedSite.url}`,
    //   {
    //     method: "GET",
    //     responseType: "json",
    //   }
    // );

    // # get script
    const { post_url, cookie, bm_sz } = await getScript(
      selectedSite,
      usedUserAgent,
      cookieJar,
      proxy
    );

    // # generate sensor data
    return generateSensorData(
      site,
      browserData,
      cookie,
      bm_sz,
      cookieJar,
      ua_browser,
      usedUserAgent,
      proxy,
      selectedSite,
      post_url
    );
  } catch (e) {
    if (e) {
      if (e.message == "Cannot read property 'toString' of undefined") {
        console.log("\x1b[31m", "[GET] ABCK cookie error");
      } else if (e.message == "Error: ESOCKETTIMEDOUT") {
        console.log("\x1b[31m", "[GET] Proxy Banned");
      } else {
        console.log("\x1b[31m", `[GET] ${e.message}`);
      }
    }
  }
}

async function generateSensorData(
  site,
  browserData,
  cookie,
  bm_sz,
  cookieJar,
  ua_browser,
  usedUserAgent,
  proxy,
  selectedSite,
  post_url
) {
  let startTS = 0;
  startTS = get_cf_date(true) - lodash.random(600, 900);

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
    start_ts: startTS,
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
    dme_cnt: 0,
    init_time: 0,
    d2: 0,
    ke_cnt: 0,
    pe_cnt: 0,
    te_cnt: 0,
    api_public_key: "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq",
    cs: "0a46G5m17Vrp4o4c",
    aj_indx: 1, // same thing
    aj_type: 9, // event type depend on certain event
    mr: "-1",
    o9: 0,
    fmh: browserData.fmh, // probably different from every browser && screen size,
    fmz: browserData.fmz, // device pixel aka zoom in and out || DIFFERENT FROM EVEERY BROWSER && screen size
    ssh: browserData.ssh, // could be hard coded || different from every browser && screen size,
    wv: "",
    wr: "",
    weh: "",
    wl: 0,
    tst: -1,
    t_tst: startTS,
    vc_cnt_lmt: 100,
    vc_cnt: 0,
    vcact: "",
  };

  let rand = lodash.random(500, 700);
  let fpValstr = data(ua_browser, browserData).replace(/"/g, '"') + ";-1";
  let p = ab(fpValstr);
  let yy = Math.floor(1e3 * Math.random()).toString();
  let zz = canvasArray.canvas[yy].toString();
  let mrRand = mrArray.mr[Math.floor(4000 * Math.random())].toString();

  bmak.tst = get_cf_date() - (get_cf_date() - lodash.random(3, 9));

  // # get doact
  var doact = events[site].cdoa(bmak, updatet(bmak), rand);
  // # get dmact
  var dmact = events[site].cdma(bmak, updatet(bmak), rand);
  // # get vcact only for certain site
  // events[site].lvc(bmak, updatet(bmak));
  // # get the jrs(start_ts)
  const ss = jrs(bmak.start_ts);
  // # execute certain function first
  to(bmak);

  // # our sensor data
  let sensor_data =
    bmak.ver +
    "-1,2,-94,-100," +
    gd(ua_browser, usedUserAgent, bmak, browserData) +
    "-1,2,-94,-101," +
    "do_en,dm_en,t_en" +
    "-1,2,-94,-105," +
    // getinform static value
    selectedSite.informinfo +
    "-1,2,-94,-102," +
    // getinform static value
    selectedSite.informinfo +
    "-1,2,-94,-108," +
    // bmak.kact is 0 || is empty
    "-1,2,-94,-110," +
    // bmak.mact == mouse mouvement gonna use browser to generate
    // genMouseData(bmak) +
    "-1,2,-94,-117," +
    // bmak.tact is empty
    "-1,2,-94,-111," +
    doact +
    "-1,2,-94,-109," +
    dmact +
    "-1,2,-94,-114," +
    // bmak.pact is empty
    "-1,2,-94,-103," +
    bmak.vcact +
    "-1,2,-94,-112," +
    selectedSite.url +
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
      zz, // 24 rpcf.rCFP our actual canvas || get random canvas
      browserData.fas, // 25 bmak.fas()
      ff(80) + ff(105) + ff(90) + ff(116) + ff(69), // 26 == PiZte
      ss[0], // 27
      ss[1], // 28
    ].join(",") +
    "-1,2,-94,-106," +
    bmak.aj_type + // aj_type is the  type of event for example; 6 is something to do with mouse
    "," +
    bmak.aj_indx;

  // # second sensor data
  sensor_data =
    sensor_data +
    "-1,2,-94,-119," +
    mrRand +
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
    "-1,2,-94,-129," +
    (bmak.fmh +
      "," +
      bmak.fmz +
      "," +
      bmak.ssh +
      "," +
      bmak.wv +
      "," +
      bmak.wr +
      "," +
      bmak.weh +
      "," +
      bmak.wl) +
    "-1,2,-94,-121,"; // last part could be static idk

  // # gen cookie
  return genCookie(
    gen_key(sensor_data, bmak),
    cookie,
    bm_sz,
    cookieJar,
    usedUserAgent,
    proxy,
    selectedSite,
    post_url
  );
}

function genCookie(
  sensor_data,
  abck,
  bm_sz,
  cookieJar,
  usedUserAgent,
  proxy,
  selectedSite,
  post_url
) {
  let params = {
    method: "POST",
    http2: true,
    headers: {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
      // cookie: `_abck=${abck};`,
      origin: "https://www.finishline.com",
      referer: "https://www.finishline.com/",
      "sec-fetch-site": "same-origin",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "user-agent": usedUserAgent,
    },
    body: JSON.stringify({
      sensor_data:
        "7a74G7m23Vrp0o5c9100031.66-1,2,-94,-100,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36,uaend,12147,20030107,en-US,Gecko,3,0,0,0,394964,5687752,4034,1152,4096,1152,2016,1040,2031,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:1,x11:0,x12:1,8316,0.760838550380,802617843553.5,0,loc:-1,2,-94,-101,do_en,dm_en,t_en-1,2,-94,-105,0,0,0,0,-1,113,0;0,-1,0,1,2352,3433,0;0,-1,0,1,2358,3317,0;0,-1,0,1,2353,2984,0;1,0,0,1,2716,3002,0;0,-1,0,1,2371,3002,0;0,-1,0,1,2891,2984,0;0,-1,0,0,1805,4204,0;0,-1,0,0,1009,3946,0;1,0,0,1,3256,3002,0;0,-1,0,0,2893,-1,0;0,-1,0,1,2911,3002,0;0,-1,0,1,2892,3433,0;0,-1,0,1,2898,3317,0;0,-1,0,0,-1,2424,0;-1,2,-94,-102,0,0,0,0,-1,113,0;0,-1,0,1,2352,3433,0;0,-1,0,1,2358,3317,0;0,-1,0,1,2353,2984,0;1,0,0,1,2716,3002,0;0,-1,0,1,2371,3002,0;0,-1,0,1,2891,2984,0;0,-1,0,0,1805,4204,0;0,-1,0,0,1009,3946,0;1,0,0,1,3256,3002,0;0,-1,0,0,2893,-1,0;0,-1,0,1,2911,3002,0;0,-1,0,1,2892,3433,0;0,-1,0,1,2898,3317,0;0,-1,0,0,-1,2424,0;-1,2,-94,-108,-1,2,-94,-110,-1,2,-94,-117,-1,2,-94,-111,0,605,-1,-1,-1;-1,2,-94,-109,0,605,-1,-1,-1,-1,-1,-1,-1,-1,-1;-1,2,-94,-114,-1,2,-94,-103,-1,2,-94,-112,https://www.gamestop.com/-1,2,-94,-115,1,32,32,605,605,0,1210,900,0,1605235687107,38,17172,0,0,2862,0,0,900,1210,0,59A5199012708B5E36ABD9A21CA0AE15~-1~YAAQvickF9kH8Jt1AQAAwcKAvwRCB/eNtNzwBORvjVcCr0axiPmoaBr94eNryTkJHu4rozHkOMmCiDoBY2QyIrmXQLj9G6X4+haH1JKA9sLaCQB8JBm+1JJoAvIfoMpNjxtZc73dxs45YSm8UZbbJQIESJrK7dwl8VOztQV+ofjKoHkIra32CBnb4KwhSxJzDNJ3OZo6/SgsMop512DTQTvy9aLYyRC9wO+OA8UaJy38yluuh+tAywM5xNpd/rpH8JtLV5claC9BC6b/KSM3CG7HHhEa/mKfBKKWqZv49c7X5rvPgpp9io+c2j8=~-1~-1~-1,29638,652,-24736851,30261693,PiZtE,57305,104-1,2,-94,-106,9,1-1,2,-94,-119,8,10,11,10,21,20,14,9,8,6,6,6,11,357,-1,2,-94,-122,0,0,0,0,1,0,0-1,2,-94,-123,-1,2,-94,-124,-1,2,-94,-126,-1,2,-94,-127,11321144241322243122-1,2,-94,-70,-739578230;-1395479418;dis;,7,8;true;true;true;300;true;24;24;true;false;-1-1,2,-94,-80,5591-1,2,-94,-116,153568953-1,2,-94,-118,110771-1,2,-94,-129,b52911bd04667ddee3bef537d2dfa06c282ce7a6d401bd534e7d5f8f53318b7d,1.25,a712c19fde04cde08d21754c81e951066896404f0eac6cbfd5255e434d879986,,,,0-1,2,-94,-121,;31;9;0",
    }),
    responseType: "json",
    decompress: true,
    agent: !proxy
      ? null
      : {
          https: tunnel.httpsOverHttp({
            proxy: {
              host: "proxy.packetstream.io",
              port: "31112",
              proxyAuth: "ericz123:eb08eB4QEp2lprWE_country-UnitedStates",
            },
          }),
        },
    timeout: 10000,
    cookieJar,
  };

  // # make request
  return got(`${selectedSite.url}${post_url}`, params)
    .then((resp) => {
      const cookie = resp.headers["set-cookie"]
        .toString()
        .split("_abck=")[1]
        .split("; Domain")[0];

      console.log(cookie);

      return cookie;
    })
    .catch((err) => {
      if (err.message == "ERROR: ESOCKETTIMEDOUT") {
        console.log("\x1b[31m", "[POST] Proxy Banned");
      } else {
        console.log("\x1b[31m", `[POST] ${err.message}`);
      }
    });
}

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
  return [t, cal_dis(o)];
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

/**
 * @description uses fingerprint of user browser screen
 */
function gd(ua_browser, usedUserAgent, bmak, browserData) {
  var a = usedUserAgent,
    t = "" + ab(a),
    e = bmak.start_ts / 2,
    n = browserData.screenSize.availWidth, // avil width
    o = browserData.screenSize.availHeight, // availHeight
    m = browserData.screenSize.width, // width
    r = browserData.screenSize.height, // height
    i = browserData.screenSize.clientWidth, // clientWidth
    c = browserData.screenSize.clientHeight, // clientHeight
    b = browserData.screenSize.outerWidth; // outerWidth
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
    var t = get_cf_date() - bmak.start_ts;
    var k = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    bmak.dmact = bmak.dmact + "," + k + ";";
    bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    bmak.ta += t;
    return bmak.dmact;
  } catch (a) {}
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
    a = Date.now ? Date.now() - lodash.random(30, 40) : +new Date() - 10;
    var n = 0;
    n = Date.now ? Date.now() : +new Date();
    td = n - a;
  } catch (a) {}

  return td;
}

function gen_key(sensor_data, bmak) {
  var a = get_cf_date();
  var y = od(
    "0a46G5m17Vrp4o4c",
    "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq"
  ).slice(0, 16);
  var w = Math.floor(get_cf_date() / 36e5);
  var j = get_cf_date();
  var E = y + od(w, y) + sensor_data;

  console.log(y);

  sensor_data =
    E +
    ";" +
    lodash.random(10, 40) +
    ";" +
    bmak.tst +
    ";" +
    (get_cf_date() - j);
  console.log(sensor_data);
  return sensor_data;
}

/**
 *
 * @param {*} a
 * @param {*} t
 * @description some encryption
 */
function od(a, t) {
  try {
    (a = String(a)), (t = String(t));
    var e = [],
      n = t.length;
    if (n > 0) {
      for (var o = 0; o < a.length; o++) {
        var m = a.charCodeAt(o),
          r = a.charAt(o),
          i = t.charCodeAt(o % n);
        (m = rir(m, 47, 57, i)),
          m != a.charCodeAt(o) && (r = String.fromCharCode(m)),
          e.push(r);
      }
      if (e.length > 0) return e.join("");
    }
  } catch (a) {}
  return a;
}

function rir(a, t, e, n) {
  return a > t && a <= e && (a += n % (e - t)) > e && (a = a - e + t), a;
}

/**
 *
 * @param {*} ua_browser
 * @param {*} browserData
 * @description get our canvas string
 */
function data(ua_browser, browserData) {
  return [
    browserData.canvas.firstCanvasValue, // first canvas value
    browserData.canvas.secondCanvasValue, // second canvas value
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
    false, // javaEnabled
  ]
    .filter((x) => x !== null)
    .join(";");
}

/**
 * @description get random canvas
 */
function canvas() {
  return lodash.sample(canvasArray.canvas);
}

// function canvas_2() {
//   return lodash.sample([66351601, 1396487819]).toString();
// }

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
  var timeStamp = updatet(bmak);
  var mouseString = "";
  (p0 = {
    x: 10,
    y: 25,
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
      x: lodash.random(500, 850),
      y: lodash.random(20, 150),
    });

  var loop_amount = -1; // set back to whatever lodash.random(60, 99) later

  timeStamp -= lodash.random(300, 350);
  //# for the first string it0
  mouseString += bmak.me_cnt + ",2," + timeStamp + ",-1,-1,-1,it0;";
  bmak.me_cnt += 1;
  bmak.me_vel += bmak.me_cnt + 1 + timeStamp - 2;

  for (var i = 1; i <= loop_amount; i++) {
    var p = bezier(i / 100, p0, p1, p2, p3);
    timeStamp = timeStamp + lodash.random(10, 20);
    bmak.me_cnt += 1;
    if (i == loop_amount) {
      mouseString =
        mouseString +
        bmak.me_cnt +
        ",3," +
        timeStamp +
        "," +
        Math.round(p.x) +
        "," +
        Math.round(p.y) +
        "-1;";
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

startSensorGen("gamestop", false);

// module.exports = startSensorGen;
