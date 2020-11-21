const lodash = require("lodash");
const txt = require("txtgen");
const { rword } = require("rword");

const kactJSON = require("../kact.json");

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

// function cka(bmak, updatet) {
//   const rand = lodash.random(0, kactJSON.length - 1);
//   const kactObj = kactJSON[rand];
//   const split = kactObj.kact.split(";");
//   // # update bmak
//   bmak.kact += kactObj.kact;
//   bmak.ke_cnt += kactObj.ke_cnt;
//   bmak.ke_vel += kactObj.ke_vel;
//   bmak.ta += kactObj.ta;
//   // # get last updatet
//   bmak.updatet = split[split.length - 2].split(",")[2];
//   return bmak.kact;
// }

function cka(bmak, updatet) {
  /**
   * have a .txt file with bunch of sentence, and type based on taht
   * that will full ignore randomizd, and will be unique
   */
  let randWords = rword.generate(lodash.random(5, 10), {
    length: lodash.random(4, 8),
    capitalize: "first",
  });

  let newMap = [];
  let copy = [];
  let keyMap = [1, 3, 2];

  for (let i = 0; i < randWords.join(" ").length; i++) {
    if (i == 0) {
      newMap.push(1);
    } else {
      newMap.push(keyMap[lodash.random(0, keyMap.length - 1)]);
    }
  }

  let k = updatet - lodash.random(1000, 2000);
  copy = [...newMap];

  // # random length 1-10, but different index
  let randomArr = Array.from(Array(lodash.random(2, 30))).map((x) =>
    lodash.random(0, copy.length)
  );

  // # random shift code
  let randomShiftCode = Array.from(Array(lodash.random(2, 30))).map((x) =>
    lodash.random(0, copy.length)
  );

  // # random keycode for ctrl shift keys
  let randomKeyCode = [16, 17, 18, 20];
  let randomMetaCode = [8, 0];

  // 1 - keyDown
  // 2 - keyUp
  // 3 - keyPress

  try {
    for (let i = 0; i < copy.length; i++) {
      bmak.ke_cnt++;
      var t = newMap.shift();
      k += lodash.random(0, 125); // -> (1,20) // maybe delay longer in between words?
      var n = randomArr.includes(i)
        ? randomKeyCode[Math.floor(Math.random() * randomKeyCode.length)]
        : -2; // may change due to keyCode

      // # check if we at the last loop, need to add 13, because 13 = enter key
      if (i == copy.length - 1) {
        n = 13;
      }

      var l = 0;
      var d =
        n != 16
          ? randomShiftCode.includes(i)
            ? 8
            : 0
          : randomMetaCode[Math.floor(Math.random() * randomMetaCode.length)];
      var s = 113; // keycode element

      var u = i + "," + t + "," + k + "," + n + "," + l + "," + d + "," + s;

      bmak.ke_vel += i + t + k + n + d + s;
      bmak.kact += u + ";";
      bmak.ta += k;
    }

    bmak.updatet = k;
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
