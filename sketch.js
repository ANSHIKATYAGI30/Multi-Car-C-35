var hypnoticBall, database;
var position;
var hypnoticBallPos;

function setup(){
 createCanvas(400,400);
 database= firebase.database();

 hypnoticBall= createSprite(270,170, 20,20);
 hypnoticBall.shapeColor = "red";

 hypnoticBallPos= database.ref("ball/position");
 hypnoticBallPos.on("value", readPosition, showError);
}

function draw(){
  background("white");
  if(position !== undefined ){
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  }
}

function writePosition(x,y){
 database.ref("ball/position").set({
   "x" : position.x + x,
   "y" : position.y + y
 })
}

function readPosition(data){
  position= data.val();
  hypnoticBall.x= position.x;
  hypnoticBall.y= position.y;
}

function showError(){
  console.log("!!! Data Not Visible !!!");
}
