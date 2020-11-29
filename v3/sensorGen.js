const fs = require("fs");
const lodash = require("lodash");
const got = require("got");
const UserAgent = require("user-agents");
const { v4 } = require("uuid");

const device = require("../device.json");
const genBrowserData = require("../genBrowserData");
const siteOptions = require("../stores.json");
const canvasArray = require("../canvas.json");
const mrArray = require("../mrstring.json");
const events = require("../events");

// # start ts
let start_ts = Date.now ? Date.now() : +new Date();
// # get random browser data
const randDevice = Math.floor(Math.random() * device.length);

// # static bmak
let bmak = {
  browserData: genBrowserData(randDevice),
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
  // should start couple of second delays
  start_ts: start_ts,
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
  d3: 0,
  ke_cnt: 0,
  pe_cnt: 0,
  te_cnt: 0,
  api_public_key: "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq",
  cs: "0a46G5m17Vrp4o4c",
  aj_indx: 1, // same thing
  aj_type: 9, // event type depend on certain event
  mr: "-1",
  o9: 0,
  fmh: "", // probably different from every browser && screen size,
  fmz: "", // device pixel aka zoom in and out || DIFFERENT FROM EVEERY BROWSER && screen size
  ssh: "", // could be hard coded || different from every browser && screen size,
  wv: "",
  wr: "",
  weh: "",
  wl: 0,
  tst: -1,
  t_tst: start_ts,
  vc_cnt_lmt: 100,
  vc_cnt: 0,
  vcact: "",
  nav_perm: "11321144241322243122",
  updatet: 0,
  /**
   *
   * @param {*} sensor_data
   * @description gen first key of the sensor data string
   * @returns full sensor data
   */
  gen_key(sensor_data) {
    var a = this.get_cf_date();
    var y = this.od(
      "0a46G5m17Vrp4o4c",
      "afSbep8yjnZUjq3aL010jO15Sawj2VZfdYK8uY90uxq"
    ).slice(0, 16);
    var w = Math.floor(this.get_cf_date() / 36e5);
    var j = this.get_cf_date();
    var E = y + this.od(w, y) + sensor_data;
    sensor_data =
      E +
      ";" +
      lodash.random(30, 40) +
      ";" +
      this.tst +
      ";" +
      (this.get_cf_date() - j);
    console.log(sensor_data);
    return sensor_data;
  },
  // # beginning tracking
  to() {
    var a = this.get_cf_date() % 1e7;
    this.d3 = a;
    for (var t = a, e = this.pi(this.ff(51)), n = 0; n < 5; n++) {
      var o = this.pi(a / Math.pow(10, n)) % 10;
      var m = o + 1;
      var op = this.cc(o);
      t = op(t, m);
    }
    this.o9 = t * e;
  },
  ff(a) {
    return String.fromCharCode(a);
  },
  pi(a) {
    return parseInt(a);
  },
  cc(a) {
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
  },
  /**
   * @param {boolean} start
   * @returns date
   */
  get_cf_date(start) {
    if (Date.now) {
      return start ? new Date(Date.now()).getTime() : Date.now();
    } else {
      return start ? new Date(+new Date()).getTime() : +new Date();
    }
  },
  /**
   *
   * @param {*} a
   */
  jrs(a) {
    for (
      var t = Math.floor(1e5 * Math.random() + 1e4),
        e = String(a * t),
        n = 0,
        o = [],
        m = e.length >= 18;
      o.length < 6;

    )
      o.push(parseInt(e.slice(n, n + 2))), (n = m ? n + 3 : n + 2);
    return [t, this.cal_dis(o)];
  },
  od(a, t) {
    try {
      (a = String(a)), (t = String(t));
      var e = [],
        n = t.length;
      if (n > 0) {
        for (var o = 0; o < a.length; o++) {
          var m = a.charCodeAt(o),
            r = a.charAt(o),
            i = t.charCodeAt(o % n);
          (m = this.rir(m, 47, 57, i)),
            m != a.charCodeAt(o) && (r = String.fromCharCode(m)),
            e.push(r);
        }
        if (e.length > 0) return e.join("");
      }
    } catch (a) {}
    return a;
  },
  rir(a, t, e, n) {
    return a > t && a <= e && (a += n % (e - t)) > e && (a = a - e + t), a;
  },
  /**
   *
   * @return fpcf browser fingerprint
   */
  data() {
    return [
      this.browserData.canvas.firstCanvasValue, // first canvas value
      this.browserData.canvas.secondCanvasValue, // second canvas value
      "dis",
      this.pluginInfo(),
      !!this.browserData.window.sessionStorage,
      !!this.browserData.window.localStorage,
      !!this.browserData.window.indexedDB,
      new Date().getTimezoneOffset(),
      this.webrtcKey(),
      this.browserData.screen.colorDepth
        ? this.browserData.screen.colorDepth
        : -1,
      this.browserData.screen.pixelDepth
        ? this.browserData.screen.pixelDepth
        : -1,
      this.browserData.navigator.cookieEnabled
        ? this.browserData.navigator.cookieEnabled
        : -1,
      this.browserData.navigator.javaEnabled,
    ].join(";");
  },
  webrtcKey() {
    return (
      "function" == this.browserData.window.RTCPeerConnection ||
      "function" == this.browserData.window.mozRTCPeerConnection ||
      "function" == this.browserData.window.webkitRTCPeerConnection
    );
  },
  pluginInfo() {
    let PLUGINS = [
      "WebEx64 General Plugin Container",
      "YouTube Plug-in",
      "Java Applet Plug-in",
      "Shockwave Flash",
      "iPhotoPhotocast",
      "SharePoint Browser Plug-in",
      "Chrome Remote Desktop Viewer",
      "Chrome PDF Viewer",
      "Native Client",
      "Unity Player",
      "WebKit-integrierte PDF",
      "QuickTime Plug-in",
      "RealPlayer Version Plugin",
      "RealPlayer(tm) G2 LiveConnect-Enabled Plug-In (32-bit)",
      "Mozilla Default Plug-in",
      "Adobe Acrobat",
      "AdobeAAMDetect",
      "Google Earth Plug-in",
      "Java Plug-in 2 for NPAPI Browsers",
      "Widevine Content Decryption Module",
      "Microsoft Office Live Plug-in",
      "Windows Media Player Plug-in Dynamic Link Library",
      "Google Talk Plugin Video Renderer",
      "Edge PDF Viewer",
      "Shockwave for Director",
      "Default Browser Helper",
      "Silverlight Plug-In",
    ];

    if (void 0 === this.browserData.navigator.plugins) return null;
    for (var a = PLUGINS.length, e = "", n = 0; n < a; n++) {
      var o = PLUGINS[n];
      this.browserData.navigator.plugins.includes(o) && (e = e + "," + n);
    }

    return e;
  },
  /**
   *
   * @param {*} ua_browser
   * @param {*} usedUserAgent
   * @param {*} browserData
   * @description uses fingerprint of user browser screen
   */
  gd(usedUserAgent) {
    let a = usedUserAgent;
    let t = "" + this.ab(a);
    let e = this.start_ts / 2;
    let n = this.browserData.screenSize.availWidth; // avil width
    let o = this.browserData.screenSize.availHeight; // availHeight
    let m = this.browserData.screenSize.width; // width
    let r = this.browserData.screenSize.height; // height
    let i = this.browserData.screenSize.clientWidth; // clientWidth
    let c = this.browserData.screenSize.clientHeight; // clientHeight
    let b = this.browserData.screenSize.outerWidth; // outerWidth
    this.z1 = parseInt(this.start_ts / (2016 * 2016));
    let d = Math.random();
    let k = parseInt((1e3 * d) / 2);
    let s = d + "";
    return (
      (s = s.slice(0, 11) + k),
      this.get_browser(),
      this.bc(),
      this.bmisc(),
      a +
        ",uaend," +
        this.xagg +
        "," +
        this.psub +
        "," +
        this.lang +
        "," +
        this.prod +
        "," +
        this.plen +
        "," +
        this.pen +
        "," +
        this.wen +
        "," +
        this.den +
        "," +
        this.z1 +
        "," +
        this.d3 +
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
        this.bd() +
        "," +
        t +
        "," +
        s +
        "," +
        e +
        "," +
        this.brv +
        ",loc:" +
        this.loc
    );
  },
  bc() {
    var a = this.browserData.window.addEventListener ? 1 : 0,
      t = this.browserData.window.XMLHttpRequest ? 1 : 0,
      e = this.browserData.window.XDomainRequest ? 1 : 0,
      n = this.browserData.window.emit ? 1 : 0,
      o = this.browserData.window.DeviceOrientationEvent ? 1 : 0,
      m = this.browserData.window.DeviceMotionEvent ? 1 : 0,
      r = this.browserData.window.TouchEvent ? 1 : 0,
      i = this.browserData.window.spawn ? 1 : 0,
      c = this.browserData.window.chrome.isPresent ? 1 : 0,
      b = 1,
      d = this.browserData.window.Buffer ? 1 : 0,
      k = this.browserData.window.PointerEvent ? 1 : 0,
      s = this.browserData.window.innerWidth ? 1 : 0,
      l = this.browserData.window.outerWidth ? 1 : 0;
    this.xagg =
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
  },
  /**
   *
   * @description get browser data like product language etc
   */
  get_browser() {
    this.psub = this.browserData.navigator.productSub;
    this.lang = this.browserData.navigator.language;
    this.prod = this.browserData.navigator.product;
    this.plen = this.browserData.navigator.plugins.length;
  },
  updatet() {
    return this.get_cf_date() - this.start_ts;
  },
  sed() {
    return [0, 0, 0, 0, 1, 0, 0].join(",");
  },
  /**
   *
   * @description get our browser plugins like if its chrome etc etc
   *
   */
  bd() {
    let a = [];
    let t = this.browserData.window.callPhantom ? 1 : 0;
    a.push(",cpen:" + t);
    let e = 0;
    this.browserData.window.ActiveXObject &&
      "ActiveXObject" in this.browserData.window &&
      (e = 1);
    a.push("i1:" + e);
    var n = "number" == typeof this.browserData.document.documentMode ? 1 : 0;
    a.push("dm:" + n);
    var o =
      this.browserData.window.chrome && this.browserData.window.chrome.webstore
        ? 1
        : 0;
    a.push("cwen:" + o);
    var m = this.browserData.navigator.onLine ? 1 : 0;
    a.push("non:" + m);
    var r = this.browserData.window.opera ? 1 : 0;
    a.push("opc:" + r);
    var i = "undefined" != typeof this.browserData.windowInstallTrigger ? 1 : 0;
    a.push("fc:" + i);
    var c =
      this.browserData.window.HTMLElement &&
      Object.prototype.toString
        .call(this.browserData.window.HTMLElement)
        .indexOf("Constructor") > 0
        ? 1
        : 0;
    a.push("sc:" + c);
    var b =
      "function" == this.browserData.window.RTCPeerConnection ||
      "function" == this.browserData.window.mozRTCPeerConnection ||
      "function" == this.browserData.window.webkitRTCPeerConnection
        ? 1
        : 0;
    a.push("wrc:" + b);
    var d =
      "mozInnerScreenY" in this.browserData.window
        ? this.browserData.window.mozInnerScreenY
        : 0;
    a.push("isc:" + d), (this.d2 = parseInt(this.z1 / 23));
    var k = "function" == this.browserData.navigator.vibrate ? 1 : 0;
    a.push("vib:" + k);
    var s = "function" == this.browserData.navigator.getBattery ? 1 : 0;
    a.push("bat:" + s);
    var l = Array.prototype.forEach ? 0 : 1;
    a.push("x11:" + l);
    var u = "FileReader" in this.browserData.window ? 1 : 0;
    return a.push("x12:" + u), a.join(",");
  },
  bmisc() {
    (this.pen = 0), (this.wen = 0), (this.den = 0);
  },
  /**
   *
   * @param {*} a
   * @description some type of absolute bit function
   */
  ab(a) {
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
  },
  /**
   *
   * @param {*} a
   */
  cal_dis(a) {
    var t = a[0] - a[1],
      e = a[2] - a[3],
      n = a[4] - a[5],
      o = Math.sqrt(t * t + e * e + n * n);
    return Math.floor(o);
  },
  // # nav_perm some permission plugins
  getNavPerm() {
    try {
      let a = [];
      let t = [
        "geolocation",
        "notifications",
        "push",
        "midi",
        "camera",
        "microphone",
        "speaker",
        "device-info",
        "background-sync",
        "bluetooth",
        "persistent-storage",
        "ambient-light-sensor",
        "accelerometer",
        "gyroscope",
        "magnetometer",
        "clipboard",
        "accessibility-events",
        "clipboard-read",
        "clipboard-write",
        "payment-handler",
      ];

      if (!this.browserData.navigator.permissions)
        return void (this.nav_perm = 6);
      this.nav_perm = 8;
      let e = function (t, e) {
        for (
          let i = 0;
          i < this.browserData.navigator.permissions.length;
          i++
        ) {
          if (this.browserData.navigator.permissions[i].name == t) {
            if (!this.browserData.navigator.permissions[i].state) {
              a[e] =
                -1 !==
                this.browserData.navigator.permissions[i].message.indexOf(
                  "is not a valid enum value of type PermissionName"
                )
                  ? 4
                  : 3;
            } else {
              switch (this.browserData.navigator.permissions[i].state) {
                case "prompt":
                  a[e] = 1;
                  break;
                case "granted":
                  a[e] = 2;
                  break;
                case "denied":
                  a[e] = 0;
                  break;
                default:
                  a[e] = 5;
              }
            }

            // # just break after finding it
            break;
          }
        }
      };

      let n = t.map(function (a, t) {
        return e(a, t);
      });

      this.nav_perm = a.join("");
    } catch (a) {
      this.nav_perm = 7;
    }
  },
  /**
   * @description for fpcf.td
   */
  updatetd() {
    var td = 0;

    try {
      var a = 0;
      a = Date.now ? Date.now() - lodash.random(25, 50) : +new Date() - 10;
      var n = 0;
      n = Date.now ? Date.now() : +new Date();
      td = n - a;
    } catch (a) {}

    return td;
  },
  // # device orientation event
  cdoa() {
    try {
      var rand = lodash.random(750, 1050);
      var updatet = this.get_cf_date() - this.start_ts;
      var t = updatet + rand - updatet;
      var e = -1;
      var n = -1;
      var o = -1;

      // # first iteration
      var m = this.doe_cnt + "," + t + "," + e + "," + n + "," + o;
      this.doact = m + ";";
      this.doe_vel = this.doe_vel + this.doe_cnt + t;
      this.doe_cnt += 1;
      this.ta += t;
    } catch (a) {}
  },
  // # device motion event
  cdma() {
    try {
      var rand = lodash.random(750, 1050);
      var updatet = this.get_cf_date() - this.start_ts;
      var t = updatet + rand - updatet;
      // # first iteration
      var k = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
      this.dmact = this.dmact + "," + k + ";";
      this.dme_vel = this.dme_vel + this.dme_cnt + t;
      this.dme_cnt += 1;
      this.ta += t;
    } catch (a) {}
  },
  // # visibility event
  lvc() {
    var updatet = this.get_cf_date() - this.start_ts;
    var t = updatet + lodash.random(200, 300) - updatet;

    try {
      if (this.vc_cnt < this.vc_cnt_lmt) {
        for (let i = 0; i < 60; i++) {
          t += lodash.random(0, 2);
          var e = 2 + "," + t + ";";
          this.vcact = this.vcact + e;
          this.vc_cnt++;
        }
      }
      this.vc_cnt++;
    } catch (a) {}
  },
};

