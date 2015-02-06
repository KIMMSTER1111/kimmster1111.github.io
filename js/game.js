/////////////////////////////////////////////////////////////////////////////////
//    Funky Zombie Killer                                                      //
//    Copyright (C) 2015  Zack Reithmeyer                                      //
//                                                                             //
//    This program is free software: you can redistribute it and/or modify     //
//    it under the terms of the GNU General Public License as published by     //
//    the Free Software Foundation, either version 3 of the License, or        //
//    (at your option) any later version.                                      //
//                                                                             //
//    This program is distributed in the hope that it will be useful,          //
//    but WITHOUT ANY WARRANTY; without even the implied warranty of           //
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            //
//    GNU General Public License for more details.                             //
//                                                                             //
//    You should have received a copy of the GNU General Public License        //
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.    //
/////////////////////////////////////////////////////////////////////////////////


//Action canvas
var c = document.getElementById("map");
var ctx = c.getContext("2d");
var map = new Image();
var heroX = 30;
var heroY = 200;
var hero = new Image();
var bulletImg = new Image();
var zombie1Img = new Image();
var blood = new Image();
var zombieDeadImg = new Image();
var gamePaused = false;
var health = 3;
var heartImg = new Image();
var emptyHeartImg = new Image();
var grayImg = new Image();
var deathBloodImg = new Image();
var moneyBackImg = new Image();
var action = "semi"; //This refers to gun action and keeps track of whether holding down spacebar should keep firing.
var money = 0;
var activeGun = 0;
var cartImg = new Image();
var emptyCartImg = new Image();
var reloadCounter = 0;
var kickCounter = 0;
var kickCD = 0;
var kickImg = new Image();
var kickIcon = new Image();
var kickCDIcon = new Image();
var hints = true; //tooltips, etc for newbies
var flashCounter = 0; //keep track of how long to display damage flash
var flashImg = new Image();
var hintsOn = new Image();
var hintsOff = new Image();
var sounds = true;
var soundOn = new Image();
var soundOff = new Image();
var zombie2Img = new Image();
var zombieCatImg = new Image();
var bgImg = new Image();
var newGameImg = new Image();
var intro1 = new Image();
var intro2 = new Image();
var intro3 = new Image();
var intro4 = new Image();
var intro5 = new Image();
var intro6 = new Image();
var intro7 = new Image();
var intro8 = new Image();
var intro9 = new Image();
var soundStorage = true; //remembers if sound was on before pausing
var level = "LEVEL 1";
var levelCounter = 0;

map.src = 'img/map.png';
blood.src = 'img/blood.png';
hero.src = 'img/hero.png';
bulletImg.src = 'img/bullet.png';
zombie1Img.src = 'img/zombie1.png';
zombieDeadImg.src = 'img/zombieDead.png';
heartImg.src = 'img/heart.png';
emptyHeartImg.src = 'img/emptyHeart.png';
grayImg.src = 'img/gray.png';
deathBloodImg.src = 'img/deathBlood.png';
moneyBackImg.src = 'img/moneyBack.png';
cartImg.src = 'img/cartridge.png';
emptyCartImg.src = 'img/empty.png';
kickImg.src = 'img/heroKick.png';
kickIcon.src = 'img/kickIcon.png';
kickCDIcon.src = 'img/kickIconCD.png';
flashImg.src = 'img/flash.png';
hintsOn.src = 'img/hintsOn.png';
hintsOff.src = 'img/hintsOff.png';
soundOn.src = 'img/soundOn.png';
soundOff.src = 'img/soundOff.png';
zombie2Img.src = 'img/zombie2.png';
zombieCatImg.src = 'img/zombieCat.png';
bgImg.src = 'img/bg.png';
newGameImg.src = 'img/newGame.png';
intro1.src = 'img/intro1.png';
intro2.src = 'img/intro2.png';
intro3.src = 'img/intro3.png';
intro4.src = 'img/intro4.png';
intro5.src = 'img/intro5.png';
intro6.src = 'img/intro6.png';
intro7.src = 'img/intro7.png';
intro8.src = 'img/intro8.png';
intro9.src = 'img/intro9.png';

