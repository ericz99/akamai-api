const lodash = require("lodash");

/**
 * since finishline site load slow,
 * we can trigger the event slow
 */

/**
 * @returns - bmak.doact
 */
function cdoa(bmak, updatet, start) {
  try {
    var t = updatet + start - updatet;
    var e = -1;
    var n = -1;
    var o = -1;

    // # first iteration  | finish line has 2
    var m = bmak.doe_cnt + "," + t + "," + e + "," + n + "," + o;
    bmak.doact = m + ";";
    bmak.doe_vel = bmak.doe_vel + bmak.doe_cnt + t;
    bmak.doe_cnt += 1;
    bmak.ta += t;

    // // # second iteration
    // t = t + lodash.random(10000, 15000);
    // var k = bmak.doe_cnt + "," + t + "," + e + "," + n + "," + o;
    // bmak.doact += k + ";";
    // bmak.doe_cnt += 1;
    // bmak.doe_vel = bmak.doe_vel + bmak.doe_cnt + t;
    // bmak.ta += t;

    // // # third iteration
    // t = t + lodash.random(20000, 35000);
    // var b = bmak.doe_cnt + "," + t + "," + e + "," + n + "," + o;
    // bmak.doact += b + ";";
    // bmak.doe_cnt += 1;
    // bmak.doe_vel = bmak.doe_vel + bmak.doe_cnt + t;
    // bmak.ta += t;

    // // # fourth iteration
    // t = t + lodash.random(600000, 700000);
    // var c = bmak.doe_cnt + "," + t + "," + e + "," + n + "," + o;
    // bmak.doact += c + ";";
    // bmak.doe_cnt += 1;
    // bmak.doe_vel = bmak.doe_vel + bmak.doe_cnt + t;
    // bmak.ta += t;

    return bmak.doact;
  } catch (a) {}
}

/**
 * @returns - bmak.dmact
 */
function cdma(bmak, updatet, start) {
  try {
    var t = updatet + start - updatet;
    // # first iteration
    var k = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    bmak.dmact = bmak.dmact + "," + k + ";";
    bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    bmak.dme_cnt += 1;
    bmak.ta += t;

    // // # second iteration
    // t = t + lodash.random(10000, 15000);
    // var y = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    // bmak.dmact = bmak.dmact + bmak.dme_cnt + "," + y + ";";
    // // bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    // bmak.dme_cnt += 1;
    // bmak.ta += t;

    // // # third iteration
    // t = t + lodash.random(20000, 35000);
    // var d = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    // bmak.dmact = bmak.dmact + bmak.dme_cnt + "," + d + ";";
    // // bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    // bmak.dme_cnt += 1;
    // bmak.ta += t;

    // // # fourth iteration
    // t = t + lodash.random(600000, 700000);
    // var z = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    // bmak.dmact = bmak.dmact + bmak.dme_cnt + "," + z + ";";
    // bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    // bmak.dme_cnt += 1;
    // bmak.ta += t;

    // // # fifth iteration
    // t = t + lodash.random(50000, 100000);
    // var u = t + ",-1,-1,-1,-1,-1,-1,-1,-1,-1";
    // bmak.dmact = bmak.dmact + bmak.dme_cnt + "," + u + ";";
    // // bmak.dme_vel = bmak.dme_vel + bmak.dme_cnt + t;
    // bmak.dme_cnt += 1;
    // bmak.ta += t;

    return bmak.dmact;
  } catch (a) {}
}

function lvc(bmak, updatet) {
  try {
    if (bmak.vc_cnt < bmak.vc_cnt_lmt) {
      var t = updatet - lodash.random(10, 100);
      var e = 2 + "," + t + ";";
      bmak.vcact = bmak.vcact + e;
      bmak.vc_cnt++;

      // // # second iteration
      // t = t + lodash.random(300, 500);
      // var y = 0 + "," + t + ";";
      // bmak.vcact = bmak.vcact + y;
      // bmak.vc_cnt++;
    }
    bmak.vc_cnt++;
    return bmak.vcact;
  } catch (a) {}
}

function cka(bmak, updatet) {
  let newMap = [];
  let copy = [];
  let rand = lodash.random(2, 6);
  let keyMap = [1, 3, 2];

  for (let i = 0; i < rand; i++) {
    newMap = newMap.concat(keyMap);
  }

  let k = updatet - lodash.random(2000, 3000);
  copy = [...newMap];

  try {
    for (let i = 0; i < copy.length; i++) {
      bmak.ke_cnt++;
      var t = newMap.shift();
      k += lodash.random(100, 125); // improve timestamp, its off on every loop
      var n = -2; // may change due to keyCode
      var l = 0;
      var d = 0;
      var s = -1;

      var u = i + "," + t + "," + k + "," + n + "," + l + "," + d + "," + s;

      bmak.ke_vel += i + t + k + n + d + s;
      bmak.kact += u + ";";
    }

    return bmak.kact;
  } catch (a) {}
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

module.exports = {
  cdoa,
  cdma,
  lvc,
  cka,
};
