//Action canvas
var c = document.getElementById("map");
var ctx = c.getContext("2d");
var map = new Image();
var heroX = 30;
var heroY = 200;
var hero = new Image();
var bulletImg = new Image();
var zombieImg = new Image();
var blood = new Image();
var zombieDeadImg = new Image();

map.src = 'img/map.png';
blood.src = 'img/blood.png';
hero.src = 'img/hero.png';
bulletImg.src = 'img/bullet.png';
zombieImg.src = 'img/zombie.png';
zombieDeadImg.src = 'img/zombieDead.png';



//Generates a random number between a min and max
function randomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

//Zombie class
function zombie(x,y,dead) {
	this.x = x;
	this.y = y;
	this.dead = dead;
}

//Bullet class
function bullet(x,y,exists) {
	this.x = x;
	this.y = y;
	this.exists = exists;
}

//Create arrays to hold zombies and bullets
var bullets = [];
var zombies = [];

//Keep track of which index to add to in the arrays
var bulletNum = 0;
var zombieNum = 0;

//Create zombie
function createZombie() {
	zombies[zombieNum] = new zombie(randomInt(300, 1000),randomInt(-50, 500),false);
	zombieNum++;
}

//Initial function to set shit up
function init() {
	ctx.drawImage(map, 0, 0);
	ctx.drawImage(hero, 30,200);
		
	createZombie();
	
	gameLoop = setInterval(doGameLoop, 1);
	zombieLoop = setInterval(doZombieLoop, 2000);
	//clearInterval() will stop setInterval
	
	window.addEventListener('keydown', whatKey, true);
}


	
//Main loop to listen for keypresses and check for collisions, etc
function doGameLoop() {
	ctx.drawImage(map, 0,0);
    ctx.drawImage(hero, heroX, heroY);
    
    
	for(var j = 0; j < zombies.length; j++) {
		if(zombies[j].dead){ 
			ctx.drawImage(zombieDeadImg, zombies[j].x, zombies[j].y);
		} else {
			ctx.drawImage(zombieImg, zombies[j].x, zombies[j].y);
		}
	}
	
	for(var i = 0; i < bullets.length; i++) {
		if(bullets[i].exists) { 
			ctx.drawImage(bulletImg, bullets[i].x, bullets[i].y);
			bullets[i].x += 30;  //This should maybe be a variable to allow for a variety of bullet speeds
			if(bullets[i].x > 1100) {
				bullets[i].exists = false;
				bullets.splice(i, 1);
				bulletNum--;
			}
		}
		for(j = 0; j < zombies.length; j++) {
			if(bullets[i].x > zombies[j].x && bullets[i].y > zombies[j].y && bullets[i].y < zombies[j].y + 260 && bullets[i].exists && zombies[j].dead ==false) {
			bullets[i].exists = false;
			ctx.drawImage(blood, zombies[j].x  + 100, bullets[i].y); //this should probably exist for longer than 20ms
			zombies[j].dead = true;
			bullets.splice(i, 1);
			bulletNum--;
			//If you kill zombies out of order, this can cause new zombies to overwrite existing ones. Need good way to despawn zombies and prevent zombieNum from blowing up!
			//zombieNum--;
			}
		}
    }
}

//Zombie generating loop
function doZombieLoop() {
	createZombie();
}



// Get key presses
function whatKey(evt) {

    switch (evt.keyCode) {
	case 32:
		fireBullet();
	break;

	// Left arrow.
	case 37:
		heroX = heroX - 30;
		if (heroX < 0) {
			// If at edge, reset position.
			heroX = 0;
		}
		break;

	// Right arrow.
	case 39:
		heroX = heroX + 30;
		if (heroX > 420) {
			// If at edge, reset position.
			heroX = 420;
		}
		break;

	// Down arrow
	case 40:
		heroY = heroY + 30;
		if (heroY > 510) {
			// If at edge, reset position.
            heroY = 510;
		}
		break;

	// Up arrow 
	case 38:
		heroY = heroY - 30;
		if (heroY < 0) {
			// If at edge, reset position.
			heroY = 0;
		}
		break;
	}
}
      
      
function fireBullet() {
	bullets[bulletNum] = new bullet(heroX + 172, heroY + 65, true); 
	bulletNum++;
}