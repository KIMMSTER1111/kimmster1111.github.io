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
var gamePaused = false;
var health = 3;
var heartImg = new Image();
var emptyHeartImg = new Image();
var grayImg = new Image();
var deathBloodImg = new Image();

map.src = 'img/map.png';
blood.src = 'img/blood.png';
hero.src = 'img/hero.png';
bulletImg.src = 'img/bullet.png';
zombieImg.src = 'img/zombie.png';
zombieDeadImg.src = 'img/zombieDead.png';
heartImg.src = 'img/heart.png';
emptyHeartImg.src = 'img/emptyHeart.png';
grayImg.src = 'img/gray.png';
deathBloodImg.src = 'img/deathBlood.png';



//Generates a random number between a min and max
function randomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

//Zombie class
function zombie(x,y,dead, rot, hp) {
	this.x = x;
	this.y = y;
	this.dead = dead;
	this.rot = rot; //rot is a timer to determine when to remove the zombie after it dies
	this.hp = hp;
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
	zombies[zombieNum] = new zombie(1100,randomInt(-50, 500),false, 0, 100);
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
		if(zombies[j].dead==false){ 
			if(randomInt(1,100)==100 && zombies[j].x > 150) { //Roll 1d100 and move the zombie closer if a 1 is rolled AND the zombie isn't too close already.
				zombies[j].x = zombies[j].x - 10;
			} 
			if(zombies[j].x < heroX + 130 && zombies[j].y + 220 > heroY && zombies[j].y < heroY + 200 ) {
				//Hero takes damage. Screen should flash red or something
				health--;
				zombies[j].dead = true; //This prevents the damage from recurring every millisecond. Not logical though.
			}
			ctx.drawImage(zombieImg, zombies[j].x, zombies[j].y);
		} else {
			if(zombies[j].rot < 1500) {
				ctx.drawImage(zombieDeadImg, zombies[j].x, zombies[j].y);
				zombies[j].rot = zombies[j].rot + 1;
			} else {
				//Removing objects from array fucks up the loop. Not drawing the zombie fixes the immediate
				//problem, but could result in the array getting too large.  We could just dump it between levels and call that good
				//zombies.splice(j, 1)
			}
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
			ctx.drawImage(blood, zombies[j].x  + 100, bullets[i].y); //this should probably exist for longer than 1ms
			if(zombies[j].hp <= 0) {
				zombies[j].dead = true;
			} else {
				zombies[j].hp = zombies[j].hp - randomInt(30, 35); //this damage should be a variable to account for different guns later
			}
			bullets.splice(i, 1);
			bulletNum--;
			//If you kill zombies out of order, this can cause new zombies to overwrite existing ones. Need good way to despawn zombies and prevent zombieNum from blowing up!
			//zombieNum--;
			}
		}
    }
	
	switch(health) { //switch is probably not ideal, but it's functional for now. A loop would probably be better
	case 1:
		ctx.drawImage(heartImg, 50, 550);
		ctx.drawImage(emptyHeartImg, 80, 550);
		ctx.drawImage(emptyHeartImg, 110, 550);
		break;
	case 2:
		ctx.drawImage(heartImg, 50, 550);
		ctx.drawImage(heartImg, 80, 550);
		ctx.drawImage(emptyHeartImg, 110, 550);
		break;
	case 3:
		ctx.drawImage(heartImg, 50, 550);
		ctx.drawImage(heartImg, 80, 550);
		ctx.drawImage(heartImg, 110, 550);
		break;
	case 0:
		clearInterval(gameLoop);
		clearInterval(zombieLoop);
		ctx.drawImage(grayImg,0,0);
		ctx.drawImage(deathBloodImg,0,0);
		ctx.font = "50px Arial";
		ctx.strokeStyle = 'red';
		ctx.strokeText("You died.",500,300);
		break;
	}
}

//Zombie generating loop
function doZombieLoop() {
	createZombie();
}



// Get key presses
function whatKey(evt) {

    switch (evt.keyCode) {
	//Escape key
	case 27:
		if(gamePaused==false) {
			clearInterval(gameLoop);
			clearInterval(zombieLoop);
			ctx.drawImage(grayImg,0,0);
			ctx.font = "50px Arial";
			ctx.strokeStyle = 'red';
			ctx.strokeText("Paused",500,300);
			gamePaused = true;
		} else {
			gameLoop = setInterval(doGameLoop, 1);
			zombieLoop = setInterval(doZombieLoop, 2000);
			gamePaused = false;
		}
	break;
	
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