const lodash = require("lodash");

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
  var timeStamp =
    Math.round(get_cf_date() - (new Date() - 20)) + lodash.random(2000, 10000);
  var mouseString = "";
  (p0 = {
    x: 10,
    y: 10,
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
      x: lodash.random(500, 750),
      y: lodash.random(20, 100),
    });
  var loop_amount = lodash.random(90, 99);
  for (var i = 0; i <= loop_amount; i++) {
    var p = bezier(i / 100, p0, p1, p2, p3);
    timeStamp = timeStamp + lodash.random(0, 2);
    if (i == loop_amount) {
      bmak.me_cnt = lodash.random(200, 1400);
      mouseString =
        mouseString +
        bmak.me_cnt +
        ",3," +
        timeStamp +
        "," +
        Math.round(p.x) +
        "," +
        Math.round(p.y) +
        ",-1;";
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

module.exports = genMouseData;
