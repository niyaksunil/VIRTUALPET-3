//Created variables here
var dog, happyDog,dogImg,happyDogImg,sadDogImg,livingRoomImg;
var database;
var stock = 0;
var foodStock;
var addFood,feed;
var milkImg,milk, objFood;
var fedTime; 
var lastFed =null;
var changeGameState,readGameState; 
var getGameState = null;
var bedRoomImg, gardenImg, washroomImg;
var currentTime;
 
function preload(){

//loaded images here
  dogImg = loadImage("images/Dog.png");
  happyDogImg = loadImage("images/happy dog.png");
  milkImg = loadImage("images/Milk.png");
  bedRoomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  sadDogImg = loadImage("images/Lazy.png");
  livingRoomImg = loadImage("images/Living Room.png")

}

function setup() {
  createCanvas(500, 500);

// called the firebase.database here 
  database = firebase.database();

// created the food object
  objFood = new Food;

// created the feed button
  feed = createButton("Feed the dog");
  feed.position(459,95);

// created the addFood button
  addFood = createButton("Add the Food");
  addFood.position(459,121);
  
// called the gameState from the database
  readGameState = database.ref('gameState');
  readGameState.on("value",function(data){
    getGameState = data.val();
  })
}

function draw() {  

  background(46, 139, 87);

// displaying the objFood
  objFood.display();

// mousePressed function for feed & addFood
  feed.mousePressed(feedDog);
  addFood.mousePressed(addFoods);

// calling the hour()
  currentTime = hour();

// updating the lastFed to 1
  if(lastFed > currentTime){
    lastFed = 1;
    database.ref('FeedTime').update({
      lastFed : 1
    });
  }

// changing the gameState while the lastFed increases
  if(lastFed){
    if(currentTime === lastFed){
    gameState("Living");
    objFood.livingRoom();

  }else if(currentTime === (lastFed+1)){
    gameState("Playing");
    objFood.garden();

  }else if (currentTime === (lastFed + 2)){
    gameState("Sleeping");
    objFood.bedRoom();

  }else if(currentTime >(lastFed + 2) && currentTime <= (lastFed + 4)){
    gameState("Bathing");
    objFood.washRoom();

  }else{
    gameState("Hungry");
  }

// functions while the gameState is = or != Hungry
  if(getGameState != "Hungry"){
    feed.hide();
    addFood.show();
  }else{
    feed.show();
    addFood.hide();
    imageMode(CENTER);
    image(sadDogImg, 446, 360 ,140,140);

  }
}
 
  drawSprites();

//added styles and text 
  textSize(20);
  fill("lavender");
  stroke("red");
 
// displaying the text
  text("Food Remaining : " + stock,136,425)
  if(stock < 3){
    text("Food Stock is getting low. \n Please add the food. ",247,54);
  }
  text("Last Fed Time : " + lastFed,136,468);

}

function feedDog(){

// calling the deductFood()
  objFood.deductFood();

// created a FeedTime node using set() 
  database.ref('FeedTime').set({
    lastFed : hour()
  })
  
}

function addFoods(){

// calling the updateFoodStock()
  objFood.updateFoodStock(); 
}

function gameState(state){

  // updating the gameState
  database.ref('/').update({
    gameState : state
  })

  
}