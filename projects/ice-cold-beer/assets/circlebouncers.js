var balls = [];
var N = 13;
var beep;
function preload() {
  //beep=loadSound("assets/beep.mp3");
}
function setup() {
    createCanvas(400, 400);
    start: for (var i = 1; i <= N; i++) {
        var c = new Circle(
        random(15, width - 15),
        random(15, height - 15),
        random(4, 15));
        c.velocity = p5.Vector.random2D().mult(4);
        for (var j = 0; j < balls.length; j++) {
            if (c.isIntersecting(balls[j])) continue start;
        }
        balls.push(c);
    }
}

function draw() {
    background(51);
    var xy,beeper=false;
    for (var i = 0; i < balls.length; i++) {
        balls[i].xy.add(balls[i].velocity);
    }
    for (var i = 0; i < balls.length; i++) {
        var xy=balls[i].xy;
        var collision = false;
        if (xy.x < balls[i].r || xy.x > (width - balls[i].r)) {
            collision = true;
            balls[i].velocity.x = -balls[i].velocity.x;
        }
        if (xy.y < balls[i].r || xy.y > (height - balls[i].r)) {
            collision = true;
            balls[i].velocity.y = -balls[i].velocity.y;
        }
        collision = collision || balls[i].testAndBounce(balls);
        if (collision) {
            beeper=true;
            balls[i].xy.add(balls[i].velocity);
            fill(255, 0, 0);
        } else {
            balls[i].xy = xy;
            fill(255);
        }
        ellipse(balls[i].xy.x, balls[i].xy.y, balls[i].r*2, balls[i].r*2);
    } //for i
    if (beeper && !beep.isPlaying()) beep.play();
}

function Circle(x, y, r) {
    this.r = r;
    this.xy = createVector(x, y);
    Object.defineProperties(this, {
        "area": {
            "get": function () {
                return this.r * this.r * PI;
            },
        }
    });
    Object.defineProperties(this, {
        "circumference": {
            "get": function () {
                return this.r * PI * 2;
            },
        }
    });
    Object.defineProperties(this, {
        "diameter": {
            "get": function () {
                return this.r + this.r;
            },
                "set": function (x) {
                this.r = x / 2;
            }
        }
    });
    Object.defineProperties(this, {
        "classOf": {
            "get": function () {
                return 'Circle';
            },
        }
    });
}
Circle.prototype.testAndBounce = function(circles) {
    for (var i=0; i<circles.length; i++) {
        var b = circles[i];  //reference, not copy
        if (b == this) continue;
        if (b.xy.dist(this.xy) > (this.r+b.r)) continue;
        var dif = p5.Vector.sub(this.xy,b.xy);
        dif.normalize();
        var dot = dif.dot(this.velocity)* -2;
        dif.mult(dot);
        this.velocity.add(dif);
        return true;
    } //for i
    return false;
}
Circle.prototype.copy = function () {
    return new Circle(this.xy.x, this.xy.y, this.r);
}
Circle.prototype.isIntersecting = function (circle) {
    var d = circle.xy.dist(this.xy);
    return d <= circle.r + this.r;
}
Circle.prototype.toString = function () {
    return this.xy.x + ' ' + this.xy.y + ' ' + this.r;
}
Circle.prototype.parse = function (str) {
    var a = str.split(/\s+/);
    if (a.length != 3) return null;
    this.xy.x = a[0] * 1;
    this.xy.y = a[1] * 1;
    this.r = a[2] * 1;
    return this;
}