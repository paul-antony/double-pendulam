//


//Based on work by Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/093-double-pendulum.html

let r1 = 125;
let r2 = 125;
let m1 = 5;
let m2 = 5;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;

let px2 = -1;
let py2 = -1;
let cx, cy;
let buffer = Array(5);

function setup() {
createCanvas(500, 500).parent('canva-holder');

  pixelDensity(1);
  console.log(2*PI)
  a1 = (Math.random() *2) * PI;
  a2 = (Math.random() *2) * PI;
  cx = width/ 2;
  cy = height/2;

}

function draw() {
  background(175);
  imageMode(CORNER);


  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = r1 * sin(a1);
  let y1 = r1 * cos(a1);

  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, m1, m1);

  line(x1, y1, x2, y2);
  fill(100);
  ellipse(x2, y2, m2, m2);

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  // a1_v *= 0.99;
  // a2_v *= 0.99;


  if (frameCount > 1) {
    buffer.push([x2,y2])
    if(buffer.length > 50){
      buffer = buffer.slice(1)
    }

  }
  buffer.forEach(function (item, index) {
  fill(0,255 - (255/index));
  ellipse(item[0], item[1], m2 - (m2/index), m2 - (m2/index));
});

}
