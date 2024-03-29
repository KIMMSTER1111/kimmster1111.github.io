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


var c = document.getElementById("map");
var ctx = c.getContext("2d");
var map = new Image();
var heroX = 80;
var heroY = 200;
var heroG26 = new Image();
var bulletImg = new Image();
var zombie1Img = new Image();
var blood = new Image();
var zombieDeadImg = new Image();
var gamePaused = false;
var heartImg = new Image();
var emptyHeartImg = new Image();
var grayImg = new Image();
var deathBloodImg = new Image();
var activeGun = 0;
var cart762Img = new Image(); //javascript won't allow variable names beginning with numbers
var emptyCart762Img = new Image(); //fuck javascript
var cart9mmImg = new Image();
var emptyCart9mmImg = new Image();
var reloadCounter = 0;
var kickCounter = 0;
var kickCD = 0;
var maxKickCD = 2000;
var kickImg = new Image();
var kickIcon = new Image();
var kickCDIcon = new Image();
var hints = true; //tooltips, etc for newbies
var flashCounter = 0; //keep track of how long to display damage flash
var flashImg = new Image();
var hintsOn = new Image();
var hintsOff = new Image();
var zombie2Img = new Image();
var zombieCatImg = new Image();
var level = 1;
var levelCounter = 0;
var heroSKS = new Image();
var subIcon = new Image();
var subIcon = new Image();
var subCDIcon = new Image();
var subCounter = 0;
var subCD = 0;
var maxSubCD = 2000;
var subHero = new Image();
var levelTimer;
var zombie3 = new Image();
var zombie35 = new Image();
var shot = [];
var shotImg = new Image();
var r870Img = new Image();
var hero870 = new Image();
var shell12 = new Image();
var shell12empty = new Image();
var pumpCounter = 0;

shell12.src = 'img/12shell.png';
shell12empty.src = 'img/12empty.png';
hero870.src = 'img/hero870.png';
r870Img.src = 'img/870.png';
shotImg.src = 'img/shotPellet.png';
zombie3.src = 'img/zombie3.png';
zombie35.src = 'img/zombie3.5.png';
subHero.src = 'img/heroShock.png';
subIcon.src = 'img/subIcon.png';
subCDIcon.src = 'img/subIconCD.png';
heroSKS.src = 'img/heroSKS.png';
map.src = 'img/map.png';
blood.src = 'img/blood.png';
heroG26.src = 'img/heroG26.png';
bulletImg.src = 'img/bullet.png';
zombie1Img.src = 'img/zombie1.png';
zombieDeadImg.src = 'img/zombieDead.png';
heartImg.src = 'img/heart.png';
emptyHeartImg.src = 'img/emptyHeart.png';
grayImg.src = 'img/gray.png';
deathBloodImg.src = 'img/deathBlood.png';
cart762Img.src = 'img/762cart.png';
emptyCart762Img.src = 'img/762empty.png';
cart9mmImg.src = 'img/9mmCart.png';
emptyCart9mmImg.src = 'img/9mmEmpty.png';
kickImg.src = 'img/heroKick.png';
kickIcon.src = 'img/kickIcon.png';
kickCDIcon.src = 'img/kickIconCD.png';
flashImg.src = 'img/flash.png';
hintsOn.src = 'img/hintsOn.png';
hintsOff.src = 'img/hintsOff.png';
zombie2Img.src = 'img/zombie2.png';
zombieCatImg.src = 'img/zombieCat.png';


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
var bullets = [];
var zombies = [];

//Keep track of which index to add to in the arrays
var bulletNum = 0;
var zombieNum = 0;

//Create zombie
function createZombie() {
	if(level<3){
		zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 80, 30, 1, 180);
		zombieNum++;
		
	} else if(level>=3 && level <= 5) {
		var zombieRoll = randomInt(1,5);
		if(zombieRoll>2) {
			zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 80, 30, 1, 180);
			zombieNum++;
		} else if (zombieRoll == 2) {
			zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 190, 15, 2, 190);
			zombieNum++;
		} else if(zombieRoll == 1) {
			zombies[zombieNum] = new zombie(1100,randomInt(50, 400),false, 0, 30, 75, 3, 100);
			zombieNum++;
		}

	} else {
		var zombieRoll = randomInt(1,5);
		if(zombieRoll>3) {
			zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 80, 30, 1, 180);
			zombieNum++;
		} else if (zombieRoll == 2) {
			zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 190, 15, 2, 190);
			zombieNum++;
		} else if(zombieRoll == 3) {
			zombies[zombieNum] = new zombie(1100,randomInt(50, 400),false, 0, 30, 75, 3, 100);
			zombieNum++;
		} else {
			zombies[zombieNum] = new zombie(1100,randomInt(0, 400),false, 0, 190, 10, 4, 190);
			zombieNum++;
		}
	}
}


