const fs = require("fs");
const lodash = require("lodash");
const request = require("request-promise");
const { promisify } = require("util");
const got = require("got");
const { CookieJar } = require("tough-cookie");
const tunnel = require("tunnel");
const UserAgent = require("user-agents");

const genBrowserData = require("../genBrowserData");
const siteOptions = require("../stores.json");
const canvasArray = require("../canvas.json");
const mrArray = require("../mrstring.json");
const events = require("../events");

class SensorGen {
  constructor(proxy) {
    this.targetSite = null;
    this.proxy = proxy;

    this.cookieJar = new CookieJar();
    // # starting timestamp
    this.start_ts = this.get_cf_date(true) - lodash.random(300, 900);
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
      t_tst: this.start_ts,
      vc_cnt_lmt: 100,
      vc_cnt: 0,
      vcact: "",
    };
  }

  /**
   *
   * @param {*} site
   * @description responsible for creating sensor data
   */
  async makeSensor(site) {
    // # get random browser data
    const browserData = genBrowserData();
    // # get random user-agent
    const usedUserAgent = browserData.userAgent.toString().replace(/\|"/g, "");
    // # get browser ua
    const ua_browser = this.getUaBrowser(usedUserAgent);
    // # get the selected site
    const selectedSite = siteOptions.find((s) => s[site] && s)[site];
    // # make a request to get invalid cookie
    const result = await this.getCookie(selectedSite, usedUserAgent);
    // # getting browser fingerprint data
    let n = this.gd(ua_browser, usedUserAgent, browserData);
    // # get site url
    let b = selectedSite.url;
    // # first sensor data string
    this.bmak.sensor_data =
      this.bmak.ver +
      "-1,2,-94,-100," +
      n +
      "-1,2,-94,-101," +
      "do_en,dm_en,t_en" +
      "-1,2,-94,-105," +
      // bmak.informinfo;
      "-1,2,-94,-102," +
      // bmak.informinfo
      "-1,2,-94,-108," +
      // bmak.kact
      "-1,2,-94,-110," +
      // bmak.mact
      "-1,2,-94,-117," +
      //  bmak.tact
      "-1,2,-94,-111," +
      // bmak.doact
      "-1,2,-94,-109," +
      // bmak.dmact
      "-1,2,-94,-114," +
      // bmak.pact
      "-1,2,-94,-103," +
      // bmak.vcact
      "-1,2,-94,-112," +
      b +
      "-1,2,-94,-115,";

    console.log(result);
  }

  async getCookie(selectedSite, usedUserAgent) {
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
      cookieJar: this.cookieJar,
    });

    let p = /src="\/(static|assets|api|resources|public)\/(\w+)/gm.exec(
      resp.body
    );

    // # get abck cookie
    let cookie = resp.headers["set-cookie"]
      .toString()
      .split("_abck=")[1]
      .split("; Domain")[0];

    // # get the bm_sz
    let bm_sz = resp.headers["set-cookie"]
      .toString()
      .split("bm_sz=")[1]
      .split("; Domain")[0];

    return {
      pUrl: `${p[1]}/${p[2]}`,
      cookie,
      bm_sz,
    };
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
    let n = browserData.screenSize.availWidth; // avil width
    let o = browserData.screenSize.availHeight; // availHeight
    let m = browserData.screenSize.width; // width
    let r = browserData.screenSize.height; // height
    let i = browserData.screenSize.clientWidth; // clientWidth
    let c = browserData.screenSize.clientHeight; // clientHeight
    let b = browserData.screenSize.outerWidth; // outerWidth
    this.bmak.z1 = parseInt(this.bmak.start_ts / (2016 * 2016));
    let d = Math.random();
    let k = parseInt((1e3 * d) / 2);
    let s = d + "";
    return (
      (s = s.slice(0, 11) + k),
      this.get_browser(ua_browser),
      this.bc(ua_browser),
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
        this.bd(ua_browser) +
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
   * @param {*} ua_browser
   *
   */
  bc(ua_browser) {
    var a = 1,
      t = 1,
      e = 0,
      n = 0,
      o = 1,
      m = 1,
      r = this.touchEvent(ua_browser),
      i = 0,
      c = 1,
      b = 1,
      d = this.chrome(ua_browser),
      k = 1,
      l = 0,
      s = 1;
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
   * @param {*} browser
   * @return touch event number
   */
  touchEvent(browser) {
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

  /**
   *
   * @param {*} browser
   * @return if its a chrome browser
   */
  chrome(browser) {
    switch (browser) {
      case "chrome":
        return 1;
      default:
        return 0;
    }
  }

  /**
   *
   * @param {*} ua_browser
   * @description get browser navigator
   */
  get_browser(ua_browser) {
    (this.bmak.psub = this.productSub(ua_browser)),
      (this.bmak.lang = "en-US"),
      (this.bmak.prod = "Gecko"),
      (this.bmak.plen = this.pluginsLength(ua_browser));
  }

  /**
   *
   * @param {*} browser
   * @description get plugin length of browser
   * @returns length of the browser plugins
   */
  pluginsLength(browser) {
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

  /**
   *
   * @param {*} browser
   * @description  get product sub of browser
   * @returns product sub
   */
  productSub(browser) {
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

  /**
   *
   * @param {*} browser
   * @description get our browser plugins like if its chrome etc etc
   *
   */
  bd(browser) {
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

  bmisc() {
    (this.bmak.pen = 0), (this.bmak.wen = 0), (this.bmak.den = 0);
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
}

module.exports = SensorGen;
