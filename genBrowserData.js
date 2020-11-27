const device = require("./device.json");

/**
 * @description fetches the user agent
 */
function getUserAgent(usedDevice) {
  return usedDevice.navigator.userAgent;
}

/**
 * @description fetches user canvas value
 */
function getCanvasValue(usedDevice) {
  return {
    rCFP: usedDevice.firstCanvas.primary,
    rVal: usedDevice.firstCanvas.rVal,
    firstCanvasValue: usedDevice.firstCanvas.secondary,
    secondCanvasValue: usedDevice.secondaryCanvas.secondary,
  };
}

/**
 * @description fetches user screen size
 */
function getScreenSize(usedDevice) {
  const winScreenSize = usedDevice.window.screen;
  const docScreenSize = usedDevice.document.body;
  return {
    width: winScreenSize.width,
    height: winScreenSize.height,
    availWidth: winScreenSize.availWidth,
    availHeight: winScreenSize.availHeight,
    clientWidth: usedDevice.window.innerWidth,
    clientHeight: usedDevice.window.innerHeight,
    outerWidth: usedDevice.window.outerWidth,
  };
}

/**
 * @description get mr data
 */
function getMr(usedDevice) {
  return usedDevice.performanceInfo;
}

/**
 * @description get ssh value
 */
function ssh(usedDevice) {
  let ssh = "";
  const { speechSynthesis } = usedDevice.window;

  if (speechSynthesis) {
    if (speechSynthesis.length > 0) {
      for (var t = "", e = 0; e < speechSynthesis.length; e++)
        t += speechSynthesis[e].voiceURI + "_" + speechSynthesis[e].lang;
      ssh = ats(mn_s(t));
    } else ssh = "0";
  } else ssh = "n";

  return ssh;
}

function pluginInfo() {}

/**
 * @description get the fas value
 */
function fas(usedDevice) {
  const { navigator, math } = usedDevice;
  try {
    return (
      Boolean(navigator.credentials) +
      (Boolean(navigator.appMinorVersion) << 1) +
      (Boolean(navigator.bluetooth) << 2) +
      (Boolean(navigator.storage) << 3) +
      (Boolean(math.imul) << 4) +
      (Boolean(navigator.getGamepads) << 5) +
      (Boolean(navigator.getStorageUpdates) << 6) +
      (Boolean(navigator.hardwareConcurrency) << 7) +
      (Boolean(navigator.mediaDevices) << 8) +
      (Boolean(navigator.mozAlarms) << 9) +
      (Boolean(navigator.mozConnection) << 10) +
      (Boolean(navigator.mozIsLocallyAvailable) << 11) +
      (Boolean(navigator.mozPhoneNumberService) << 12) +
      (Boolean(navigator.msManipulationViewsEnabled) << 13) +
      (Boolean(navigator.permissions) << 14) +
      (Boolean(navigator.registerProtocolHandler) << 15) +
      (Boolean(navigator.requestMediaKeySystemAccess) << 16) +
      (Boolean(navigator.requestWakeLock) << 17) +
      (Boolean(navigator.sendBeacon) << 18) +
      (Boolean(navigator.serviceWorker) << 19) +
      (Boolean(navigator.storeWebWideTrackingException) << 20) +
      (Boolean(navigator.webkitGetGamepads) << 21) +
      (Boolean(navigator.webkitTemporaryStorage) << 22) +
      (Boolean(math.parseInt) << 23) +
      (Boolean(math.hypot) << 24)
    );
  } catch (a) {
    return 0;
  }
}

/**
 * @description get fmh value
 */
function fmh(usedDevice) {
  return ats(mn_s(usedDevice.otherFonts));
}

/**
 * @description get fmz value
 */
function fmz(usedDevice) {
  return usedDevice.window.devicePixelRatio;
}

/**
 *
 * @param {*} a
 * @description for ssh function
 */
function ats(a) {
  for (var t = "", e = 0; e < a.length; e++)
    t +=
      2 == a[e].toString(16).length
        ? a[e].toString(16)
        : "0" + a[e].toString(16);
  return t;
}

/**
 *
 * @param {*} a
 * @description for ssh function
 */
