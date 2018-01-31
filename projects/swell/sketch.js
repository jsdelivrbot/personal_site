swellValues = new Array(1000);
dotarray = [];
var offset = 120;
var mul = 20;
var baseOctave = [65, 69, 73, 78, 82, 87, 92, 98, 104, 110, 117, 123];
var allkeys = [];
var canvasX, canvasY, buttonWidth;
var lines = [];
var button;

function setup() {

  // if window is big enough create canvas with big button, else smaller button
  if (windowWidth > 900 && windowHeight > 700) {
    createCanvas(windowWidth, windowHeight);
    offset = (windowWidth - 660) / 2
    canvasX = windowWidth;
    canvasY = windowHeight;
    buttonWidth = 100;
  } else {
    createCanvas(windowWidth, 700);
    canvasX = windowWidth;
    canvasY = 700;
    offset = (windowWidth - 660) / 2
    buttonWidth = 60;
  }
  imageMode(CENTER);
  noStroke();

  fillSwellArray();
  makeDots();

  button = new dot(-10, canvasX / 2, canvasY - buttonWidth, buttonWidth, 0, 0, 0)
}

function makeDots() {
  //Make the dots
  //keep track of which frequencies are being grabbed
  freqcounter = 0
  counter = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 12; j++) {
      allkeys.push(baseOctave[j] * (pow(2, i)));
      dotarray.push(new dot(counter, (j * 60) + offset, (i + 2) * 60, swellValues[784] * 20, 784, false, allkeys[freqcounter]));
      counter++;
      freqcounter++;
    }
    freqcounter -= 5;
  }
}

function fillSwellArray() {
  var d = -.4;
  var n = 0;
  // fill array that determines circle swell width
  for (var g = 0; g < 1000; g++) {
    n = (cos(2 * (pow(d, 2))) + sin(20 * (pow(d, 3))));
    swellValues[g] = (n + .28) * 0.90292494784;
    d += .00105;
  }
  swellValues[1000] = 0;
}

function drawDots() {
  for (var c = 0; c < dotarray.length; c++) {
    if (dotarray[c].clicked) {
      //assigning width and amp to each dot if it has been clicked
      dotarray[c].index += 1;
      num = ((dotarray[c].index) % (1000));
      dotarray[c].width = swellValues[num] * mul;
      dotarray[c].vibrator.amp(dotarray[c].width / 2)
      fill(53,240,237);
    }
    ellipse(dotarray[c].xctr, dotarray[c].yctr, dotarray[c].width, dotarray[c].width);
    fill(23,190,187);
  }
}

function drawButton() {
  // apply color and draw reset button at bottom of screen
  fill('#D4F4DD');
  stroke(51);
  strokeWeight(1);
  ellipse(button.xctr, button.yctr, button.width, button.width);
  noStroke();
}

function draw() {
  background('#0E767B');
  fill(23,190,187);

  drawDots();
  drawButton();

}

function mouseClicked() {

  for (var f = 0; f < dotarray.length; f++) {
    hit = collidePointCircle(mouseX, mouseY, dotarray[f].xctr, dotarray[f].yctr, dotarray[f].width);

    if (hit) {
      if (dotarray[f].clicked == true) {
        dotarray[f].clicked = false;
        dotarray[f].vibrator.amp(0, .2);
        return;
      }
      dotarray[f].clicked = true;
      dotarray[f].vibrator = new p5.Oscillator(dotarray[f].oscfreq, 'sine');
      dotarray[f].vibrator.amp(.5, .2);
      dotarray[f].vibrator.start();
      return;
    }
  }


}

function mousePressed() {
  hit = collidePointCircle(mouseX, mouseY, canvasX / 2, canvasY - buttonWidth, buttonWidth);
  if (hit) {
    button.clicked = 1;
    button.width -= 10;
  }
}

function mouseReleased() {
  if (button.clicked == 1) {
    button.clicked = 0;
    button.width += 10;
    for (var ii = 0; ii < dotarray.length; ii++) {
      if (dotarray[ii].vibrator != 0) dotarray[ii].vibrator.stop();

      dotarray[ii].width = swellValues[784] * 20;
      dotarray[ii].clicked = 0;
    }
  }
}

function dot(_id, _xctr, _yctr, _width, _index, _clicked, _osc) {
  this.id = _id;
  this.oscfreq = _osc;
  this.xctr = _xctr;
  this.yctr = _yctr;
  this.width = _width;
  this.index = _index;
  this.clicked = _clicked;
  this.vibrator = 0;

}