//Generates a random number between a min and max
function randomInt(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

//Gun class
function gun(name, ammo,maxAmmo, damage, action, purchased, active, reloadSpeed) {
	this.name = name; //string
	this.ammo = ammo; //int
	this.maxAmmo = maxAmmo; //int
	this.damage = damage; //int
	this.action = action; //string
	this.purchased = purchased; //boolean
	this.active = active; //boolean
	this.reloadSpeed = reloadSpeed; //int
}

//Zombie class
function zombie(x,y,dead, rot, hp, speed, type, height) {
	this.type = type;
	this.x = x;
	this.y = y;
	this.dead = dead;
	this.rot = rot; //rot is a timer to determine when to remove the zombie after it dies
	this.hp = hp;
	this.speed = speed;
	this.type = type;
	this.height = height;
}

//Bullet class
function bullet(x,y,exists) {
	this.x = x;
	this.y = y;
	this.exists = exists;
}

//Create arrays to hold zombies and bullets and guns
var guns = [];
var bullets = [];
var zombies = [];

//Keep track of which index to add to in the arrays
var bulletNum = 0;
var zombieNum = 0;

//Create zombie
function createZombie() {
	var zombieRoll = randomInt(1,4);
	if(zombieRoll>2) {
		zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 90, 25, 1, 180);
		zombieNum++;
	} else if (zombieRoll == 2) {
		zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 180, 15, 2, 190);
		zombieNum++;
	} else {
		zombies[zombieNum] = new zombie(1100,randomInt(50, 400),false, 0, 20, 55, 3, 100);
		zombieNum++;
}
}

function startMenu() {
	
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(newGameImg,400,240);
	
	$("#map").click(function(e){

    var x = Math.floor((e.pageX-$("#map").offset().left));
    var y = Math.floor((e.pageY-$("#map").offset().top));
	
	console.log(x,y);
	
	if(x>418 && x < 600 && y >240 && y < 355) {
		ctx.drawImage(intro1, 300, 0);
		setTimeout(function(){ ctx.drawImage(intro2, 300, 0); }, 1500);
		setTimeout(function(){ ctx.drawImage(grayImg,0,0); ctx.drawImage(intro3, 390, 130); }, 3000);
		setTimeout(function(){ ctx.drawImage(intro4, 390, 130); }, 4000);
		setTimeout(function(){ ctx.drawImage(intro5, 390, 130); }, 5000);
		setTimeout(function(){ ctx.drawImage(intro6, 300, 0); }, 6000);
		setTimeout(function(){ ctx.drawImage(intro7, 300, 0); }, 7500);
		setTimeout(function(){ ctx.drawImage(intro8, 300, 0); }, 9000);
		setTimeout(function(){ ctx.drawImage(intro9, 300, 0); }, 10500);
		setTimeout(init, 12000);
	}
	
	});
}

