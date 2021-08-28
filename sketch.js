const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

function preload()
{
  bgImg=loadImage("background.png");
  bubbleImg=loadImage("bubble.png");
  wMelon=loadImage("melon.png");
  rabbitImg=loadImage("Rabbit-01.png");
  blinkAni = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eatAni = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sadAni = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  melonB=loadImage("melonBubble.png")

  blinkAni.playing = true;
  eatAni.playing = true;
  sadAni.playing = true;

  sadAni.looping = false;
  eatAni.looping = false;
}

function setup() {
  createCanvas(800,600);
  engine = Engine.create();
  world = engine.world;
  //createSprite(400, 200, 50, 50);
  ground = new Ground(400,550,800,10)
  shelf = new Ground(350,189,100,20)
  rope1 = new  Rope(4,{x:190,y:250})
  rope2 = new  Rope(4,{x:50,y:300})
  fruit=Bodies.circle(200,500,15,{density:0.001})
  World.add(world,fruit)

  fruit1_con = new Link(rope1,fruit);
  fruit2_con = new Link(rope2,fruit);

  bunny = createSprite(320,100,100,100)
  bunny.addAnimation("blinking",blinkAni);
  bunny.addAnimation("eating",eatAni);
  bunny.addAnimation("crying",sadAni);
  bunny.changeAnimation("blinking");
  bunny.scale=0.25;

  bubble=createSprite(300,400,20,20);
  bubble.addImage("bubble",bubbleImg);
  bubble.addImage("melon",melonB)
  bubble.scale=0.08;

  button1 =createImg("cut_btn.png") 
  button1.position(180,250)
  button1.size(50,50)

  button2 =createImg("cut_btn.png") 
  button2.position(50,300)
  button2.size(50,50)

  button1.mouseClicked(drop1);
  button2.mouseClicked(drop2);

}

function draw() {
  background(bgImg);  
  Engine.update(engine);
  shelf.display();
  rope1.show();
  rope2.show();
  bunny.changeAnimation("blinking")
  if(fruit!=null && fruit!=bubbleCollide)
 {
    image(wMelon,fruit.position.x,fruit.position.y,60,60)
 } 

 if(bubbleCollide(fruit,bubble))
 {
   bubble.x=800;
   bubble.y=600;
   up();
 }

 if(collide(fruit,bunny,80)===true)
 {
   rope1.break();
   bubble.visible = false;
   bunny.changeAnimation('eating');
 }
 
  drawSprites();
}

function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d <= 80)
    {
      World.remove(world,fruit);
      fruit=null;

      return true
    }else{
      return false
    }
  }
}

function bubbleCollide()
{
  body=fruit;
  sprite=bubble;
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d <= 80)
    {
      image(melonB,fruit.position.x,fruit.position.y,60,60)
      bubble.visible=false;
      return true
    }else{
      return false
    }
  }
}

function drop1()
{
  rope1.break();
  fruit1_con.detach();
  fruit1_con=null;
} 
function drop2()
{
  rope2.break();
  fruit2_con.detach();
  fruit2_con=null;
} 

function up()
{
  Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.09})
}