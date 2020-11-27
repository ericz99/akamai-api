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

    return bmak.dmact;
  } catch (a) {}
}

function lvc(bmak, updatet) {
  var t = updatet + lodash.random(200, 300) - updatet;

  try {
    if (bmak.vc_cnt < bmak.vc_cnt_lmt) {
      for (let i = 0; i < 60; i++) {
        t += lodash.random(0, 2);
        var e = 2 + "," + t + ";";
        bmak.vcact = bmak.vcact + e;
        bmak.vc_cnt++;
      }
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

  let str = randomWords({ exactly: lodash.random(1, 2), join: "" });
  let defaultLen = 145;
  let randLongPress = lodash.random(0, str.length);
  let arr = Array.from(Array(str.length).keys());

  let randCtrlIndex = Array.from(Array(lodash.random(3, 9))).map((x) => {
    let rand = lodash.random(0, arr.length - 1);
    return arr.splice(rand, 1)[0];
  });

  let randShiftIndex = Array.from(Array(lodash.random(3, 9))).map((x) => {
    let rand = lodash.random(0, arr.length - 1);
    return arr.splice(rand, 1)[0];
  });

  let randAltIndex = Array.from(Array(lodash.random(3, 9))).map((x) => {
    let rand = lodash.random(0, arr.length - 1);
    return arr.splice(rand, 1)[0];
  });

  let j = 0;
  let randEnding = -1;
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

        // # this primary for ctrl keys
        if (randCtrlIndex.includes(i)) {
          // # ctrl key - keyDown
          k += lodash.random(105, 110);
          bmak.ke_vel += j + 1 + k + 17 + 4 + randEnding;
          tri += `${j++},${1},${k},${17},${0},${4},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # ctrl key - keyUp
          k += lodash.random(75, 110);
          bmak.ke_vel += j + 2 + k + 17 + 0 + randEnding;
          tri += `${j++},${2},${k},${17},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // # this primary for shift keys
        if (randShiftIndex.includes(i)) {
          // # ctrl key - keyDown
          k += lodash.random(105, 110);
          bmak.ke_vel += j + 1 + k + 16 + 8 + randEnding;
          tri += `${j++},${1},${k},${16},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # ctrl key - keyUp
          k += lodash.random(75, 110);
          bmak.ke_vel += j + 2 + k + 16 + 0 + randEnding;
          tri += `${j++},${2},${k},${16},${0},${0},${randEnding};`;
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
          k += lodash.random(25, 75);
          bmak.ke_vel += j + 2 + k + -2 + 8 + randEnding;
          tri += `${j++},${2},${k},${-2},${0},${8},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
          // # we click twice, so we need another keyDown
          k += lodash.random(25, 75);
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
          k += lodash.random(125, 150);
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
          k += lodash.random(50, 100);
          bmak.ke_vel += j + 2 + k + -2 + 0 + randEnding;
          tri += `${j++},${2},${k},${-2},${0},${0},${randEnding};`;
          bmak.ta += k;
          bmak.ke_cnt++;
        }

        // # concat our kact
        bmak.kact += tri;
      } else {
        // # just update the last one
        k += lodash.random(200, 600);
        bmak.ke_vel += j + 1 + k + 13 + 0 + randEnding;
        bmak.kact += `${j},${1},${k},${13},${0},${0},${randEnding};`;
        bmak.ta += k;
        bmak.ke_cnt++;
        break;
      }

      if (i == str.length - 1) {
        // # just update the last one
        k += lodash.random(200, 800);
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

// function cka(bmak, updatet) {
//   /**
//    * have a .txt file with bunch of sentence, and type based on taht
//    * that will full ignore randomizd, and will be unique
//    */
//   let randWords = randomWords({ exactly: lodash.random(4, 20), join: "" });

//   let newMap = [];
//   let copy = [];
//   let keyMap = [1, 2];

//   for (let i = 0; i < randWords.length; i++) {
//     // if (i == 0) {
//     //   newMap.push(1);
//     // } else {
//     //   newMap.push(keyMap[lodash.random(0, keyMap.length - 1)]);
//     // }

//     newMap = newMap.concat(keyMap);
//   }

//   let k = updatet;
//   copy = [...newMap];

//   // 1 - keyDown
//   // 2 - keyUp
//   // 3 - keyPress

//   try {
//     for (let i = 0; i < copy.length; i++) {
//       var t = newMap.shift();
//       k += lodash.random(30, 80);
//       var n = -2;

//       var l = 0;
//       var d = 0;
//       var s = -1; // keycode element

//       var u =
//         bmak.ke_cnt + "," + t + "," + k + "," + n + "," + l + "," + d + "," + s;

//       bmak.ke_vel += bmak.ke_cnt + t + k + n + d + s;
//       bmak.kact += u + ";";
//       bmak.ta += k;
//       bmak.ke_cnt++;
//     }

//     console.log(bmak.ke_cnt);
//     console.log(bmak.kact);
//     console.log("----------------");

//     bmak.updatet = k;
//     return bmak.kact;
//   } catch (a) {}
// }

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
