var canvas;
var pagebody;
circles = []
function setup() {
  canvas = createCanvas(windowWidth-10,windowHeight-10);
	canvas.parent("holder");

  pagebody = select('#page');
	color1 = select('#color1');
	color2 = select('#color2');
	color3 = select('#color3');
	color4 = select('#color4');
	color5 = select('#color5');
									
	
	ca = color(100,100,100);
	circles.push(new draggableCircle((windowWidth/6),100,100,ca,ca));
	circles.push(new draggableCircle((3*windowWidth/6),100,100,ca,ca));
	circles.push(new draggableCircle((5*windowWidth/6),100,100,ca,ca));
	keyCode = 32;
	keyPressed();
}

function draw() {
	clear()
	for(var i=0; i<circles.length; i++) {
		//circles[i].display()
	}
}

function getRandomRGB() {
	r = round(random(255));
  g = round(random(255));
  b = round(random(255));
	c = color(r,g,b)
	return c;
}

function keyPressed() {
  if (keyCode == 32) {
		c = getRandomRGB();
		abc = rgbToHsl(c)
    
		
		
		
		
		c1 = [(abc[0]+30)%360,abc[1],abc[2]]
		c1 = hslToRgb(c1[0],c1[1],c1[2])
		//circles[0].fillColor = c;
		output = makeColorString(c1);
		color1.style("background-color", output);
		hexString = getHexString(c1);
    item1 = select('#item1');
    item1.html("rgb("+red(c1)+", "+green(c1)+", "+blue(c1)+")")
		info1 = select('#info1');
		info1.style("color", "rgb(31, 45, 61)")
		item2 = select('#item2')
    item2.html(hexString.toUpperCase())
		
		
		output = makeColorString(c);
    color2.style("background-color",output);
		hexString = getHexString(c);
    item1 = select('#item3');
    item1.html("rgb("+red(c)+", "+green(c)+", "+blue(c)+")")
		info1 = select('#info2');
		info1.style("color", "rgb(31, 45, 61)")
		item2 = select('#item4')
    item2.html(hexString.toUpperCase())
		
	
		c2 = hslToRgb((abc[0]-30)%360,abc[1],abc[2]);
		output = makeColorString(c2);
		color3.style("background-color", output);
		hexString = getHexString(c2);
    item1 = select('#item5');
    item1.html("rgb("+red(c2)+", "+green(c2)+", "+blue(c2)+")")
		info1 = select('#info3');
		info1.style("color", "rgb(31, 45, 61)")
		item2 = select('#item6')
    item2.html(hexString.toUpperCase())
		
		c3 = hslToRgb((abc[0]-150)%360,abc[1],abc[2]);
		output = makeColorString(c3);
		color4.style("background-color", output);
		hexString = getHexString(c3);
    item1 = select('#item7');
    item1.html("rgb("+red(c3)+", "+green(c3)+", "+blue(c3)+")")
		info1 = select('#info4');
		info1.style("color", "rgb(31, 45, 61)")
		item2 = select('#item8')
    item2.html(hexString.toUpperCase())
		
		c4 = hslToRgb((abc[0]+150)%360,abc[1],abc[2]);
		output = makeColorString(c4);
		color5.style("background-color", output);
		hexString = getHexString(c4);
    item1 = select('#item9');
    item1.html("rgb("+red(c4)+", "+green(c4)+", "+blue(c4)+")")
		info1 = select('#info5');
		info1.style("color", "rgb(31, 45, 61)")
		item2 = select('#item10')
    item2.html(hexString.toUpperCase())
		
		  
  } 
}

function makeColorString(clr) {
	output = "rgb("+red(clr)+", "+green(clr)+", "+blue(clr)+")";
	return output;
}

function hslToRgb(h, s, l){
		h /= 360, s/= 100, l/= 100;
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(colorsample){
	  r = red(colorsample)
		g = green(colorsample)
		b = blue(colorsample)

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.floor(h * 360), Math.floor(s * 100), Math.floor(l * 100)];
}

function getHexString(col) {
	var rhexString = red(col).toString(16);
	//if(rhexString.length == 1) rhexString = "0"+rhexstring;
  var ghexString = green(col).toString(16);
	//if(ghexString.length == 1) ghexString = "0"+ghexstring;
  var bhexString = blue(col).toString(16);
	//if(bhexString.length == 1) bhexString = '0'+bhexstring;
	hexString = "#"+rhexString+""+ghexString+""+bhexString;
	return hexString;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
	if(keyIsDown(SHIFT)) {
		for(var ii=0; ii<circles.length; ii++) {
			hit = collidePointCircle(mouseX,mouseY,circles[ii].position.x, circles[ii].position.y, circles[ii].width);
			if(hit) {
				if(circles[ii].strokeColor == circles[ii].fillColor) {
					circles[ii].strokeColor = color(100,100,100);
				} else {
					circles[ii].strokeColor = circles[ii].fillColor;
				}
			}
		}
	}
}