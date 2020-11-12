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
};
