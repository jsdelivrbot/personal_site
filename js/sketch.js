var circles = [];
var p1, p2, p3, p4;
var cwid = 40;
var vecs = [];

function setup() {
  var canvas = createCanvas(300,300);
  canvas.parent('some')
  makeCircles();
  
}

function draw() {
  background(255)
  n = mouseX;

  for(var i=0; i<circles.length; i++){
    circles[i].trace();
    circles[i].movealong();
  }
}

function circle(_x,_y,_w,_id,_rgb){
  this.x = _x;
  this.y = _y;
  this.width = _w;
  this.id = _id;
  this.rgb = _rgb;
  
  this.trace = function() {
    fill(51);
    ellipse(this.x,this.y,round(this.width),round(this.width));
  }
  
  this.movealong = function() {
    if(this.id == 0) this.x ++;
    else if(this.id == 1) this.y ++;
    else if(this.id == 2) this.x --;
    else if(this.id == 3) this.y --;
    for(var f=0;f<vecs.length;f++){
      hit = collidePointPoint(vecs[f].x,vecs[f].y,this.x,this.y);
      if (hit) {
        this.id = f;
      }
    }
  }
  
}

function makeCircles() {
  p1 = createVector(70,70);
  vecs.push(p1)
  p2 = createVector(230,70);
  vecs.push(p2)
  p3 = createVector(230,230);
  vecs.push(p3)
  p4 = createVector(70,230);
  vecs.push(p4)
  
  circles.push(new circle(p1.x,p1.y,cwid,0,[30,30,30]));
  circles.push(new circle(p2.x,p2.y,cwid,1,[30,30,30]));
  circles.push(new circle(p3.x,p3.y,cwid,2,[30,30,30]));
  circles.push(new circle(p4.x,p4.y,cwid,3,[30,30,30]));
}
