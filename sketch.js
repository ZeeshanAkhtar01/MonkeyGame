
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


function setup() {
 createCanvas(400, 400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
background("lightblue");
  
  
  stroke("white");
  textSize(10);
  fill("white");
  text("score: " + score, 300,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 100, 50);
  survivalTime = Math.ceil(frameCount/frameRate());
  
  if(monkey.isTouching(foodGroup)) {
    score = score + 1;
    foodGroup.destroyEach();
  }
  
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 159) {
        monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  obstacle1();
  food();
  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(300,220,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    foodGroup.add(banana);
  }
}

function obstacle1() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(250,330,10,40);             
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
    
  }
}


