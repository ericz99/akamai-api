const lodash = require("lodash");
const txt = require("txtgen");
const { titleCase } = require("title-case");
const randomWords = require("random-words");

const studlyCap = require("../libs/studlyCap");

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
  /**
   * have a .txt file with bunch of sentence, and type based on taht
   * that will full ignore randomizd, and will be unique
   */

  let k = updatet;

  // 1 - keyDown
  // 2 - keyUp
  // 3 - keyPress

  // keydown == keypress, its basically the same thing
  // but, keydown will always be first then keypress
  // if theres a captial, then two 1's then a 3, because that keydown

  let str = studlyCap(randomWords({ exactly: lodash.random(3, 6), join: "" }));
  let defaultLen = 140;
  let randLongPress = lodash.random(0, str.length);
  let arr = Array.from(Array(str.length).keys());

  let randCtrlIndex = Array.from(Array(lodash.random(6, 9))).map((x) => {
    let rand = lodash.random(0, arr.length - 1);
    return arr.splice(rand, 1)[0];
  });

  let randShiftIndex = Array.from(Array(lodash.random(6, 9))).map((x) => {
    let rand = lodash.random(0, arr.length - 1);
    return arr.splice(rand, 1)[0];
  });

  let randAltIndex = Array.from(Array(lodash.random(6, 9))).map((x) => {
    let rand = lodash.random(0, arr.length - 1);
    return arr.splice(rand, 1)[0];
  });

  let j = 0;
  let randEnding = 113;
  let keyMap = [
    {
      n: 17,
      d: 4,
    },
    {
      n: 16,
      d: 8,
    },
    {
      n: 18,
      d: 1,
    },
    {
      n: 8,
      d: 0,
    },
    {
      n: -2,
      d: 0,
    },
  ];

  // it can't be the timestamp problem
  // mostly likely the pattern are too similar
  // TODO: find a way to make the pattern less detectable
  // ex: if we have uppercase, it will do that same pattern over and over again

  try {
    for (let i = 0, j = 0; i < str.length; i++) {
      if (j < defaultLen) {
        let tri = "";
        const letter = str[i];

        // # random long click
        if (i == randLongPress) {
          for (let z = 0; z < lodash.random(6, 12); z++) {
            if (z == 1) {
              k += lodash.random(200, 400);
              bmak.ke_vel += j + 1 + k + 16 + 8 + randEnding;
              tri += `${j++},${1},${k},${16},${0},${8},${randEnding};`;
              bmak.ta += k;
              bmak.ke_cnt++;
            } else {
              // # ctrl key - keyDown
              k += lodash.random(1, 120);
              bmak.ke_vel += j + 1 + k + 16 + 8 + randEnding;
              tri += `${j++},${1},${k},${16},${0},${8},${randEnding};`;
              bmak.ta += k;
              bmak.ke_cnt++;
            }
          }

          // # this will be the keyUp
          k += lodash.random(10, 15);
          bmak.ke_vel += j + 2 + k + 16 + 0 + randEnding;
          tri += `${j++},${2},${k},${16},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // # this primary for ctrl keys
        if (randCtrlIndex.includes(i) && i !== randLongPress) {
          // # ctrl key - keyDown
          k += lodash.random(1, 75);
          bmak.ke_vel += j + 1 + k + 17 + 4 + randEnding;
          tri += `${j++},${1},${k},${17},${0},${4},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # ctrl key - keyUp
          k += lodash.random(150, 250);
          bmak.ke_vel += j + 2 + k + 17 + 0 + randEnding;
          tri += `${j++},${2},${k},${17},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // # this primary for shift keys
        if (randShiftIndex.includes(i) && i !== randLongPress) {
          // # ctrl key - keyDown
          k += lodash.random(1, 75);
          bmak.ke_vel += j + 1 + k + 16 + 8 + randEnding;
          tri += `${j++},${1},${k},${16},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # ctrl key - keyUp
          k += lodash.random(150, 250);
          bmak.ke_vel += j + 2 + k + 16 + 0 + randEnding;
          tri += `${j++},${2},${k},${16},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // # this primary for alt keys
        if (randAltIndex.includes(i) && i !== randLongPress) {
          // # ctrl key - keyDown
          k += lodash.random(1, 75);
          bmak.ke_vel += j + 1 + k + 18 + 1 + randEnding;
          tri += `${j++},${1},${k},${18},${0},${1},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # ctrl key - keyUp
          k += lodash.random(80, 150);
          bmak.ke_vel += j + 2 + k + 18 + 0 + randEnding;
          tri += `${j++},${2},${k},${18},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // // # if its a capital letter - we shift 16 and it should be - type of keyDown
        if (letter == letter.toUpperCase()) {
          // # keyDown first
          k += lodash.random(100, 150);
          bmak.ke_vel += j + 1 + k + 16 + 8 + randEnding;
          tri += `${j++},${1},${k},${16},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # another KeyDown
          k += lodash.random(100, 150);
          bmak.ke_vel += j + 1 + k + -2 + 8 + randEnding;
          tri += `${j++},${1},${k},${-2},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # keyPress
          bmak.ke_vel += j + 3 + k + -2 + 8 + randEnding;
          tri += `${j++},${3},${k},${-2},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # after it keyPress, we need to find what it keyPress, so its shift
          k += lodash.random(75, 125);
          bmak.ke_vel += j + 2 + k + -2 + 8 + randEnding;
          tri += `${j++},${2},${k},${-2},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # we click twice, so we need another keyDown
          k += lodash.random(75, 125);
          bmak.ke_vel += j + 2 + k + 16 + 0 + randEnding;
          tri += `${j++},${2},${k},${16},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # might need another click keyUp
          k += lodash.random(25, 75);
          bmak.ke_vel += j + 2 + k + -2 + 0 + randEnding;
          tri += `${j++},${2},${k},${-2},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        } else {
          // # keyDown first
          k += lodash.random(50, 100);
          bmak.ke_vel += j + 1 + k + -2 + 0 + randEnding;
          tri += `${j++},${1},${k},${-2},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # keyPress
          bmak.ke_vel += j + 3 + k + -2 + 0 + randEnding;
          tri += `${j++},${3},${k},${-2},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # we click twice, so we need another keyDown
          k += lodash.random(25, 75);
          bmak.ke_vel += j + 2 + k + -2 + 0 + randEnding;
          tri += `${j++},${2},${k},${-2},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // # concat our kact
        bmak.kact += tri;
      } else {
        // # get a random keyMap
        let randKeyMap = keyMap[Math.floor(Math.random() * keyMap.length)];
        k += lodash.random(150, 300);
        bmak.ke_vel += j + 1 + k + randKeyMap.n + randKeyMap.d + randEnding;
        bmak.kact += `${j++},${1},${k},${randKeyMap.n},${0},${
          randKeyMap.d
        },${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        // # keyDown for keyMap
        k += lodash.random(25, 75);
        bmak.ke_vel += j + 2 + k + randKeyMap.n + 0 + randEnding;
        bmak.kact += `${j++},${2},${k},${
          randKeyMap.n
        },${0},${0},${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        // # just update the last one
        k += lodash.random(200, 600);
        bmak.ke_vel += j + 1 + k + 13 + 0 + randEnding;
        bmak.kact += `${j},${1},${k},${13},${0},${0},${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        break;
      }

      if (i == str.length - 1) {
        // # get a random keyMap
        let randKeyMap = keyMap[Math.floor(Math.random() * keyMap.length)];
        k += lodash.random(150, 300);
        bmak.ke_vel += j + 1 + k + randKeyMap.n + randKeyMap.d + randEnding;
        bmak.kact += `${j++},${1},${k},${randKeyMap.n},${0},${
          randKeyMap.d
        },${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        // # keyDown for keyMap
        k += lodash.random(25, 75);
        bmak.ke_vel += j + 2 + k + randKeyMap.n + 0 + randEnding;
        bmak.kact += `${j++},${2},${k},${
          randKeyMap.n
        },${0},${0},${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        // # just update the last one
        k += lodash.random(1, 500);
        bmak.ke_vel += j + 1 + k + 13 + 0 + randEnding;
        bmak.kact += `${j},${1},${k},${13},${0},${0},${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        break;
      }
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
