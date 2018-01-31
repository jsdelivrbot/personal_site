dot_array = [];
var dot_count=0;

var bounce=[];
var total=-1;
var hhc, hho, kck, snr, lt, ht, clp;
var started=0;

var multiplier=20;
var patterns = new Array(7);

  $(function() {
        $(".dial").knob();  

    });

//Loads wave files used as samples in sequencer
function preload() {
  hhc = loadSound('assets/closed.wav');
  hho = loadSound('assets/oh01.wav');
  snr = loadSound('assets/snare.wav');
  kck = loadSound('assets/kick.wav');
  lt = loadSound('assets/lt02.wav');
  ht = loadSound('assets/mt02.wav');
  clp = loadSound('assets/cp02.wav');
}




function setup() {
  createCanvas(1460, 900);
  imageMode(CENTER);
  background(255);
  noStroke();
  
  //Fills bounce array with values used to show circles swelling
  loadbounce();
  
  //Initializes pattern arrays to 0 for each sample row
  for (var i=0; i<7; i++){
    patterns[i] = new Array(16);
    for (var j=0; j<16; j++) {
      patterns[i][j]=0;
      dot_array.push(new dot(dot_count,j,i,(j+2)*70,(i+2)*85,2*multiplier,0,false));
      dot_count ++;
    }
  }
  
  fill('rgba(10,100,200,.8');
  makephrases(110);
}
//Assigns patterns to 'phrases' and creates a part composed of all phrases.
function makephrases(bpm){
  myPhrase1 = new p5.Phrase('hihatc', makeSound, patterns[0]); 
  myPhrase2 = new p5.Phrase('hihato', makeSound2, patterns[1]); 
  myPhrase3 = new p5.Phrase('snare', makeSound3, patterns[2]);
  myPhrase4 = new p5.Phrase('ht', makeSound4, patterns[3]);
  myPhrase5 = new p5.Phrase('lt', makeSound5, patterns[4]);
  myPhrase6 = new p5.Phrase('clap', makeSound6, patterns[5]);
  myPhrase7 = new p5.Phrase('kicker', makeSound7, patterns[6]);
  
  myPart = new p5.Part();
  myPart.addPhrase(myPhrase1);
  myPart.addPhrase(myPhrase2);
  myPart.addPhrase(myPhrase3);
  myPart.addPhrase(myPhrase4);
  myPart.addPhrase(myPhrase5);
  myPart.addPhrase(myPhrase6);
  myPart.addPhrase(myPhrase7);
  myPart.setBPM(bpm);
  myPart.onStep(grow); 
}

function grow() {
  total = (total+1)%16;
  for(var i=0; i<7; i++)
    dot_array[total+(i*16)].growing = 1;

}

function loadbounce(){
  //an array of triangle-like values for 'growing'
  var k=multiplier*2;
  for(var u=1;u<=10;u++){
    bounce.push(k+u);
  } 
  for(var d=1;d<10;d++){
    bounce.push(bounce[10-d]);
  }
}


function draw() {
  background('rgba(64,224,208,1)');
  //Draw reset rectangle
  strokeWeight(1);
  stroke(51);
  rect(500, 50, 200, 70, 20);
  noStroke();
  textSize(32);
  fill('rgb(60,130,200)');
  text("reset dots", 530, 95);
  
  fill('rgb(173,255,204)');
  
  for (var c=0;c<dot_count;c++){
    
    if(dot_array[c].clicked){
      strokeWeight(6);
      stroke('rgb(255,255,255)');
    }
    if (dot_array[c].growing==1){
      dot_array[c].width = bounce[dot_array[c].index];
      dot_array[c].index++;
      if(dot_array[c].index==18) {
        dot_array[c].growing=0; 
        dot_array[c].index=1;
      }
    }
    ellipse(dot_array[c].xctr,dot_array[c].yctr,dot_array[c].width,dot_array[c].width);
    noStroke();
  }
}

function clearPatterns(){
  var running_total=0;
  for (var i=0; i<7; i++){
    for (var j=0; j<16; j++) {
      patterns[i][j]=0;
      dot_array[running_total].clicked=0;
      running_total++;
    }
  }
}

function makeSound() {
   hho.play();
}
function makeSound2() {
   hhc.play();
}
function makeSound3() {
   snr.play();
}
function makeSound4() {
   ht.play();
}
function makeSound5() {
   lt.play();
}
function makeSound6() {
   clp.play();
}
function makeSound7() {
   kck.play();
}

//When mouse is released, scale volume level of each track according to knobs
function mouseReleased() {
  hho.setVolume(document.getElementById("knob1").value*.1);
  hhc.setVolume(document.getElementById("knob2").value*.1);
  snr.setVolume(document.getElementById("knob3").value*.1);
  ht.setVolume(document.getElementById("knob4").value*.1);
  lt.setVolume(document.getElementById("knob5").value*.1);
  clp.setVolume(document.getElementById("knob6").value*.1);
  kck.setVolume(document.getElementById("knob7").value*.1);
}

function mouseClicked() {
  
  if(started==0){
    myPart.start();
    myPart.loop();
    started++;
  }
  
  hit = collidePointRect(mouseX,mouseY,500, 50, 200, 70);
  if(hit)
    clearPatterns();
    
  for(var f=0; f<dot_count; f++){
    hit = collidePointCircle(mouseX, mouseY, dot_array[f].xctr, dot_array[f].yctr, dot_array[f].width);
    if (hit) {
      patterns[dot_array[f].colid][dot_array[f].rowid] = (patterns[dot_array[f].colid][dot_array[f].rowid]+1)%2;
      if(dot_array[f].clicked==true){
        dot_array[f].clicked=false;
        return;
      }
      dot_array[f].clicked=true;
    }
  }
  
}

function dot(_id, _rowid, _colid, _xctr, _yctr, _width, _index, _clicked){
  this.id=_id;
  this.rowid=_rowid;
  this.colid=_colid
  this.xctr=_xctr;
  this.yctr=_yctr;
  this.width=_width;
  this.index=_index;
  this.clicked=_clicked;
  this.growing=0;
}