/**
 * @description this will be the starting function that starts all functions
 * , this will build delay our sensor gen like how it starts like a human
 */
async function initSensorGen(site, options) {
  let randID = v4();
  // # start tracking
  bmak.to();
  // # get the selected site
  const selectedSite = siteOptions.find((s) => s[site] && s)[site];
  // # check if user want to make cookie instead of sensor_data
  if (options.makeCookie) {
    // # call makeCookie
    const cookie = await makeCookie(site, selectedSite, randID);
    console.log(cookie);
    return cookie;
  } else {
    // # call makeSensor
    const sensor = await makeSensor(selectedSite, randID);
    return sensor;
  }
}

/**
 * @description make valid sensor data
 * @return sensor_data
 */
async function makeSensor(selectedSite, randID) {
  const { browserData } = bmak;
  // # get browser ua
  const usedUserAgent = browserData.userAgent.toString().replace(/\|"/g, "");
  // # first initial cookie
  const initialCookie = await getInitialCookie(
    selectedSite,
    usedUserAgent,
    randID
  );
  // # get updatet
  let t = bmak.updatet();
  // # getting browser fingerprint data
  let n = bmak.gd(usedUserAgent);
  // # get navperm
  bmak.getNavPerm(browserData);
  // # update tst
  bmak.tst = bmak.get_cf_date() - (bmak.get_cf_date() - lodash.random(3, 9));
  // # get doact - device event
  bmak.cdoa();
  // # get dmact - device motion event
  bmak.cdma();
  // # get lvc - visiblity event
  bmak.lvc();
  // # get the jrs(start_ts)
  const ss = bmak.jrs(bmak.start_ts);
  // # get random canvas array
  let rVal = Math.floor(1e3 * Math.random()).toString();
  let rCFP = canvasArray.canvas[rVal].toString();
  let mrRand = mrArray.mr[Math.floor(4000 * Math.random())].toString();
  let fpValstr = bmak.data().replace(/"/g, '"') + ";-1";
  let g = "" + bmak.ab(fpValstr);
  // # get site url
  let b = selectedSite.url;

  // # first sensor data string
  bmak.sensor_data =
    bmak.ver +
    "-1,2,-94,-100," +
    n +
    "-1,2,-94,-101," +
    "do_en,dm_en,t_en" +
    "-1,2,-94,-105," +
    selectedSite.informinfo +
    "-1,2,-94,-102," +
    selectedSite.informinfo +
    "-1,2,-94,-108," +
    // bmak.kact
    "-1,2,-94,-110," +
    // bmak.mact
    "-1,2,-94,-117," +
    //  bmak.tact
    "-1,2,-94,-111," +
    bmak.doact +
    "-1,2,-94,-109," +
    bmak.dmact +
    "-1,2,-94,-114," +
    // bmak.pact
    "-1,2,-94,-103," +
    bmak.vcact +
    "-1,2,-94,-112," +
    b +
    "-1,2,-94,-115," +
    [
      bmak.ke_vel + 1,
      bmak.me_vel + 32,
      bmak.te_vel + 32,
      bmak.doe_vel,
      bmak.dme_vel,
      bmak.pe_vel,
      bmak.ke_vel +
        bmak.me_vel +
        bmak.doe_vel +
        bmak.dme_vel +
        bmak.te_vel +
        bmak.pe_vel,
      t,
      bmak.init_time,
      bmak.start_ts,
      bmak.updatetd(),
      bmak.d2,
      bmak.ke_cnt,
      bmak.me_cnt,
      bmak.pi(bmak.d2 / 6),
      bmak.pe_cnt,
      bmak.te_cnt,
      t + lodash.random(1, 5),
      bmak.ta,
      bmak.n_ck,
      initialCookie,
      bmak.ab(initialCookie),
      rVal,
      rCFP,
      browserData.fas,
      bmak.ff(80) + bmak.ff(105) + bmak.ff(90) + bmak.ff(116) + bmak.ff(69),
      ss[0],
      ss[1],
    ].join(",") +
    "-1,2,-94,-106," +
    bmak.aj_type + // aj_type is the  type of event for example; 6 is something to do with mouse
    "," +
    bmak.aj_indx;
  // # second sensor string
  bmak.sensor_data =
    bmak.sensor_data +
    "-1,2,-94,-119," +
    mrRand +
    "-1,2,-94,-122," +
    bmak.sed() +
    "-1,2,-94,-123," +
    "" + // for challenge cookie i think
    "-1,2,-94,-124," +
    "" + // also for challenge cookie
    "-1,2,-94,-126," +
    "" + // also for challenge cookie
    "-1,2,-94,-127," +
    bmak.nav_perm;

  var L = 24 ^ bmak.ab(bmak.sensor_data);
  // # third sensor string
  bmak.sensor_data =
    bmak.sensor_data +
    "-1,2,-94,-70," +
    fpValstr +
    "-1,2,-94,-80," +
    g +
    "-1,2,-94,-116," +
    bmak.o9 +
    "-1,2,-94,-118," +
    L +
    "-1,2,-94,-129," +
    (browserData.fmh +
      "," +
      browserData.fmz +
      "," +
      browserData.ssh +
      "," +
      bmak.wv +
      "," +
      bmak.wr +
      "," +
      bmak.weh +
      "," +
      bmak.wl) +
    "-1,2,-94,-121,";

  console.log(t);

  return bmak.gen_key(bmak.sensor_data);
}

/**
 * @description make valid sensor data
 * @return valie cookie
 */
async function makeCookie(site, selectedSite, randID) {
  try {
    const { browserData } = bmak;
    const sensorData = await makeSensor(selectedSite, randID);
    // # get browser ua
    const usedUserAgent = browserData.userAgent.toString().replace(/\|"/g, "");
    // # get post url
    const postURL = await getPostScript(selectedSite, usedUserAgent);
    // # make request
    const resp = await got("http://localhost:3030/sensor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: randID,
        url: `${selectedSite.url}${postURL}`,
        body: JSON.stringify({
          sensor_data: sensorData,
        }),
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          // cookie: `_abck=${abck};`,
          origin: `https://www.${site}.com`,
          referer: `https://www.${site}.com/`,
          "sec-fetch-site": "same-origin",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "user-agent": usedUserAgent,
        },
      }),
      responseType: "json",
    });

    // # get abck cookie
    let cookie = resp.body.cookies
      .toString()
      .split("_abck=")[1]
      .split("; Domain")[0];

    return cookie;
  } catch (e) {
    if (e) {
      console.log(e);
      console.log("\x1b[31m", `[POST] ${e.message}`);
    }
  }
}

/**
 *
 * @param {*} selectedSite
 * @param {*} usedUserAgent
 * @description get post_url script
 */
async function getPostScript(selectedSite, usedUserAgent) {
  // # make request
  const resp = await got(selectedSite.url, {
    method: "GET",
    http2: true,
    headers: {
      ...selectedSite.headers,
      "user-agent": usedUserAgent,
    },
    agent: !this.proxy
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
  });

  let p = /src="\/(static|assets|api|resources|public)\/(\w+)/gm.exec(
    resp.body
  );

  return `${p[1]}/${p[2]}`;
}

/**
 *
 * @param {*} selectedSite
 * @description get initial cookie
 */
async function getInitialCookie(selectedSite, usedUserAgent, randID) {
  // # make request
  const resp = await got("http://localhost:3030/initial", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: randID,
      url: selectedSite.url,
      headers: {
        ...selectedSite.headers,
        "user-agent": usedUserAgent,
        "Content-Type": "application/json",
      },
    }),
  });

  // # get abck cookie
  let cookie = JSON.parse(resp.body)
    .cookies.toString()
    .split("_abck=")[1]
    .split("; Domain")[0];

  return cookie;
}

initSensorGen("gamestop", { makeCookie: true });
module.exports = initSensorGen;
