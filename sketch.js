var tRex, t1, edges, ground, g1, invisibleGround, invisibleTop, clouds, c1, ob1, ob2, ob3, ob4, ob5, ob6, obs1, score = 0,
  tCollider, go1, r2, dSound, d1, jSound, j1, cSound, c1
var r1;
var PLAY = 0
var END = 1
var gameState = PLAY
var cGroup, obsGroup
var gameOver, restart,hs=0


function setup() {
  createCanvas(600, 200);

  t1 = createSprite(50, 150, 20, 20)
  t1.addAnimation("t11", tRex)
  t1.scale = 0.5
  //t1.debug=true;
  t1.setCollider("rectangle",-5,0,50,t1.height,45)

  g1 = createSprite(300, 190, 600, 10)
  g1.addImage("g11", ground)


  invisibleGround = createSprite(300, 195, 600, 5)
  invisibleGround.visible = false
  r1 = Math.round(random(1, 10))
  cGroup = createGroup()
  obsGroup = createGroup()

  edges = createEdgeSprites()
  evennumber();

  gameOver = createSprite(300, 100, 20, 20)
  gameOver.addImage("g1", go1)
  gameOver.scale = 0.5
  restart = createSprite(300, 140, 20, 20)
  restart.addImage("r11", r2)
  restart.scale = 0.5

}

function preload() {
  tRex = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  ground = loadImage("ground2.png")
  clouds = loadImage("cloud.png")
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")
  tCollider = loadImage("trex_collided.png")
  go1 = loadImage("gameOver.png")
  r2 = loadImage("restart.png")
  j1 = loadSound("jump.mp3")
  d1 = loadSound("die.mp3")
  c1 = loadSound("checkPoint.mp3")
}

function draw() {
  background("white");

  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    score = Math.round(frameCount / 6)
    if (score % 50 === 0 && score > 0) {
      c1.play();
    }
    g1.velocityX = -(3 + 3 * score / 50)

    if (t1.isTouching(obsGroup))

    {
      gameState = END
      d1.play();
      //t1.velocityY=-12
      //j1.play();

    }
    spawnClouds();
    spawnObs();
    if (keyDown("space") && t1.y >= 159) {
      t1.velocityX = 0
      t1.velocityY = -12
      j1.play();
    }
    t1.velocityY = t1.velocityY + 0.8


  } else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    if(score>hs)
    {
      hs=score
    }
    g1.velocityX = 0
    cGroup.setVelocityXEach(0)
    obsGroup.setVelocityXEach(0)
    t1.velocityY = 0
    t1.addImage("t11", tCollider)

    cGroup.setLifetimeEach(-1)
  }
  textSize(15)
  text("Score: " + score, 300, 50)
  if (mousePressedOver(restart)&&gameState===END) 
  {
    reset();
  }

  drawSprites();
  //console.log(t1.y)

text("High Score:"+hs,400,50)


  t1.collide(invisibleGround)


  if (g1.x < -10) {
    g1.x = ground.width / 2
  }




}

function spawnObs() {
  if (frameCount % 70 === 0) {
    obs1 = createSprite(600, 170, 20, 20)
    obs1.velocityX = -(6 + 3 * score / 50)
    var r1 = Math.round(random(1, 6))
    obsGroup.add(obs1)
    switch (r1) {
      case 1:
        obs1.addImage("obs11", ob1)
        obs1.scale = 0.8
        break

      case 2:
        obs1.addImage("obs12", ob2)
        obs1.scale = 0.6
        break

      case 3:
        obs1.addImage("obs13", ob3)
        obs1.scale = 0.6
        break

      case 4:
        obs1.addImage("obs14", ob4)
        obs1.scale = 0.6
        break

      case 5:
        obs1.addImage("obs15", ob5)
        obs1.scale = 0.6
        break

      case 6:
        obs1.addImage("obs16", ob6)
        obs1.scale = 0.6
        break

      default:
        break


    }


  }



}

function spawnClouds() {
  //code
  if (frameCount % 60 === 0) {
    c1 = createSprite(600, 30, 10, 10)
    c1.velocityX = -(4 + 3 * score / 50)
    c1.addImage("c11", clouds)
    c1.y = random(50, 100)
    // console.log(c1.depth)
    t1.depth = c1.depth + 1
    c1.lifetime = 160
    cGroup.add(c1)
  }




}

function evennumber() {
  for (var e1 = 1; e1 <= 100; e1 = e1 + 1) {
    //console.log(e1)
    if (e1 % 2 === 0) {
      console.log(e1)
    }

  }




}

function reset()
  {
gameState=PLAY
    t1.addAnimation("t11",tRex)
    gameOver.visible=false;
    restart.visible=false;
    cGroup.destroyEach()
    obsGroup.destroyEach()
    score=0
    frameCount=0
  
}