//Initial function to set shit up
function init() {
	zombieNum = 0;
	zombies = [];
	bulletNum = 0;
	bullets = [];
	kickCD = 0;
	guns[activeGun].ammo = guns[activeGun].maxAmmo;
	ctx.drawImage(map, 0, 0);
	ctx.drawImage(heroG26, 30,200);
	levelCounter = 500;
	levelTimer = 5000 + level*500;
	createZombie;
	gameLoop = setInterval(doGameLoop, 1);
	if(level<12) {
		zombieLoop = setInterval(doZombieLoop, 3500-level*270);
	} else {
		zombieLoop = setInterval(doZombieLoop, 300);
	}
	//clearInterval() will stop setInterval
	
	window.addEventListener('keydown', whatKeyDown, true);
	window.addEventListener('keyup', whatKeyUp, true);
	
	if(sounds) {
		document.getElementById("altMusic").pause();
		document.getElementById("music").play();
		
	}
}

	
//Main loop to listen for keypresses and check for collisions, etc
function doGameLoop() {
	ctx.drawImage(map, 0,0); //draw map
	if(pumpCounter>0) { //check if you're in the middle of pumping? wtf is this noise?
		pumpCounter--;
	}
    checkIfReloading(); //check if reloading and if so, increment counter OR discontinue counter if end is reached

	moveZombies(); //loop through zombies and move them or cause damage if they are at hero

	moveBullets(); //loop through bullets and move them or remove and damage zombies if there is a collision

	moveShot(); //loop through shot pellets and handle similarly to bullets, but they have y-axis velocity
	
	drawHero(); //draw the hero
	
	drawAmmoBar(); //draw the ammo bar at the bottom of screen based on rounds in mag and total mag capacity
	
	drawMoneyBar(); //draw money bar based on hero's cash
	
	drawHints(); //write the hints about what buttons and keys do what if hints are turned on

	drawSoundIcon(); //draw appropriate icon depending on if sound is on or off
	
	drawLevelLabel(); //write the level number if at beginning of level
	
	drawDamageFlash(); //draw damage flash if hero took damage this cycle
	
	checkIfDead(); //if dead, present new game or load game (if available) option(s)
	
	drawGunBar(); //draw available guns and highlight the selected one
	
	drawTimer(); //draw the time until level is over
	
}

//Zombie generating loop
function doZombieLoop() {
	createZombie();
}

