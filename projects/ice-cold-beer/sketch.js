var game_board;
var vel;
var gravity;

function preload() {
  leftRiserSound = loadSound('assets/drill.mp3');
  rightRiserSound = loadSound('assets/drill.mp3');
  leftRiserSound.pan(-0.8)
  rightRiserSound.pan(0.8)
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  rectMode(CENTER)
  game_board = new board(windowWidth/2,windowHeight/2,400);

  make_goals()
  make_holes()
  particles = new playBall(1,400,400)
  b = new moveablePlayer(2)
}

function make_holes(){
	var r;
	for(var i=0; i<30; i++) {
		r = int(random(game_board.width-50))
		a = int(random(game_board.height-60))
		game_board.holes.push(new dot((game_board.x)-(game_board.width/2)+r,a,20))
	}
}

// create goals and add to game_board's goals array
function make_goals() {

	game_board.goals.push(new dot(game_board.x,game_board.bottom-100,20))
	game_board.goals.push(new dot(game_board.x+120,game_board.bottom-115,20))
	game_board.goals.push(new dot(game_board.x-120,game_board.bottom-155,20))
	game_board.goals.push(new dot(game_board.x+70,game_board.bottom-185,20))
	game_board.goals.push(new dot(game_board.x-65, game_board.y+10,20))
	game_board.goals.push(new dot(game_board.x+115,game_board.bottom-305,20))
	game_board.goals.push(new dot(game_board.x+5,game_board.bottom-355,20))
	game_board.goals.push(new dot(game_board.x-110,game_board.bottom-390,20))
	game_board.goals.push(new dot(game_board.x+85,game_board.bottom-445,20))
	game_board.goals.push(new dot(game_board.x-50, game_board.bottom-475,20))
}

function generate_circles(numcircles) {
  var i=0;
  var reset = 0;
  while(i<numcircles) {
    //console.log(i)
    //console.log(circles.length+' '+numcircles+' '+i);
    x = round(random(50,win_width-50));
    y = round(random(50,win_height-50));
    w =round(random(10,50));
    if((y > win_height/2-30) && (y<win_height/2+30)) {
      continue;
    }
    l = round(map(y,0,600,0,1));
    if (circles.length === 0) {
      circles.push(new circle(x,y,w,l,round(random(seq.length))))
      i++;
      continue;
    }
    
    for(var j=0; j<circles.length; j++) {
      hit = collideCircleCircle(x,y,w,circles[j].x,circles[j].y,circles[j].width);
      if (hit) {
          reset = 1;
          break;
      }
    }
    
    if (reset || (abs((win_height/2) - (y+w))< 10)){
      reset = 0;
      continue;
    }

    circles.push(new circle(x,y,w,l,round(random(seq.length))));
    i++;
  }
}

function draw_holes() {
	strokeWeight(1)
	fill(50)
	for(var h=0; h<game_board.holes.length; h++) {
		game_board.holes[h].sketch()
	}
}

function getForces() {
	
	var adjacent = game_board.width;
	var opposite = game_board.leftside[1] - game_board.rightside[1]
	var theta = atan(opposite/adjacent)
	var force = (0.1 * particles.mass) 
	var gravity = createVector(0, force);
	return gravity

}

