
var ghost;
var bg;
var frame;

var SCENE_W = 1600;
var SCENE_H = 800;


function setup() {
  createCanvas(800, 400);


  ghost = createSprite(400, 200, 50, 100);

  var myAnimation = ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  myAnimation.offY = 18;

  ghost.addAnimation('moving', 'assets/ghost_walk0001.png', 'assets/ghost_walk0004.png');

  bg = new Group();


  for(var i=0; i<80; i++)
  {

    var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));

    rock.addAnimation('normal', 'assets/rocks'+i%3+'.png');
    bg.add(rock);
  }

  frame = loadImage('assets/frame.png');
}

function draw() {
  background(255, 255, 255);


  ghost.velocity.x = (camera.mouseX-ghost.position.x)/20;
  ghost.velocity.y = (camera.mouseY-ghost.position.y)/20;


  if(mouseIsPressed)
    camera.zoom = 0.25;
  else
    camera.zoom = 0.5;


  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;


  if(ghost.position.x < 0)
    ghost.position.x = 0;
  if(ghost.position.y < 0)
    ghost.position.y = 0;
  if(ghost.position.x > SCENE_W)
    ghost.position.x = SCENE_W;
  if(ghost.position.y > SCENE_H)
    ghost.position.y = SCENE_H;

  drawSprites(bg);

  noStroke();
  fill(0, 0, 0, 20);

  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);

  drawSprite(ghost);

  rect(0,0,SCENE_W,SCENE_H);


  camera.off();
  image(frame, 0, 0);
}