function whatKeyUp(evt) {
	switch (evt.keyCode) {
	case 32: //spacebar
		if(guns[activeGun].action != "full") { //If not full auto, use keyup to disallow holding spacebar to keep firing.
			if(pumpCounter==0) {
				if(guns[activeGun].action=="pump") {
					pumpCounter=80;
				}
			fireBullet();
			}
			}
		break;
	case 82: // r
		if(guns[activeGun].ammo < guns[activeGun].maxAmmo) {
			guns[activeGun].ammo = 0;
		}
		break;
	
	case 75: //k
		if(kickCD==0&&kickCounter==0) {
			kickCounter = 75;
			if(sounds) {
				document.getElementById("kick").currentTime = 0;
				document.getElementById("kick").play();
			}
		}
		break;
	
	
	case 83: //s
		if(subCD==0&&subCounter==0&&subsonicUnlocked) {
			subCounter = 80;
			if(sounds) {
				document.getElementById("bass").currentTime = 0;
				document.getElementById("bass").play();
			}
			for(i=0;i<zombies.length;i++) {
				zombies[i].x = zombies[i].x + 180;
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
			ctx.font = "14px Arial";
			ctx.textAlign = "start";
			ctx.fillStyle = '#BCBCBC';
			for(i=0;i<guns.length;i++) {
				if(guns[i].purchased == true) {
				switch(guns[i].name) {
					case "G26":
					if(guns[i].maxAmmo==10) {
						ctx.fillText("semi-automatic subcompact handgun. double stack magazine holds ten 9mm rounds.", 100, 110 + 75*i);
					} else {
						ctx.fillText("semi-automatic subcompact handgun. extended magazine holds thirty three 9mm rounds.", 100, 110 + 75*i);
					}
					break;
					case "SKS":
					if(guns[i].maxAmmo==10) {
						ctx.fillText("semi-automatic rifle converted to bullpup config. clip holds ten 7.62x39mm rounds.", 100, 110 + 75*i);
					} else {
						ctx.fillText("semi-automatic rifle converted to bullpup config. Tapco magazine holds thirty 7.62x39mm rounds.", 100, 110 + 75*i);
					}
					break;
					case "870":
						ctx.fillText("pump action shotgun. tube magazine holds four 12 gauge shells.", 100, 110 + 75*i);
					break;
				}
				}
			}
			
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
		if(guns[activeGun].action == "full") { //If full auto, use keydown to allow holding spacebar to keep firing.
			fireBullet();
			}
	break;

	// Left arrow.
	case 37:
		heroX = heroX - 30;
		if (heroX < 80) {
			// If at edge, reset position.
			heroX = 80;
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
		
	// 1
	case 49:
		if(activeGun != 0 && reloadCounter == 0) {
			guns[activeGun].active = false;
			activeGun = 0;
			guns[activeGun].active = true;
		}
		break;
		
	// 2
	case 50:
		if(guns[1].purchased) {
			if(activeGun != 1 && reloadCounter == 0) {
				guns[activeGun].active = false;
				activeGun = 1;
				guns[activeGun].active = true;
			}
		}
		break;
	// 3
	case 51:
		if(guns[2].purchased) {
			if(activeGun != 2 && reloadCounter == 0) {
				guns[activeGun].active = false;
				activeGun = 2;
				guns[activeGun].active = true;
			}
		}
		break;
	}
	
}

function fireBullet() {
	if(guns[activeGun].name == "870") {
		if(guns[activeGun].ammo > 0) {
			for(i = 0;i<9;i++) {
				shot[i] = new bullet(heroX + 180, heroY + 82, true);
			}
			guns[activeGun].ammo--;
			if(sounds) {
				var sound = document.getElementById("bulletFire");
				sound.currentTime = 0;
				sound.play();
				setTimeout(function(){document.getElementById("pump").currentTime = 0; document.getElementById("pump").play(); }, 90);
			}
		}
	} else {
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
}

function drawHero() {
	ctx.textAlign="end"; 
	if(kickCounter == 0 && subCounter == 0) { //not kicking or shocking
		switch(guns[activeGun].name) {
		case "G26":
			ctx.drawImage(heroG26, heroX, heroY);
			break;
		case "SKS":
			ctx.drawImage(heroSKS, heroX, heroY);
			break;
		case "870":
			ctx.drawImage(hero870, heroX, heroY);
			break;
		}
	} else if (kickCounter > 1) { //currently kicking
		ctx.drawImage(kickImg, heroX, heroY);
		kickCounter--;
	} else if(kickCounter == 1) { //end kick
		ctx.drawImage(kickImg,heroX,heroY);
		kickCD = maxKickCD;
		kickCounter--;
	} else if(subCounter > 1) { //currently shocking
		ctx.drawImage(subHero, heroX, heroY);
		subCounter--;
	} else if(subCounter == 1) { //end shock
		ctx.drawImage(subHero, heroX, heroY);
		subCD = maxSubCD;
		subCounter--;
	}
	if(kickCD > 0) {
		ctx.drawImage(kickCDIcon, 900, 540);
		ctx.font = "10px Arial";
		ctx.strokeStyle = 'white';
		ctx.strokeText(((kickCD/1000)*10).toFixed(2),947,535);
		kickCD--;
	} else {
		ctx.drawImage(kickIcon, 900, 540);
		if(hints) {
			ctx.font = "12px Arial";
			ctx.strokeStyle = 'black';
			ctx.strokeText("press k to kick", 965, 540);
		}
	}
	if(subsonicUnlocked) {
		if(subCD > 0) {
			ctx.drawImage(subCDIcon, 970, 538);
			ctx.font = "10px Arial";
			ctx.strokeStyle = 'white';
			ctx.strokeText(((subCD/1000)*10).toFixed(2),1020,535);
			subCD--;
		} else {
		ctx.drawImage(subIcon, 970, 538);
		if(hints) {
			ctx.font = "12px Arial";
			ctx.strokeStyle = 'black';
			ctx.strokeText("press s to shock", 1060, 540);
		}
		}
	}
}

function checkIfReloading() {
	    if(guns[activeGun].ammo==0 && reloadCounter < guns[activeGun].reloadSpeed) {
		reloadCounter = reloadCounter+2;
		ctx.font = '20px Arial';
		ctx.strokeStyle = 'white';
		ctx.strokeText("reloading...", 420,550);
		if(sounds && reloadCounter ==2) {
			switch(guns[activeGun].name) {
				case "G26":
					document.getElementById("handgunReload").currentTime = 0;
					document.getElementById("handgunReload").play();
					break;
				case "SKS":
					document.getElementById("rifleReload").currentTime = 0;
					document.getElementById("rifleReload").play();
					break;
				case "870":
					document.getElementById("shotgunReload").currentTime = 0;
					document.getElementById("shotgunReload").play();
					break;
			}
		}
	} else if (guns[activeGun].ammo==0 && reloadCounter >= guns[activeGun].reloadSpeed) {
		guns[activeGun].ammo = guns[activeGun].maxAmmo;
		reloadCounter = 0;
	}
}

function moveZombies() {
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
				money = money + randomInt(3 + 2*level, 18 + 2*level);
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
			} else if(zombies[j].type==3) {
				ctx.drawImage(zombieCatImg, zombies[j].x, zombies[j].y);
			} else if(zombies[j].type==4) {
				ctx.drawImage(zombie3, zombies[j].x, zombies[j].y);
			} else if(zombies[j].type==5) {
				ctx.drawImage(zombie35, zombies[j].x, zombies[j].y);
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
}

function moveBullets() {
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
				if(zombies[j].type==4) {
					zombies[j].type=5;
					zombies[j].hp=145;
					zombies[j].speed=60;
				} else {
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
					money += randomInt(3+2*level,2*level+18);
				
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
}

function moveShot() {
	if(shot.length > 0) { //shotgun loop (might blow everything up/slow the game down unacceptably)
		for(i=0;i<shot.length;i++) {
			if(shot[i].exists) {
				ctx.drawImage(shotImg, shot[i].x, shot[i].y);
				shot[i].x += 15;
				switch(i) {
					case 0:
						shot[i].y = shot[i].y - 4;
						break;
					case 1:
						shot[i].y = shot[i].y - 3;
						break;
					case 2:
						shot[i].y = shot[i].y - 2;
						break;
					case 3:
						shot[i].y = shot[i].y - 1;
						break;
					case 5:
						shot[i].y = shot[i].y + 1;
						break;
					case 6:
						shot[i].y = shot[i].y + 2;
						break;
					case 7:
						shot[i].y = shot[i].y + 3;
						break;
					case 8:
						shot[i].y = shot[i].y + 4;
						break;
				}
				if(shot[i].x > 1100) {
					shot[i].exists = false;
					shot.splice(i, 1);
				}
				
				for(j = 0; j < zombies.length; j++) {
			if(shot[i].x > zombies[j].x && shot[i].y > zombies[j].y && shot[i].y < zombies[j].y + zombies[j].height && shot[i].exists && zombies[j].dead ==false) {
			shot[i].exists = false;
			ctx.drawImage(blood, zombies[j].x  + 50, shot[i].y); //this should probably exist for longer than 1ms
			if(zombies[j].hp <= 0) {
				if(zombies[j].type==4) {
					zombies[j].type=5;
					zombies[j].hp=145;
					zombies[j].speed=60;
				} else {
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
					money += randomInt(3+level*2,2*level+18);
				}
			} else {
				zombies[j].hp = zombies[j].hp - randomInt(guns[activeGun].damage-8, guns[activeGun].damage+8); //this damage should be a variable to account for different guns later
			}
			shot.splice(i, 1);
			}
		}
				
				
			}
		}
	}
}

function drawAmmoBar() {
	var ammoCounter = 0;
	for (i = 0; i < guns[activeGun].maxAmmo; i++) {
		if(ammoCounter < guns[activeGun].ammo) {
			switch(guns[activeGun].name) {
				case "G26":
					ctx.drawImage(cart9mmImg, 250+(ammoCounter*18), 550);
					break;
				case "SKS":
					ctx.drawImage(cart762Img, 250+(ammoCounter*18), 550);
					break;
				case "870":
					ctx.drawImage(shell12, 250+(ammoCounter*24), 550);
					break;
			}
			ammoCounter++;
		} else {
			switch(guns[activeGun].name) {
				case "G26":
					ctx.drawImage(emptyCart9mmImg, 250+(ammoCounter*18), 550);
					break;
				case "SKS":
					ctx.drawImage(emptyCart762Img, 250+(ammoCounter*18), 550);
					break;
				case "870":
					ctx.drawImage(shell12empty, 250+(ammoCounter*24), 550);
					break;
			}
			ammoCounter++;
		}
	}
	if(guns[activeGun].ammo < guns[activeGun].maxAmmo && guns[activeGun].ammo > 0 && hints) {
		ctx.font = "12px Arial";
		ctx.strokeStyle = 'black';
		ctx.strokeText("press r to reload", 420, 550);
	}
}

function drawMoneyBar() {
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
}

function drawHints() {
	if(hints) {
		ctx.drawImage(hintsOn, 1060, -5);
		ctx.font = '10px arial';
		ctx.strokeStyle = 'white';
		ctx.strokeText("click to turn hints off", 1060, 20);
		ctx.strokeText("use spacebar to shoot", 740, 20);
		ctx.strokeText("press Esc to pause", 250, 20);
		ctx.strokeText("click to toggle sound", 1060, 60);
		ctx.strokeText("press the number of the gun you want to use", 230, 65);
	} else {
		ctx.drawImage(hintsOff, 1060, -5);
	}
}

function drawSoundIcon() {
	if(sounds) {
		ctx.drawImage(soundOn, 1060, 35);
		
	} else {
		ctx.drawImage(soundOff, 1060, 35);
	}
}

function drawLevelLabel() {
	if(levelCounter > 0) {
		ctx.textAlign="center"; 
		ctx.font = '60px courier';
		ctx.fillStyle = 'red';
		ctx.fillText("LEVEL",500,300);
		ctx.fillText(level,620,300);
		levelCounter--;
	}
}

function drawDamageFlash() {
	if(flashCounter > 0) {
		ctx.drawImage(flashImg,0,0);
		flashCounter--;
	}
}

function checkIfDead() {
	if(health<=0) {
		var loadCheck = getCookie("level");
		flashCounter = 0;
		clearInterval(gameLoop);
		clearInterval(zombieLoop);
		ctx.drawImage(grayImg,0,0);
		ctx.drawImage(deathBloodImg,0,0);
		ctx.font = "50px Arial";
		ctx.textAlign="center"; 
		ctx.strokeStyle = 'red';
		ctx.strokeText("You died.",550,300);
		ctx.drawImage(newGameImg,250,400);
		ctx.drawImage(loadGameImg,650, 400);
		if(loadCheck=="") {
			ctx.drawImage(grayButton, 650,400);
		}
		started = false;
		if(sounds) {
			document.getElementById("death").play();
		}
	} else {
		for(i=0;i<health;i++) {
			ctx.drawImage(heartImg, 20 + 30*i, 550);
		}
		for(i=health;i<maxHealth;i++) {
			ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
		}
	}
}

function drawGunBar() {
	for(i=0; i<guns.length; i++) {
		if(guns[i].purchased == true) {
		ctx.drawImage(gunBG, 10, 65+75*i);
		ctx.font = "12px Arial";
		ctx.textAlign="center"; 
		ctx.fillStyle = 'black';
		if(guns[i].active) {
			ctx.drawImage(gunSelectedImg, 10, 65+75*i);
		}
		switch(guns[i].name) {
			case "G26":
				ctx.drawImage(g26Img, 10, 65+75*i);
				ctx.fillText("Glock 26",45,130+75*i);
				break;
			case "SKS":
				ctx.drawImage(sksImg, 10, 65+75*i);
				ctx.fillText("SKS",45,130+75*i);
				break;
			case "870":
				ctx.drawImage(r870Img, 10, 65+75*i);
				ctx.fillText("870",45,130+75*i);
				break;
		}
		ctx.font = "bold 22px Arial";
		ctx.fillText(i+1,24,85+75*i);
		}
	}
}

function drawTimer() {
	if(levelTimer > 0) {
		ctx.textAlign="center"; 
		ctx.font = "30px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText(((levelTimer/1000)*10).toFixed(2),550,40);
		levelTimer--;
	} else {
		clearInterval(gameLoop);
		clearInterval(zombieLoop);
		ctx.font = '60px courier';
		ctx.fillStyle = 'red';
		ctx.fillText("LEVEL COMPLETE",550,300);
		setTimeout(shop, 1400);
		level++;
	}
}