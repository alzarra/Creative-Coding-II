
var girl;
var GRAVITY = 1;
var JUMP = 13;
function setup() {
  createCanvas(1100, 800);
  bg = createSprite(500,365);
  myBg = bg.addAnimation('bg','assets/bg.jpg');
  girl = createSprite(400, 450, 50, 100);
  var myAnimation = girl.addAnimation('idle', 'assets/Idle (1).png',  'assets/Idle (2).png',  'assets/Idle (3).png',  'assets/Idle (4).png',  'assets/Idle (5).png',  'assets/Idle (6).png',  'assets/Idle (7).png',  'assets/Idle (8).png',  'assets/Idle (9).png','assets/Idle (10).png');
  //for the transition between idle and run look better
  myAnimation.offY = 18;
  run = girl.addAnimation('run', 'assets/Run (1).png', 'assets/Run (2).png', 'assets/Run (3).png', 'assets/Run (4).png', 'assets/Run (5).png', 'assets/Run (6).png', 'assets/Run (7).png', 'assets/Run (8).png');
  melee = girl.addAnimation('melee', 'assets/Melee (1).png', 'assets/Melee (2).png', 'assets/Melee (3).png', 'assets/Melee (4).png', 'assets/Melee (5).png', 'assets/Melee (6).png', 'assets/Melee (7).png');
  shoot = girl.addAnimation('shoot', 'assets/Shoot (1).png', 'assets/Shoot (2).png', 'assets/Shoot (3).png');
  jump = girl.addAnimation('jump', 'assets/Jump (1).png', 'assets/Jump (2).png', 'assets/Jump (3).png', 'assets/Jump (4).png', 'assets/Jump (5).png', 'assets/Jump (6).png', 'assets/Jump (7).png', 'assets/Jump (8).png', 'assets/Jump (9).png', 'assets/Jump (10).png');
  dead = girl.addAnimation('dead', 'assets/Dead (1).png', 'assets/Dead (2).png', 'assets/Dead (3).png', 'assets/Dead (4).png', 'assets/Dead (5).png', 'assets/Dead (6).png', 'assets/Dead (7).png', 'assets/Dead (8).png', 'assets/Dead (9).png', 'assets/Dead (10).png');

  blocks = createSprite(800,690,70,70);
  myblock = blocks.addAnimation('obs', 'assets/block.jpg');
  blocks2 = createSprite(800,525,70,70);
  myblock2 = blocks2.addAnimation('obs', 'assets/block.jpg');
  blocks3 = createSprite(700,360,70,70);
  myblock3 = blocks3.addAnimation('obs', 'assets/block.jpg');

  ball = createSprite(200,500,20,20);
  myBall = ball.addAnimation('ball','assets/ball.png');






// set collision hitbox
girl.setCollider('rectangle',-10,2,270,500);
blocks.setCollider('rectangle',0,2,330,330);
blocks2.setCollider('rectangle',0,2,330,330);
blocks3.setCollider('rectangle',0,2,330,330);
ball.setCollider('circle',0,0,100);
}
/*
keys :
left arrow = moving left = 65
right arrow = moving right = 68
e key = melee attack = 69
j key = firing =74;
space key = jump = 32;
x = die = 88;
*/
function draw() {
  // frameRate(30);
  background(150);
  //ground
  fill('brown');
  girl.scale=.3
  blocks.scale=.5;
  blocks2.scale=.5;
  blocks3.scale=.5;
  ball.scale=.4;


  ground = rect(0,720,1200,1200);
   girl.velocity.y += GRAVITY;
   ball.velocity.y += GRAVITY;
  if(keyIsDown(65)) {
    girl.changeAnimation('run');
    girl.mirrorX(-1);//flipping
    girl.velocity.x = -5;
  }
  else if(keyIsDown(68)) {
    girl.changeAnimation('run');
    girl.mirrorX(1); //un-flip
    girl.velocity.x = 5;
  }else{
    girl.changeAnimation('idle');
    girl.velocity.x = 0;
    run.rewind();
  }
  if(keyIsDown(69)) {
    girl.changeAnimation('melee');
    girl.velocity.x = 0;
  }
  else{
    melee.rewind();
  }
  if(keyIsDown(74)){
    girl.changeAnimation('shoot');
    girl.velocity.x = 0;
  }
  else{
    shoot.rewind();
  }
  /////////--- gravity
  if(girl.position.y > 700 ) {
    girl.velocity.y = 0;
  }else{
    girl.changeAnimation('jump');}
  if(ball.position.y > 740){
    ball.velocity.y = 0;
  }
  ////////--- loop screen
  // ball.x = ball.x+5;

  print(ball.x);
  if(keyIsDown(32)){
    girl.changeAnimation('jump');
    girl.velocity.y = -JUMP;
  }
  if(keyIsDown(88)){
    girl.changeAnimation('dead');
    dead.goToFrame(dead.getLastFrame());
  }else{
    dead.rewind();
  }
  // if(keyIsDown(190)){
  //   girl.scale += 0.05;
  // }
  // if(keyIsDown(188)){
  //   girl.scale -= 0.05;
  // }


  //draw the sprite
  drawSprites();
  text('A,D= left,right', 10,20);
  text('E= Melee Attack', 10,40);
  text('<,>= Zoom In/Out --(disabled)', 10,60);
  text('Space Bar= Jump', 10,80);
  text('J= Shoot', 10,100);
  text('X = die', 10,120);
  text("Left mouse = hitbox", 10, 140);

  ///--------------------------------------------------------------///

  girl.collide(blocks);
  girl.collide(blocks2);
  girl.collide(blocks3);
  ball.collide(blocks);
  ball.collide(blocks2);
  ball.collide(blocks3);

  girl.displace(ball);


  girl.debug = mouseIsPressed;
  blocks.debug = mouseIsPressed;
  blocks2.debug = mouseIsPressed;
  blocks3.debug = mouseIsPressed;
  ball.debug = mouseIsPressed;

}
