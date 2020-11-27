const fs = require("fs");
const lodash = require("lodash");
const request = require("request-promise");
const { promisify } = require("util");
const got = require("got");
const { CookieJar } = require("tough-cookie");
const tunnel = require("tunnel");
const UserAgent = require("user-agents");
const { v4 } = require("uuid");

const newDevice = require("../newdevice.json");
const device = require("../device.json");
const genBrowserData = require("../genBrowserData");
const siteOptions = require("../stores.json");
const canvasArray = require("../canvas.json");
const mrArray = require("../mrstring.json");
const events = require("../events");

class NewSensorGen {
  constructor({ proxy = null, isMact = false, isKact = false }) {
    this.targetSite = null;
    this.proxy = proxy;
    this.isMact = isMact;
    this.isKact = isKact;
    this.id = v4();

    if (!isMact) {
      // # starting timestamp for no mact
      this.start_ts = this.get_cf_date(true) - lodash.random(300, 600);
    } else {
      // # starting timestamp for mact
      this.start_ts = this.get_cf_date(true) - lodash.random(4500, 6000);
    }

    // # ALL BMAK DATA
    this.bmak = {
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
      start_ts: this.start_ts,
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
      aj_indx: !isKact && !isMact ? 2 : 3, // same thing
      aj_type: !isKact && !isMact ? 9 : 3, // event type depend on certain event
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
      t_tst: this.start_ts,
      vc_cnt_lmt: 100,
      vc_cnt: 0,
      vcact: "",
      nav_perm: "11321144241322243122",
      updatet: 0,
    };
  }