//Initial function to set shit up
function init() {
	ctx.drawImage(map, 0, 0);
	ctx.drawImage(hero, 30,200);
	guns[activeGun] = new gun("SKS",10,10, 30, "semi", true, true, 650);
	levelCounter = 1000;
	gameLoop = setInterval(doGameLoop, 1);
	zombieLoop = setInterval(doZombieLoop, 3500);
	//clearInterval() will stop setInterval
	
	window.addEventListener('keydown', whatKeyDown, true);
	window.addEventListener('keyup', whatKeyUp, true);
	
	$("#map").click(function(e){

    var x = Math.floor((e.pageX-$("#map").offset().left));
    var y = Math.floor((e.pageY-$("#map").offset().top));
	
	console.log(x,y);
	
	if(x>1060 && x < 1100 && y >0 && y < 30) {
		if(hints) {
			hints = false;
		} else {
			hints = true;
		}
	}
	if(x>1061 && x < 1100 && y > 40 && y < 68) {
		if(sounds) {
			sounds = false;
			soundStorage = false;
			document.getElementById("music").pause();
		} else {
			sounds = true;
			soundStorage = true;
			document.getElementById("music").play();
		}
	}
	
 });


	
}


	
//Main loop to listen for keypresses and check for collisions, etc
function doGameLoop() {
	ctx.drawImage(map, 0,0);
    
    if(guns[activeGun].ammo==0 && reloadCounter < guns[activeGun].reloadSpeed) {
		reloadCounter = reloadCounter+2;
		ctx.font = '20px Arial';
		ctx.strokeStyle = 'white';
		ctx.strokeText("reloading...", 420,550);
		if(sounds && reloadCounter ==2) {
			document.getElementById("reload").currentTime = 0;
			document.getElementById("reload").play();
		}
	} else if (guns[activeGun].ammo==0 && reloadCounter >= guns[activeGun].reloadSpeed) {
		guns[activeGun].ammo = guns[activeGun].maxAmmo;
		reloadCounter = 0;
	}
	for(var j = 0; j < zombies.length; j++) {
		if(zombies[j].dead==false){ 
			if(randomInt(1,100)>98 && zombies[j].x > 50) { //Roll 1d100 and move the zombie closer if a 99 or 100 is rolled AND the zombie isn't too close already.
				zombies[j].x = zombies[j].x - zombies[j].speed;
			} 
			if(zombies[j].x < heroX + 130 && zombies[j].y + zombies[j].height > heroY && zombies[j].y < heroY + 200 && kickCounter == 0) {
				health--;
				zombies[j].dead = true; //This prevents the damage from recurring every millisecond. Not logical though.
				if(sounds) {
					document.getElementById("hit").currentTime = 0;
					document.getElementById("hit").play();
				}
				if(health>0) {
					flashCounter = 50;
				} else {
					flashCounter = 0;
				}
			} else if (zombies[j].x < heroX + 250 && zombies[j].y + zombies[j].height + 50 > heroY && zombies[j].y < heroY + 200 && kickCounter > 0) {
				zombies[j].dead = true;
				money = money + randomInt(1,10);
			}
				
			if(zombies[j].x <= 50) {
				//zombie reached left side of screen
				health--;
				zombies[j].dead = true;
				if(sounds) {
					document.getElementById("hit").currentTime = 0;
					document.getElementById("hit").play();
				}
				if(health>0) {
					flashCounter = 50;
				} else {
					flashCounter = 0;
				}
			}
			if(zombies[j].type ==1) {	
				ctx.drawImage(zombie1Img, zombies[j].x, zombies[j].y);
			} else if(zombies[j].type ==2) {
				ctx.drawImage(zombie2Img, zombies[j].x, zombies[j].y);
			} else {
				ctx.drawImage(zombieCatImg, zombies[j].x, zombies[j].y);
			}
		} else {
			if(zombies[j].rot < 1000) {
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
			bullets[i].x += 15;  //This should maybe be a variable to allow for a variety of bullet speeds
			if(bullets[i].x > 1100) {
				bullets[i].exists = false;
				bullets.splice(i, 1);
				bulletNum--;
			}
		}
		for(j = 0; j < zombies.length; j++) {
			if(bullets[i].x > zombies[j].x && bullets[i].y > zombies[j].y && bullets[i].y < zombies[j].y + zombies[j].height && bullets[i].exists && zombies[j].dead ==false) {
			bullets[i].exists = false;
			ctx.drawImage(blood, zombies[j].x  + 50, bullets[i].y); //this should probably exist for longer than 1ms
			if(zombies[j].hp <= 0) {
				zombies[j].dead = true;
				if(sounds) {
					if(zombies[j].type != 3) {
						document.getElementById("kill").currentTime = 0;
						document.getElementById("kill").play();
					} else {
						document.getElementById("catKill").currentTime = 0;
						document.getElementById("catKill").play();
					}
				}
				if(randomInt(1,6)>3) { //roll 1d6 and get money on 4, 5, or 6
					money = money + randomInt(1,10);
				}
			} else {
				zombies[j].hp = zombies[j].hp - randomInt(guns[activeGun].damage-8, guns[activeGun].damage+8); //this damage should be a variable to account for different guns later
			}
			bullets.splice(i, 1);
			bulletNum--;
			//If you kill zombies out of order, this can cause new zombies to overwrite existing ones. Need good way to despawn zombies and prevent zombieNum from blowing up!
			//zombieNum--;
			}
		}
    }
	
	
	if(kickCD > 0) { //kick is on cool
		ctx.drawImage(hero, heroX, heroY);
		ctx.drawImage(kickCDIcon, 900, 540);
		ctx.font = "10px Arial";
		ctx.strokeStyle = 'white';
		ctx.strokeText(((kickCD/1000)*10).toFixed(2),947,535);
		kickCD--;
	} else if (kickCounter > 1) { //currently kicking
		ctx.drawImage(kickImg, heroX, heroY);
		kickCounter--;
	} else if(kickCounter == 1) { //end kick
		ctx.drawImage(kickImg,heroX,heroY);
		kickCD = 2000;
		kickCounter--;
	} else { //normal, kick available
		ctx.drawImage(hero, heroX, heroY);
		ctx.drawImage(kickIcon, 900, 540);
		if(hints) {
			ctx.font = "12px Arial";
			ctx.strokeStyle = 'black';
			ctx.strokeText("press k to kick", 970, 540);
		}
	}
		
		
	
	var ammoCounter = 0;
	for (i = 0; i < guns[activeGun].maxAmmo; i++) {
		if(ammoCounter < guns[activeGun].ammo) {
			ctx.drawImage(cartImg, 300+(ammoCounter*18), 550);
			ammoCounter++;
		} else {
			ctx.drawImage(emptyCartImg,300+(ammoCounter*18), 550);
			ammoCounter++;
		}
	}
	if(guns[activeGun].ammo < guns[activeGun].maxAmmo && guns[activeGun].ammo > 0 && hints) {
		ctx.font = "12px Arial";
		ctx.strokeStyle = 'black';
		ctx.strokeText("press r to reload", 420, 550);
	}
	

	
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
	
	if(hints) {
		ctx.drawImage(hintsOn, 1060, -5);
		ctx.font = '10px arial';
		ctx.strokeStyle = 'white';
		ctx.strokeText("click to turn hints off", 1060, 20);
		ctx.strokeText("use spacebar to shoot", 550, 20);
		ctx.strokeText("press Esc to pause", 250, 20);
		ctx.strokeText("click to toggle sound", 1060, 60);
	} else {
		ctx.drawImage(hintsOff, 1060, -5);
	}
	
	if(sounds) {
		ctx.drawImage(soundOn, 1060, 35);
		
	} else {
		ctx.drawImage(soundOff, 1060, 35);
	}
	
	if(levelCounter > 0) {
		ctx.textAlign="center"; 
		ctx.font = '60px courier';
		ctx.fillStyle = 'red';
		ctx.fillText(level,550,300);
		levelCounter--;
	}
	
	if(flashCounter > 0) {
		ctx.drawImage(flashImg,0,0);
		flashCounter--;
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
	default:
	case 0:
		flashCounter = 0;
		clearInterval(gameLoop);
		clearInterval(zombieLoop);
		ctx.drawImage(grayImg,0,0);
		ctx.drawImage(deathBloodImg,0,0);
		ctx.font = "50px Arial";
		ctx.textAlign="center"; 
		ctx.strokeStyle = 'red';
		ctx.strokeText("You died.",550,300);
		if(sounds) {
			document.getElementById("death").play();
		}
		break;
	}

}

//Zombie generating loop
function doZombieLoop() {
	createZombie();
}

function whatKeyUp(evt) {
	switch (evt.keyCode) {
	case 32: //spacebar
		if(action != "full") { //If not full auto, use keyup to disallow holding spacebar to keep firing.
			fireBullet();
			}
		break;
	case 82: // r
		if(guns[activeGun].ammo < guns[activeGun].maxAmmo) {
			guns[activeGun].ammo = 0;
		}
		break;
	
	case 75: //k
		if(kickCD==0) {
			kickCounter = 75;
			if(sounds) {
				document.getElementById("kick").currentTime = 0;
				document.getElementById("kick").play();
			}
		}
		break;
	}
}
// Get key presses
function whatKeyDown(evt) {

    switch (evt.keyCode) {
	
	case 27: //Escape key
		if(gamePaused==false) {
			clearInterval(gameLoop);
			clearInterval(zombieLoop);
			ctx.drawImage(grayImg,0,0);
			ctx.font = "50px Arial";
			ctx.strokeStyle = 'red';
			ctx.textAlign="center"; 
			ctx.strokeText("Paused",550,300);
			if(sounds) {
				sounds = false;
				document.getElementById("music").pause();
			}
				
			gamePaused = true;
		} else {
			gameLoop = setInterval(doGameLoop, 1);
			zombieLoop = setInterval(doZombieLoop, 2000);
			gamePaused = false;
			if(soundStorage) {
				sounds = true;
				document.getElementById("music").play();
			}
		}
	break;
	
	case 32: //Spacebar
		if(action == "full") { //If full auto, use keydown to allow holding spacebar to keep firing.
			fireBullet();
			}
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
		if (heroX > 320) {
			// If at edge, reset position.
			heroX = 320;
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
	if(guns[activeGun].ammo > 0) {
		bullets[bulletNum] = new bullet(heroX + 172, heroY + 65, true); 
		bulletNum++;
		guns[activeGun].ammo--;
		if(sounds) {
			var sound = document.getElementById("bulletFire");
			sound.currentTime = 0;
			sound.play();
		}
	}
}