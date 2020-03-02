
var ghost;
var bg;
var frame;
var camerazoom = .01;
var life = [];
var life_n = 4;
var followMouse = "true";
var enimes = [];
var score = 0;

// area of moving game
var SCENE_W = 3000;
var SCENE_H = 3000;


function setup() {
  cnv = createCanvas(1600, 800); // overall canvas
  cnv.center();

  ghost = createSprite(400, 200, 50, 100);
  var myAnimation = ghost.addAnimation('floating', 'assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  myAnimation.offY = 18;
  star = createSprite(400,200,50,100);
  var myAnimation2= star.addAnimation('normal','assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');


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
  camera.zoom = 1;
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

  noStroke();
  fill(0, 0, 0, 20);

  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);

  drawSprite(ghost);
  drawSprite(star);

  rect(0,0,SCENE_W,SCENE_H);

  camera.off();

  for (i=0; i<life.length;i++){
    image(life[i],0+(i*50),0);
  }
  fill(0)
  textSize(15);
  text('q = take damage', 10,100);
  text('p = swtich movement style //not working for now', 10, 130);
  text('Follow Mouse = '+followMouse,10,143);
  textSize(22);
  text('Score: '+score,width-150,20);

  if(life_n.length==0){ ////////// not working find a way
    print('Game Over');
    print()
  }

  /////////////// should be last .. don't add after this line ////////////////////
  myGun.show();
  myGun.gunScoope();
  // function mousePressed(){
  //   myGun.gunBullet();
  //   myGun.bulletMoving();
  // }


  // if(keyCode === 80){            ////// bulet shoting
  //   myGun.gunBullet();
  //     myGun.bulletMoving();
  // }

} ///----------------------------------------------draw End ---------------------------------------

function keyReleased(){
  if(keyCode === 81){
    print(life_n);
    life.splice(life_n, 1);
    life_n = life_n-1;
    return false;
  }
}
class gun{
  constructor(){
    this.bulletX=0;
    this.bulletY=0;
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
    circle(this.bulletX,this.bulletY,50);
  }
  bulletMoving(){
    this.bulletX++;

  }


}