function mn_s(a) {
  var t = [
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298,
    ],
    e = 1779033703,
    n = 3144134277,
    o = 1013904242,
    m = 2773480762,
    r = 1359893119,
    i = 2600822924,
    c = 528734635,
    b = 1541459225,
    d = encode_utf8(a),
    k = 8 * d.length;
  d += String.fromCharCode(128);
  for (
    var s = d.length / 4 + 2, l = Math.ceil(s / 16), u = new Array(l), _ = 0;
    _ < l;
    _++
  ) {
    u[_] = new Array(16);
    for (var f = 0; f < 16; f++)
      u[_][f] =
        (d.charCodeAt(64 * _ + 4 * f) << 24) |
        (d.charCodeAt(64 * _ + 4 * f + 1) << 16) |
        (d.charCodeAt(64 * _ + 4 * f + 2) << 8) |
        (d.charCodeAt(64 * _ + 4 * f + 3) << 0);
  }
  var p = k / Math.pow(2, 32);
  (u[l - 1][14] = Math.floor(p)), (u[l - 1][15] = k);
  for (var h = 0; h < l; h++) {
    for (
      var v,
        g = new Array(64),
        w = e,
        y = n,
        C = o,
        S = m,
        E = r,
        v = i,
        M = c,
        j = b,
        _ = 0;
      _ < 64;
      _++
    ) {
      var x, A, L, P, T, F;
      _ < 16
        ? (g[_] = u[h][_])
        : ((x =
            rotate_right(g[_ - 15], 7) ^
            rotate_right(g[_ - 15], 18) ^
            (g[_ - 15] >>> 3)),
          (A =
            rotate_right(g[_ - 2], 17) ^
            rotate_right(g[_ - 2], 19) ^
            (g[_ - 2] >>> 10)),
          (g[_] = g[_ - 16] + x + g[_ - 7] + A)),
        (A = rotate_right(E, 6) ^ rotate_right(E, 11) ^ rotate_right(E, 25)),
        (L = (E & v) ^ (~E & M)),
        (P = j + A + L + t[_] + g[_]),
        (x = rotate_right(w, 2) ^ rotate_right(w, 13) ^ rotate_right(w, 22)),
        (T = (w & y) ^ (w & C) ^ (y & C)),
        (F = x + T),
        (j = M),
        (M = v),
        (v = E),
        (E = (S + P) >>> 0),
        (S = C),
        (C = y),
        (y = w),
        (w = (P + F) >>> 0);
    }
    (e += w),
      (n += y),
      (o += C),
      (m += S),
      (r += E),
      (i += v),
      (c += M),
      (b += j);
  }
  return [
    (e >> 24) & 255,
    (e >> 16) & 255,
    (e >> 8) & 255,
    255 & e,
    (n >> 24) & 255,
    (n >> 16) & 255,
    (n >> 8) & 255,
    255 & n,
    (o >> 24) & 255,
    (o >> 16) & 255,
    (o >> 8) & 255,
    255 & o,
    (m >> 24) & 255,
    (m >> 16) & 255,
    (m >> 8) & 255,
    255 & m,
    (r >> 24) & 255,
    (r >> 16) & 255,
    (r >> 8) & 255,
    255 & r,
    (i >> 24) & 255,
    (i >> 16) & 255,
    (i >> 8) & 255,
    255 & i,
    (c >> 24) & 255,
    (c >> 16) & 255,
    (c >> 8) & 255,
    255 & c,
    (b >> 24) & 255,
    (b >> 16) & 255,
    (b >> 8) & 255,
    255 & b,
  ];
}

function encode_utf8(a) {
  return unescape(encodeURIComponent(a));
}

function rotate_right(a, t) {
  return (a >>> t) | (a << (32 - t));
}

/**
 * @returns return all browser data
 */
function getAllBrowserData(rand) {
  const usedDevice = device[rand];

  return {
    userAgent: getUserAgent(usedDevice),
    canvas: getCanvasValue(usedDevice),
    screenSize: getScreenSize(usedDevice),
    navigator: usedDevice.navigator,
    window: usedDevice.window,
    document: usedDevice.document,
    screen: usedDevice.screen,
    mr: getMr(usedDevice),
    ssh: ssh(usedDevice),
    fas: fas(usedDevice),
    fmh: fmh(usedDevice),
    fmz: fmz(usedDevice),
  };
}

module.exports = getAllBrowserData;