function draw() {
  background(220)
  fill(255)
  
  vel = getForces()
  game_board.sketch()


	if (keyIsDown(SHIFT)) {
	  if(game_board.leftmoving==0) {
	  		game_board.leftmoving = 1;
	  		leftRiserSound.play()
	  }
	  (game_board.leftside[1]<game_board.top) ? game_board.leftside[1]+=0:game_board.leftside[1]-=2
	}

	if (keyIsDown(OPTION)) {
		if(game_board.leftmoving==0) {
	  		game_board.leftmoving = 1;
	  		leftRiserSound.play()
	  }
	  (game_board.leftside[1]>game_board.bottom) ? game_board.leftside[1]+=0:game_board.leftside[1]+=2
	}

	if (keyIsDown(UP_ARROW)) {
		if(game_board.rightmoving==0) {
	  		game_board.rightmoving = 1;
	  		rightRiserSound.play()
	  }
	  (game_board.rightside[1]<game_board.top) ? game_board.rightside[1]+=0:game_board.rightside[1]-=2
	  }

	if (keyIsDown(DOWN_ARROW)) {
		if(game_board.rightmoving==0) {
	  		game_board.rightmoving = 1;
	  		rightRiserSound.play()
	  }
	  (game_board.rightside[1]>game_board.bottom) ? game_board.rightside[1]+=0:game_board.rightside[1]+=2
	}

	if (!keyIsDown(SHIFT) && !keyIsDown(OPTION)){
		game_board.leftmoving = 0
		leftRiserSound.stop()
	}
	if (!keyIsDown(UP_ARROW) && !keyIsDown(DOWN_ARROW)){
		game_board.rightmoving = 0
		rightRiserSound.stop()
	}

	gravity = getForces();
	particles.applyForce(gravity);

    // Update and display
   particles.update();
   particles.display();
   particles.checkEdges();
}
		

function board(_x,_y,_width) {
  this.x = _x;
  this.y = _y;
  this.width = _width;
  this.holes = [];
  this.goals = [];
  this.level = 1
  this.height = 600
  this.top = this.y - (this.height/2) + 40;
  this.bottom = this.y + (this.height/2) - 40;

  this.leftmoving = 0
  this.rightmoving = 0
  this.leftside = [this.x-(this.width/2), 600]
  this.rightside = [this.x+(this.width/2), 600]
  
  this.sketch = function() {
    // draw game box
    strokeWeight(12)
    stroke(1)
    rect(this.x,this.y,this.width,this.height)


    // draw target goals
    strokeWeight(1)
		for(var g=0; g<this.goals.length; g++) {
			fill(50)
			//stroke(100)
			if(g+1==this.level){
				// light up current target
			}
			this.goals[g].sketch()
		}
    
    // draw levers and middle bar in box
    strokeWeight(8)
    fill(255)
    line(this.leftside[0],this.leftside[1],this.rightside[0],this.rightside[1]);
    rect(this.leftside[0],this.leftside[1],30,30)
    rect(this.rightside[0],this.rightside[1],30,30)


    
    


    
  }
}


function dot(_x,_y,_width) {
	this.x = _x;
	this.y = _y;
	this.width = _width;

	this.sketch = function() {
		ellipse(this.x,this.y,this.width,this.width)
	}
}

function playBall(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);

  // Newton's 2nd law: F = M * A
  // or A = F / M
  this.applyForce = function(force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  };

  this.update = function() {
    // Velocity changes according to acceleration
    this.velocity.add(this.acceleration);
    // position changes by velocity
    this.position.add(this.velocity);
    // We must clear acceleration each frame
    this.acceleration.mult(0);
  };

  this.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(255,127);
    ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
  };

  // Bounce off bottom of window
  this.checkEdges = function() {
    if (this.position.y > min(game_board.leftside[1],game_board.rightside[1])) {
      this.velocity.y *= -0.9;  // A little dampening when hitting the bottom
      this.position.y = min(game_board.leftside[1],game_board.rightside[1]);
    }
  };

}


function moveablePlayer(speed) {
  this.x = 400;
  this.y = 500;
  this.speed = speed;
  this.width = 20;
  
  this.update = function(){
    
    if (keyIsDown(LEFT_ARROW))
      this.x-=speed;

    if (keyIsDown(RIGHT_ARROW))
      this.x+=speed;

    if (keyIsDown(UP_ARROW))
      this.y-=speed;

    if (keyIsDown(DOWN_ARROW))
      this.y+=speed;
    
    fill(45,100,200)
    ellipse(this.x,this.y,this.width,this.width);
    
    for(var y=0; y<game_board.goals.length; y++) {
    	hit = collideCircleCircle(this.x,this.y,this.width,game_board.goals[y].x,game_board.goals[y].y,game_board.goals[y].width)
    	if(hit) {
    		this.width = 0;
    	}
    }
  }
}

