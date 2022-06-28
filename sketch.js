var spaceImg, space;
var fuelImg, fuel, fuelGroup;
var rock1Img , rock1, rock1Group
var rock2Img , rock2, rock2Group
var rocketImg, rocket;
var starImg, star, starGroup;
var gameState = "play"

var score=0;


function preload(){
spaceImg = loadImage("Background(1).jpg");
fuelImg = loadImage("Fuel.jpg");
rock1Img = loadImage("Rock(1).png");
rock2Img = loadImage("Rock(2).jpg");
rocketImg = loadImage("Rocket.jpg");
starImg = loadImage("star.png");
}

function setup() {
 createCanvas(600, 600);
 space = createSprite(300,300);
 space.addImage("space",spaceImg);
 space.velocityY = 1;

 rocket = createSprite(200,200,50,50);
 rocket.addImage("rocket", rocketImg);
 rocket.scale = 0.3;

 fuelGroup = new Group();
 rock1Group = new Group();
 rock2Group = new Group();
 starGroup = new Group();

 score=0;
}

function draw() {
 background(200);

 if(gameState==="play"){

    if(space.y > 400){
        space.y = 300
    }

    if(keyDown("left_arrow"))
    {
        rocket.x = rocket.x - 3;
    }

    if(keyDown("right_arrow"))
    {
        rocket.x = rocket.x + 3;
    }

    if(keyDown("space"))
    {
        rocket.velocityY = -5;
    }
    rocket.velocityY = rocket.velocityY + 0.8;

    if(fuelGroup.isTouching(rocket))
    {
        rocket.velocityY = rocket.velocityY + 0.5;
    }

    if(rock1Group.isTouching(rocket))
    {
       rocket.destroy();
       gameState="end";
    }

    
    if(rock2Group.isTouching(rocket))
    {
       rocket.destroy();
       gameState="end";
    }

    if(starGroup.isTouching(rocket))
    {
       score = score + 1; 
       text("Score: "+ score, 500,50);
    }
    spawnGood();
    spawnBad();
    drawSprites();
 }
 if(gameState==="end")
 {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250)
 }
}

function spawnGood()
{
    if(frameCount%240===0)
    {
        star = createSprite(200,-50);
        star.addImage("star", starImg);

        fuel = createSprite(200,10);
        fuel.addImage("fuel", fuelImg);

        star.x = Math.round(random(120,400));
        fuel.x = Math.round(random(130,400));

        star.velocityY = 1;
        fuel.velocityY = 1;

        star.lifetime = 800;
        fuel.lifetime = 800;

        starGroup.add(star);
        fuelGroup.add(fuel);
    }
}