const lodash = require("lodash");

function beizerGenerator(t, p0, p1, p2, p3) {
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

function genPoint() {
  var points = [];
  var accuracy = 0.01, //this'll give the bezier 100 segments
    p0 = {
      x: lodash.random(0, 1920),
      y: lodash.random(0, 1080),
    }, //use whatever points you want obviously
    p1 = {
      x: lodash.random(0, 1920),
      y: lodash.random(0, 1080),
    },
    p2 = {
      x: lodash.random(0, 1920),
      y: lodash.random(0, 1080),
    },
    p3 = {
      x: lodash.random(0, 1920),
      y: lodash.random(0, 1080),
    };
  for (var i = 0; i < 1; i += accuracy) {
    var p = beizerGenerator(i, p0, p1, p2, p3);
    var x = Math.round(p.x);
    var y = Math.round(p.y);

    points.push({
      x,
      y,
    });
  }

  return points;
}

console.log(genPoint());

module.exports = genPoint;