  /**
   *
   * @param {*} site
   * @description responsible for creating sensor data
   */
  async makeSensor(site) {
    // # start tracking
    this.to();
    // # create new cookie jar per sensor data
    const cookieJar = new CookieJar();
    // # get random browser data
    const randDevice = Math.floor(Math.random() * newDevice.length);
    const { BrowserInformation: browserData } = newDevice[randDevice];
    // # get random user-agent
    const usedUserAgent = browserData.navigator.userAgent
      .toString()
      .replace(/\|"/g, "");
    // # get browser ua
    const ua_browser = this.getUaBrowser(usedUserAgent);
    // # get the selected site
    const selectedSite = siteOptions.find((s) => s[site] && s)[site];
    // # make a request to get invalid cookie
    const cookie = await this.getCookie(selectedSite, usedUserAgent);
    // # get post url
    const postURL = await this.getPostScript(selectedSite, usedUserAgent);
    // # getting browser fingerprint data
    let n = this.gd(ua_browser, usedUserAgent, browserData);
    // # get site url
    let b = selectedSite.url;
    // # get random canvas array
    let rVal = Math.floor(1e3 * Math.random()).toString();
    let rCFP = canvasArray.canvas[rVal].toString();
    let mrRand = mrArray.mr[Math.floor(4000 * Math.random())].toString();
    let fpValstr = this.data(browserData).replace(/"/g, '"') + ";-1";
    let g = "" + this.ab(fpValstr);
    // # get navperm
    // this.getNavPerm(browserData);
    // # update tst
    this.bmak.tst =
      this.get_cf_date() - (this.get_cf_date() - lodash.random(3, 9));
    let rand = lodash.random(300, 600);
    // # get doact
    var doact = events[site].cdoa(this.bmak, this.updatet(), rand);
    // # get dmact
    var dmact = events[site].cdma(this.bmak, this.updatet(), rand);
    // # get vcact only for certain site
    var vcact = events[site].lvc(this.bmak, this.updatet());
    // # get kact - keyboard event
    var kact = this.isKact
      ? events[site].cka(this.bmak, this.updatet())
      : (this.bmak.updatet = this.updatet());

    // # get the jrs(start_ts)
    const ss = this.jrs(this.bmak.start_ts);

    console.log(this.bmak.updatet);

    // # first sensor data string
    this.bmak.sensor_data =
      this.bmak.ver +
      "-1,2,-94,-100," +
      n +
      "-1,2,-94,-101," +
      "do_en,dm_en,t_en" +
      "-1,2,-94,-105," +
      selectedSite.informinfo +
      "-1,2,-94,-102," +
      selectedSite.informinfo +
      "-1,2,-94,-108," +
      (this.isKact ? kact : "") +
      "-1,2,-94,-110," +
      (this.isMact ? this.genMouseData(browserData) : "") +
      "-1,2,-94,-117," +
      //  bmak.tact
      "-1,2,-94,-111," +
      doact +
      "-1,2,-94,-109," +
      dmact +
      "-1,2,-94,-114," +
      // bmak.pact
      "-1,2,-94,-103," +
      vcact +
      "-1,2,-94,-112," +
      b +
      "-1,2,-94,-115," +
      [
        this.bmak.ke_vel + 1,
        this.bmak.me_vel + 32,
        this.bmak.te_vel + 32,
        this.bmak.doe_vel,
        this.bmak.dme_vel,
        this.bmak.pe_vel,
        this.bmak.ke_vel +
          this.bmak.me_vel +
          this.bmak.doe_vel +
          this.bmak.dme_vel +
          this.bmak.te_vel +
          this.bmak.pe_vel,
        this.bmak.updatet,
        this.bmak.init_time,
        this.bmak.start_ts,
        this.updatetd(),
        this.bmak.d2,
        this.bmak.ke_cnt,
        this.bmak.me_cnt,
        this.pi(this.bmak.d2 / 6),
        this.bmak.pe_cnt,
        this.bmak.te_cnt,
        this.bmak.updatet + lodash.random(1, 6),
        this.bmak.ta,
        this.bmak.n_ck,
        cookie,
        this.ab(cookie),
        rVal,
        rCFP,
        this.fas(browserData),
        this.ff(80) + this.ff(105) + this.ff(90) + this.ff(116) + this.ff(69),
        ss[0],
        ss[1],
      ].join(",") +
      "-1,2,-94,-106," +
      this.bmak.aj_type + // aj_type is the  type of event for example; 6 is something to do with mouse
      "," +
      this.bmak.aj_indx;
    // # second sensor string
    this.bmak.sensor_data =
      this.bmak.sensor_data +
      "-1,2,-94,-119," +
      mrRand +
      "-1,2,-94,-122," +
      this.sed() +
      "-1,2,-94,-123," +
      "" + // for challenge cookie i think
      "-1,2,-94,-124," +
      "" + // also for challenge cookie
      "-1,2,-94,-126," +
      "" + // also for challenge cookie
      "-1,2,-94,-127," +
      browserData.np;

    var L = 24 ^ this.ab(this.bmak.sensor_data);
    // # third sensor string
    this.bmak.sensor_data =
      this.bmak.sensor_data +
      "-1,2,-94,-70," +
      fpValstr +
      "-1,2,-94,-80," +
      g +
      "-1,2,-94,-116," +
      this.bmak.o9 +
      "-1,2,-94,-118," +
      L +
      "-1,2,-94,-129," +
      (browserData.fmh +
        "," +
        browserData.fmz +
        "," +
        browserData.ssh +
        "," +
        this.bmak.wv +
        "," +
        this.bmak.wr +
        "," +
        this.bmak.weh +
        "," +
        this.bmak.wl) +
      "-1,2,-94,-121,";

    // # full sensor
    return {
      selectedSite,
      sensor_data: this.gen_key(this.bmak.sensor_data),
      usedUserAgent,
      post_url: postURL,
      cookieJar,
    };
  }

  /**
   *
   * @param {*} site
   * @return valid cookie
   */
  async makeCookie(site) {
    try {
      // # gen sensor data
      const {
        selectedSite,
        sensor_data,
        usedUserAgent,
        post_url,
        cookieJar,
      } = await this.makeSensor(site);

      const resp = await got("http://localhost:3030/sensor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.id,
          url: `${selectedSite.url}${post_url}`,
          body: JSON.stringify({
            sensor_data: sensor_data,
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
  async getPostScript(selectedSite, usedUserAgent) {
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
  async getCookie(selectedSite, usedUserAgent) {
    // # make request
    const resp = await got("http://localhost:3030/initial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.id,
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

  /**
   *
   * @param {*} n
   * @description will save all cookie to file
   */
  amount(n) {
    let harvested = [];
    let i = 0;
    let intv = null;
    let t;

    intv = setInterval(
      (t = async () => {
        if (i == amount) {
          clearInterval(intv);
          // # save to file
          fs.appendFile(this.targetSite, harvested.join("\n"), (err) => {
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

  getNavPerm(browserData) {
    try {
      let that = this;
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

      if (!browserData.navigator.permissions)
        return void (this.bmak.nav_perm = 6);
      this.bmak.nav_perm = 8;
      let e = function (t, e) {
        for (let i = 0; i < browserData.navigator.permissions.length; i++) {
          if (browserData.navigator.permissions[i].name == t) {
            if (!browserData.navigator.permissions[i].state) {
              a[e] =
                -1 !==
                browserData.navigator.permissions[i].message.indexOf(
                  "is not a valid enum value of type PermissionName"
                )
                  ? 4
                  : 3;
            } else {
              switch (browserData.navigator.permissions[i].state) {
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

      this.bmak.nav_perm = a.join("");
    } catch (a) {
      this.bmak.nav_perm = 7;
    }
  }

  /**
   * @description get the fas value
   */
  fas(browserData) {
    try {
      return (
        Boolean(browserData.navigator.credentials) +
        (Boolean(browserData.navigator.appMinorVersion) << 1) +
        (Boolean(browserData.navigator.bluetooth) << 2) +
        (Boolean(browserData.navigator.storage) << 3) +
        (Boolean(browserData.imul) << 4) +
        (Boolean(browserData.navigator.getGamepads) << 5) +
        (Boolean(browserData.navigator.getStorageUpdates) << 6) +
        (Boolean(browserData.navigator.hardwareConcurrency) << 7) +
        (Boolean(browserData.navigator.mediaDevices) << 8) +
        (Boolean(browserData.navigator.mozAlarms) << 9) +
        (Boolean(browserData.navigator.mozConnection) << 10) +
        (Boolean(browserData.navigator.mozIsLocallyAvailable) << 11) +
        (Boolean(browserData.navigator.mozPhoneNumberService) << 12) +
        (Boolean(browserData.navigator.msManipulationViewsEnabled) << 13) +
        (Boolean(browserData.navigator.permissions) << 14) +
        (Boolean(browserData.navigator.registerProtocolHandler) << 15) +
        (Boolean(browserData.navigator.requestMediaKeySystemAccess) << 16) +
        (Boolean(browserData.navigator.requestWakeLock) << 17) +
        (Boolean(browserData.navigator.sendBeacon) << 18) +
        (Boolean(browserData.navigator.serviceWorker) << 19) +
        (Boolean(browserData.navigator.storeWebWideTrackingException) << 20) +
        (Boolean(browserData.navigator.webkitGetGamepads) << 21) +
        (Boolean(browserData.navigator.webkitTemporaryStorage) << 22) +
        (Boolean(browserData.parseInt) << 23) +
        (Boolean(browserData.hypot) << 24)
      );
    } catch (a) {
      return 0;
    }
  }

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
      (this.isMact ? lodash.random(5, 9) : lodash.random(30, 40)) +
      ";" +
      this.bmak.tst +
      ";" +
      (this.get_cf_date() - j);
    console.log(sensor_data);
    return sensor_data;
  }

  /**
   *
   * @param {*} a
   * @param {*} t
   * @description some encryption
   */
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
  }

  rir(a, t, e, n) {
    return a > t && a <= e && (a += n % (e - t)) > e && (a = a - e + t), a;
  }

  /**
   *
   * @param {*} browserData
   * @return fpcf browser fingerprint
   */
  data(browserData) {
    return [
      browserData.canvas.value1, // first canvas value
      browserData.canvas.value2, // second canvas value
      "dis",
      this.pluginInfo(browserData),
      !!browserData.sessionStorage,
      !!browserData.localStorage,
      !!browserData.indexedDB,
      new Date().getTimezoneOffset(),
      this.webrtcKey(browserData),
      browserData.screen.colorDepth ? browserData.screen.colorDepth : -1,
      browserData.screen.pixelDepth ? browserData.screen.pixelDepth : -1,
      browserData.navigator.cookieEnabled
        ? browserData.navigator.cookieEnabled
        : -1,
      browserData.navigator.javaEnabled,
    ].join(";");
  }

  webrtcKey(browserData) {
    return true;
  }

  pluginInfo(browserData) {
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

    if (void 0 === browserData.navigator.plugins) return null;
    for (var a = PLUGINS.length, e = "", n = 0; n < a; n++) {
      var o = PLUGINS[n];
      browserData.navigator.plugins.includes(o) && (e = e + "," + n);
    }

    return e;
  }

  /**
   *
   * @param {*} ua_browser
   * @param {*} usedUserAgent
   * @param {*} browserData
   * @description uses fingerprint of user browser screen
   */
  gd(ua_browser, usedUserAgent, browserData) {
    let a = usedUserAgent;
    let t = "" + this.ab(a);
    let e = this.bmak.start_ts / 2;
    let n = browserData.screen.availWidth; // avil width
    let o = browserData.screen.availHeight; // availHeight
    let m = browserData.screen.width; // width
    let r = browserData.screen.height; // height
    let i = browserData.innerWidth; // clientWidth
    let c = browserData.innerHeight; // clientHeight
    let b = browserData.outerWidth; // outerWidth
    this.bmak.z1 = parseInt(this.bmak.start_ts / (2016 * 2016));
    let d = Math.random();
    let k = parseInt((1e3 * d) / 2);
    let s = d + "";
    return (
      (s = s.slice(0, 11) + k),
      this.get_browser(browserData),
      this.bc(browserData),
      this.bmisc(),
      a +
        ",uaend," +
        this.bmak.xagg +
        "," +
        this.bmak.psub +
        "," +
        this.bmak.lang +
        "," +
        this.bmak.prod +
        "," +
        this.bmak.plen +
        "," +
        this.bmak.pen +
        "," +
        this.bmak.wen +
        "," +
        this.bmak.den +
        "," +
        this.bmak.z1 +
        "," +
        this.bmak.d3 +
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
        this.bd(browserData) +
        "," +
        t +
        "," +
        s +
        "," +
        e +
        "," +
        this.bmak.brv +
        ",loc:" +
        this.bmak.loc
    );
  }

  /**
   *
   * @param {*} browserData
   *
   */
  bc(browserData) {
    var a = browserData.addEventListener ? 1 : 0,
      t = browserData.XMLHttpRequest ? 1 : 0,
      e = browserData.XDomainRequest ? 1 : 0,
      n = 0,
      o = browserData.DeviceOrientationEvent ? 1 : 0,
      m = browserData.DeviceMotionEvent ? 1 : 0,
      r = browserData.TouchEvent ? 1 : 0,
      i = 0,
      c = 1,
      b = browserData.prototype_bind ? 1 : 0,
      d = 0,
      k = browserData.PointerEvent ? 1 : 0,
      s = browserData.innerWidth ? 1 : 0,
      l = browserData.outerWidth ? 1 : 0;
    this.bmak.xagg =
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

  /**
   *
   * @param {*} browserData
   * @description get browser data like product language etc
   */
  get_browser(browserData) {
    this.bmak.psub = browserData.navigator.productSub;
    this.bmak.lang = browserData.navigator.language;
    this.bmak.prod = browserData.navigator.product;
    this.bmak.plen = browserData.navigator.plugins.length;
  }

  updatet() {
    return this.get_cf_date() - this.bmak.start_ts;
  }

  sed() {
    return [0, 0, 0, 0, 1, 0, 0].join(",");
  }

  /**
   * @description for fpcf.td
   */
  updatetd() {
    var td = 0;

    try {
      var a = 0;
      a = Date.now ? Date.now() - lodash.random(10, 40) : +new Date() - 10;
      var n = 0;
      n = Date.now ? Date.now() : +new Date();
      td = n - a;
    } catch (a) {}

    return td;
  }

  /**
   *
   * @param {*} browserData
   * @description get our browser plugins like if its chrome etc etc
   *
   */
  bd(browserData) {
    let a = [];
    let t = 0;
    a.push(",cpen:" + t);
    let e = 0;
    a.push("i1:" + e);
    var n = "number" == typeof browserData.document.documentMode ? 1 : 0;
    a.push("dm:" + n);
    var o = 0;
    a.push("cwen:" + o);
    var m = browserData.navigator.onLine ? 1 : 0;
    a.push("non:" + m);
    var r = 0;
    a.push("opc:" + r);
    var i = 0;
    a.push("fc:" + i);
    var c =
      browserData.HTMLElement &&
      Object.prototype.toString
        .call(browserData.HTMLElement)
        .indexOf("Constructor") > 0
        ? 1
        : 0;
    a.push("sc:" + c);
    var b = 1;
    a.push("wrc:" + b);
    var d = "mozInnerScreenY" in browserData ? browserData.mozInnerScreenY : 0;
    a.push("isc:" + d), (this.bmak.d2 = parseInt(this.bmak.z1 / 23));
    var k = browserData.navigator.vibrate ? 1 : 0;
    a.push("vib:" + k);
    var s = browserData.navigator.getBattery ? 1 : 0;
    a.push("bat:" + s);
    var l = browserData.prototype_forEach ? 0 : 1;
    a.push("x11:" + l);
    var u = "FileReader" in browserData ? 1 : 0;
    return a.push("x12:" + u), a.join(",");
  }

  bmisc() {
    (this.bmak.pen = 0), (this.bmak.wen = 0), (this.bmak.den = 0);
  }

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
  }

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
  }

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
  }

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
  }

  to() {
    var a = this.get_cf_date() % 1e7;
    this.bmak.d3 = a;
    for (var t = a, e = this.pi(this.ff(51)), n = 0; n < 5; n++) {
      var o = this.pi(a / Math.pow(10, n)) % 10;
      var m = o + 1;
      var op = this.cc(o);
      t = op(t, m);
    }
    this.bmak.o9 = t * e;
  }

  ff(a) {
    return String.fromCharCode(a);
  }

  pi(a) {
    return parseInt(a);
  }

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
  }

  /**
   *
   * @param {*} usedUserAgent
   * @description get browser
   */
  getUaBrowser(usedUserAgent) {
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

  /**
   * @param {*} t
   * @param {*} p0
   * @param {*} p1
   * @param {*} p2
   * @param {*} p3
   * @returns {string} Random Mouse Movement
   */
  bezier(t, p0, p1, p2, p3) {
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
  genMouseData(browserData) {
    var timeStamp = this.updatet();
    // var firstTimeStamp = lodash.random(100, 200);
    var mouseString = "";
    let p0 = {
      x: lodash.random(0, 1000),
      y: lodash.random(0, 1000),
    };
    let p1 = {
      x: lodash.random(0, 1000),
      y: lodash.random(0, 1000),
    };
    let p2 = {
      x: lodash.random(0, 1000),
      y: lodash.random(0, 1000),
    };
    let p3 = {
      x: lodash.random(0, 1000),
      y: lodash.random(0, 1000),
    };

    var loop_amount = lodash.random(89, 99); // set back to whatever lodash.random(60, 99) later
    timeStamp -= lodash.random(900, 1200);
    // //# for the first string it0
    // mouseString += this.bmak.me_cnt + ",2," + firstTimeStamp + ",-1,-1,-1,it0;";
    // this.bmak.me_cnt += 1;
    // this.bmak.me_vel += this.bmak.me_cnt + 1 + firstTimeStamp - 2;

    for (var i = 0; i <= loop_amount; i++) {
      var p = this.bezier(i / 100, p0, p1, p2, p3);
      timeStamp = timeStamp + lodash.random(20, 30);
      this.bmak.me_cnt += 1;
      if (i == loop_amount) {
        mouseString =
          mouseString +
          this.bmak.me_cnt +
          ",3," +
          timeStamp +
          "," +
          Math.round(p.x) +
          "," +
          Math.round(p.y) +
          ",-1;";
      } else {
        this.bmak.me_vel +=
          i + 1 + timeStamp + Math.round(p.x) + Math.round(p.y);
        this.bmak.ta += timeStamp;
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

    // # update the updatet
    this.bmak.updatet = timeStamp;

    return mouseString;
  }
}

module.exports = NewSensorGen;
