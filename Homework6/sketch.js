
// missing
    // 1-may enimes
    // 2-collider for group
    // 3-bullet moving to mouse loction (not follow )
    // 4-change enime postion
    // 5-bullet collision
var ghost;
var bg;
var frame;
var camerazoom = .01;
var life = [];
var life_n = 4;
var followMouse = "true";
var zoom = .5;

var score = 0;

// area of moving game
var SCENE_W = 3000;
var SCENE_H = 3000;


function setup() {
  cnv = createCanvas(1600, 800); // overall canvas
  cnv.center();

  // setup sprites
  ghost = createSprite(400, 200, 50, 100);
  var myAnimation = ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  myAnimation.offY = 18;

  enimes = new Group();

  star = createSprite(random(SCENE_W),random(SCENE_H));
  var chasing= star.addAnimation('chasing','assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  var dmg= star.addAnimation('dmg','assets/asterisk_stretching0001.png','assets/asterisk_stretching0008.png')

  obstacle = createSprite(random(SCENE_W),random(SCENE_H));
  var rock = obstacle.addAnimation('rock','assets/block0.png');


  // for (var i=0; i<6; i++){
  //   'enime'+i = createSprite(random(SCENE_W),random(SCENE_H));
  //   var myAnimation+i= i.addAnimation('normal','assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  //   enimes.add(i);
  // }

  //set up colliders
  ghost.setCollider('rectangle',0,16,80,160);
  star.setCollider('circle',0,5,65);
  obstacle.setCollider('rectangle',0,0,100,100);




  bg = new Group();

  for(var i=0; i<80; i++)
  {
    var rock = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    var grass =createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));

    rock.addAnimation('normal', 'assets/rocks'+Math.floor(random(4))+'.png');
    grass.addAnimation('normal', 'assets/grass'+Math.floor(random(4))+'.png');

    bg.add(rock);
    bg.add(grass);

  }

  obst = new Group();
  for(var i=0; i<10; i++)
  {
    var block =createSprite(random(SCENE_W), random(SCENE_H));
    block.addAnimation('normal', 'assets/block'+Math.floor(random(4))+'.png');
    obst.add(block);
    block.setCollider('rectangle',0,0,100,100);
    block.debug = mouseIsPressed;
  }
  // obst.setCollider('rectangle',0,0,100,100);

  camera.zoom = zoom;
  heart = loadImage('assets/heart.png',10,10);
  for(i=0; i<5; i++){
    life[i]=heart;
  }
  myGun = new gun()
}

function draw() { // -------------------------------draw start ------------------------------------
  background(255, 255, 255);

  if(keyCode === 80){ ///////(P)
    if(keyIsDown(65)){ /////(A)
      ghost.velocity.x =-5;
    }
    if(keyIsDown(68)){//////(D)
      ghost.velocity.x =+5;
    }
    if(keyIsDown(87)){///////(W)
      ghost.velocty.y =-5;
    }
    if(keyIsDown(83)){//////(S)
      ghost.velocty.y =+5;
    }
  }else{
  ghost.velocity.x = (camera.mouseX-ghost.position.x)/20;
  ghost.velocity.y = (camera.mouseY-ghost.position.y)/20;

  }

  if(keyIsDown(90)){ //////(Z)
    camera.zoom += camerazoom;
  }else if(keyIsDown(88)){//////(X)
    camera.zoom -= camerazoom;
  }

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
  drawSprites(obst);

  noStroke();
  fill(0, 0, 0, 20);

  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);

  drawSprite(ghost);
  drawSprite(star);
  drawSprite(obstacle);
  //drawSprites(enimes);
  // drawSprite(block);
  noFill()
  strokeWeight(7)
  stroke(51)
  rect(0,0,SCENE_W,SCENE_H);

  camera.off();

  for (i=0; i<life.length;i++){
    image(life[i],0+(i*50),0);
  }
  fill(0);
  textSize(15);
  text('q = take damage', 10,100);
  text('p = swtich movement style --(disabled)', 10, 130);
  text('Follow Mouse = '+followMouse,10,143);
  text('Z = Zoom in',10,173);
  text('X = Zoom out',10,203);
  text('E = Fire Bullet', 10,233);
  text('F5 = restart the game', 10,263);
  textSize(22);
  text('Score: '+score,width-150,20);

  ghost.collide(star);
  ghost.collide(obstacle);

  if(ghost.collide(star)){
    star.changeAnimation('dmg');
    life.splice(life_n, 1);
    life_n = life_n-1;
    return false;

  }
  ghost.debug = mouseIsPressed;
  star.debug = mouseIsPressed;
  obstacle.debug = mouseIsPressed;

  print(life_n);
  if(life_n<0){
    textSize(100)
    text('game over',width/2-300,height/2);
    ghost.stop();
  }


  // block.debug = mouseIsPressed;
  /////////////// should be last .. don't add after this line ////////////////////
  myGun.show();
  myGun.gunScoope();
  // function mousePressed(){
  //   myGun.gunBullet()
  //   myGun.bulletMoving();
  // }


  if(key === 'e'){/////(E)          ////// bulet shoting
    myGun.gunBullet();
      myGun.bulletMoving();
  }

} ///----------------------------------------------draw End ---------------------------------------

function keyReleased(){
  if(keyCode === 81){
    // print(life_n);
    life.splice(life_n, 1);
    life_n = life_n-1;
    return false;
  }
}
class gun{
  constructor(){
    this.bulletX=0;
    this.bulletY=0;
    this.bulletSpeed = 30;
    this.bullet = loadImage('assets/bullet.jpg')
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }
  show(){
    fill(255,255,255);
    translate(width / 2,  height / 2);
    let a = atan2(mouseY - height / 2, mouseX - width / 2);
    rotate(a);
    rect(0, 0, 100, 10);
    scale(.5)


  }
  gunScoope(){
    fill(255,0,0);
    circle(20,-5,20);
  }
  gunBullet(){
    // circle(this.bulletX,this.bulletY,50);
    image(this.bullet,this.bulletX,this.bulletY)
  }
  bulletMoving(){
    this.bulletX+=this.bulletSpeed;
  }
  moveingDirection(){

  }



}
