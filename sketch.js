//Create variables here
var dog,dogImg1,dogImg2;
var happyDog;
var foodS;
var foodStock;
var database;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
	//load images here
  dogImg1=loadImage("dogImg.png");
  dogImg2=loadImage("dogImg1.png");
}

function setup() {

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

	createCanvas(500, 500);

  dog=createSprite(250,310,20,20);
  dog.addImage(dogImg1);
  dog.scale=0.25;

  foodObj=new Food();

  feed=createButton("Feed the dog");
  feed.position(600,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(700,95);
  addFood.mousePressed(addFoods);

  
}


function draw() { 
  background(46,139,87);
  
  foodObj.display();
  
  
  

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + "PM",200,30);
  }else if(lastFed==0){
    text("Last Feed :12 AM",200,30);
  }else{
    text("Last Feed :"+ lastFed + "AM",200,30);
  }

  drawSprites();
  //add styles here
  

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);

}

function feedDog(){
  dog.addImage(dogImg2);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })

}


function addFoods(){
  dog.addImage(dogImg1);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
