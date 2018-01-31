var shapes = [];
var counter = 0;
var act = -1;
var current = 0;
var offsetx = 0;
var offsety = 0;
var dragged = 1;
var firstoct = [69,82,110];
var last = -1;
start = 0;
var height;


function setup() {
  height = windowHeight;
  createCanvas(1200,height);
  rectMode(CENTER);
  osc = new p5.Oscillator();
  osc1 = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  osc3 = new p5.Oscillator();
  osc4 = new p5.Oscillator();
  osc5 = new p5.Oscillator();
  
  
  shapes.push(new shape(0,70,100,80,70,0,0,osc))
  shapes.push(new shape(1,180,400,80,180,0,0,osc1))
  shapes.push(new shape(1,400,550,80,400,0,0,osc2))
  shapes.push(new shape(1,840,500,80,840,0,0,osc3))  
  shapes.push(new shape(1,615,330,80,615,0,0,osc4))  
  shapes.push(new shape(1,290,220,80,290,0,0,osc5))  
  
  
}

function draw() {
  background(10);
  strokeWeight(1);
  stroke(51)
  drawlines();
  if(mouseIsPressed){
    if(act >=0){
      shapes[act].x = mouseX - offsetx;
      shapes[act].y = mouseY - offsety;
      shapes[act].freq = shapes[act].x+40;
      shapes[act].oscil.freq(shapes[act].freq);
      
      shapes[act].oscil.amp(map(height-shapes[act].y,0,height,0.0,1.0))
      
    }
  }
  
  
  fill(51)
  strokeWeight
  
  for(var j = 0; j<shapes.length; j++) {
    if(shapes[j].selected == 1) stroke(255),strokeWeight(3);
    else stroke(51),strokeWeight(1);
    if(shapes[j].type==1) shapes[j].drawRect();
    else if(shapes[j].type===0) shapes[j].drawCircle();
    else if(shapes[j].type==2) shapes[j].drawTriangle();
    if(start) shapeshift(j);
    shapes[j].oscil.amp(map(height-shapes[j].y,0,height,0.2,1.0));
  }
}

function shapeshift(j) {
  if(shapes[j].dir) {
    shapes[j].y--;
  } else shapes[j].y++;
  if(shapes[j].y===0) {
      shapes[j].dir = 0;
  } if(shapes[j].y==height) {
    shapes[j].dir = 1;
  }
    
}

function windowResized() {
    resizeCanvas(1200,windowHeight);
    height = windowHeight;
}

function drawlines() {
  for(var g=0;g<5;g++) {
    for(var d=0;d<firstoct.length;d++){
      line(firstoct[d]*pow(2,g)-40,0,firstoct[d]*pow(2,g)-40,height)
    }
  }
}

function shape(_id, _x, _y, _w, _freq, _osctype, _active, oscc, _veh) {
  this.id = _id;
  this.x = _x;
  this.y = _y;
  this.width = _w;
  this.freq = _freq;
  this.type = _osctype;
  this.active = 0;
  this.oscil = oscc;
  this.dir = 1;
  this.selected = 0;
  
  this.checkHit = function() {
    return collidePointCircle(mouseX, mouseY, this.x, this.y, this.width);
  }
  this.drawRect = function() {
    rect(this.x, this.y, this.width, this.width);
  }
  this.drawCircle = function() {
    ellipse(this.x, this.y, this.width, this.width);
  }
  this.drawTriangle = function() {
    var half = this.width/2
    triangle(this.x, this.y - half, this.x-half,this.y+half, this.x+half, this.y+half);
  }
  
  this.switchOsc = function() {
    if(this.type === 0) {
      this.oscil.setType('sine');

    } else if(this.type ==1) {
      this.oscil.setType('square');
      
    } else if(this.type ==2) {
      this.oscil.setType('triangle');
    }
  }
}


function mousePressed() {
  start = 1;
  for(var n=0; n<shapes.length; n++){
    hit = shapes[n].checkHit();
    if (hit) {
      offsetx = mouseX - shapes[n].x;
      offsety = mouseY - shapes[n].y;
      act = n;
    }
  }
}

function mouseReleased() {
  if(act >= 0) {
    if(!shapes[act].active) {
        shapes[act].active = 1;
        
        shapes[act].oscil.freq(shapes[act].freq);
        shapes[act].oscil.amp(.5,.9);
        shapes[act].oscil.start();
        shapes[act].oscil.freq(shapes[act].freq);
        act = -1
        return;
    }
      
      
    if(keyIsDown(OPTION)) {
      shapes[act].type = (shapes[act].type+1)%3;
      shapes[act].switchOsc();
      return;
    }
    
    if(shapes[act].selected){
      shapes[act].selected = 0;
      return;
    }
      //if(shapes[act].active) osc.amp(0, 0.5), shapes[act].active = 0;
    //shapes[act].selected = 1
    last = act;
    act = -1;
  }
}


