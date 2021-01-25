var dog,sadDog,happyDog;
var database;
var foodObj;
var foods = 0;
var foodStock = 0;
var feedTime, lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodObj = new Food();
  foodObj.getFoodStock();

  feed = createButton("Feed The Pet");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350, 30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + "AM", 350, 30);
  }

  drawSprites();
  foodObj.display();

  feedTime=database.ref("FeedTime");
  feedTime.on("value",function(data){
    lastFed=data.val();
  });
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    feedTime : hour()
  });
}

function addFoods(){
  foods++
  database.ref("/").update({
    Food : foods
  });
}

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
