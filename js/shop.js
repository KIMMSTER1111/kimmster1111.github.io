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


var shopImg = new Image();
var shopGun = new Image();
var shopHealth = new Image();
var shopDJ = new Image();
var shopDoors = new Image();
var gunDialogOpen = false;
var healthDialogOpen = false;
var funkDialogOpen = false;
var inShop = false;
var shopPaper = new Image();
var moneyBackImg = new Image();
var subsonicImg = new Image();
var extraHeartImg = new Image();
var kickUpgradeImg = new Image();
var subUpgradeImg = new Image();
var shopDialog = new Image();
var shopBall = new Image();

shopBall.src = 'img/shop-ballHighlight.png';
shopDialog.src = 'img/shopDialog.png';
kickUpgradeImg.src = 'img/kickUpgradeIcon.png';
subUpgradeImg.src = 'img/subUpgradeIcon.png';
extraHeartImg.src = 'img/extraHeart.png';
shopPaper.src = 'img/shopPaper.png';
shopHealth.src = 'img/shop-healthHighlight.png';
shopDJ.src = 'img/shop-djHighlight.png';
shopGun.src = 'img/shop-gunHighlight.png';
shopDoors.src = 'img/shopDoors.png';
shopImg.src = 'img/shop.png';
moneyBackImg.src = 'img/moneyBack.png';
subsonicImg.src = 'img/stereo.png';

function shopInit() {
	highlighted = false;
	$("#map").mousemove(function(e){
		var mouseX = Math.floor((e.pageX-$("#map").offset().left));
		var mouseY = Math.floor((e.pageY-$("#map").offset().top));
		ctx.font = '12px Arial';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'start';
		if(mouseX>110&&mouseX<210&&mouseY>30&&mouseY<360 && inShop) { //draw shop
			ctx.drawImage(shopGun,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			for(i=0;i<health;i++) {
				ctx.drawImage(heartImg, 20 + 30*i, 550);
			}
			for(i=health;i<maxHealth;i++) {
				ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
			}
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			ctx.font = "40px Arial";
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'black';
			ctx.fillText("Level", 1000, 500);
			ctx.fillText(level, 1035, 500);
			ctx.strokeText("Level", 1000, 500);
			ctx.strokeText(level, 1035, 500);
			
			highlighted = true;
		} else if(mouseX>405&&mouseX<635&&mouseY>220&&mouseY<510 && inShop) {
			ctx.drawImage(shopHealth,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			for(i=0;i<health;i++) {
				ctx.drawImage(heartImg, 20 + 30*i, 550);
			}
			for(i=health;i<maxHealth;i++) {
				ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
			}
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			ctx.font = "40px Arial";
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'black';
			ctx.fillText("Level", 1000, 500);
			ctx.fillText(level, 1035, 500);
			ctx.strokeText("Level", 1000, 500);
			ctx.strokeText(level, 1035, 500);
			
			highlighted = true;
		} else if(mouseX>750&&mouseY>10&&mouseY<210 && inShop) {
			ctx.drawImage(shopDJ,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			for(i=0;i<health;i++) {
				ctx.drawImage(heartImg, 20 + 30*i, 550);
			}
			for(i=health;i<maxHealth;i++) {
				ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
			}
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			ctx.font = "40px Arial";
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'black';
			ctx.fillText("Level", 1000, 500);
			ctx.fillText(level, 1035, 500);
			ctx.strokeText("Level", 1000, 500);
			ctx.strokeText(level, 1035, 500);
			
			highlighted = true;
		} else if(mouseX>270&&mouseX<400&&mouseY>100&&mouseY<208&&inShop) {
			ctx.drawImage(shopDoors,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			for(i=0;i<health;i++) {
				ctx.drawImage(heartImg, 20 + 30*i, 550);
			}
			for(i=health;i<maxHealth;i++) {
				ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
			}
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			ctx.font = "40px Arial";
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'black';
			ctx.fillText("Level", 1000, 500);
			ctx.fillText(level, 1035, 500);
			ctx.strokeText("Level", 1000, 500);
			ctx.strokeText(level, 1035, 500);
			
			highlighted = true;
		} else if (mouseX>405&&mouseX<497&&mouseY<112&&inShop) {
			ctx.drawImage(shopBall,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			for(i=0;i<health;i++) {
				ctx.drawImage(heartImg, 20 + 30*i, 550);
			}
			for(i=health;i<maxHealth;i++) {
				ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
			}
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			ctx.font = "40px Arial";
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'black';
			ctx.fillText("Level", 1000, 500);
			ctx.fillText(level, 1035, 500);
			ctx.strokeText("Level", 1000, 500);
			ctx.strokeText(level, 1035, 500);
			highlighted = true;
		
		} else if(highlighted && inShop) {
			ctx.drawImage(shopImg,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			for(i=0;i<health;i++) {
				ctx.drawImage(heartImg, 20 + 30*i, 550);
			}
			for(i=health;i<maxHealth;i++) {
				ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
			}
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			ctx.font = "40px Arial";
			ctx.fillStyle = 'red';
			ctx.strokeStyle = 'black';
			ctx.fillText("Level", 1000, 500);
			ctx.fillText(level, 1035, 500);
			ctx.strokeText("Level", 1000, 500);
			ctx.strokeText(level, 1035, 500);
			highlighted = false;
		}
		
		if(mouseX>370&&mouseX<700&&mouseY>54&&mouseY<82&&healthDialogOpen) { //health selected
			if(highlighted==false) {
				ctx.drawImage(gunSelectedImg, 370, 40);
				ctx.drawImage(heartImg, 400, 60);
				highlighted = true;
			}
		} else if(mouseX>370&&mouseX<700&&mouseY>315&&mouseY<365&&healthDialogOpen) { //extra heart selected
			if(highlighted==false) {
				ctx.drawImage(gunSelectedImg, 370, 308);
				ctx.drawImage(extraHeartImg, 400, 322);
				highlighted = true;
			}
		} else if(highlighted && healthDialogOpen) {
			highlighted = false;
			displayHealthDialog();
			
		}
		
		if(mouseX>375&&mouseX<700&&mouseY>54&&mouseY<112&&funkDialogOpen) { //subsonic shockwave selected
			if(highlighted==false) {
				if(subsonicUnlocked==false) {
					ctx.drawImage(gunSelectedImg, 370, 40);
					ctx.drawImage(subsonicImg, 370, 40);
					highlighted = true;
				}
			}
		} else if(mouseX>374&&mouseX<700&&mouseY>325&&mouseY<405&&funkDialogOpen) { //kick CD upgrade highlighted
			if(highlighted==false) {
				ctx.drawImage(gunSelectedImg, 367, 318);
				ctx.drawImage(kickUpgradeImg, 370,325);
				highlighted = true;
			}
		} else if(mouseX>374&&mouseX<700&&mouseY>410&&mouseY<505&&funkDialogOpen) { //sub CD upgrade highlighted
			if(highlighted==false && subsonicUnlocked) {
				ctx.drawImage(gunSelectedImg, 367, 405);
				ctx.drawImage(subUpgradeImg, 370, 410);
				highlighted = true;
			}
		
		}else if(highlighted && funkDialogOpen) {
			highlighted = false;
			displayFunkDialog();
			
		}
		
		
		if(mouseX>370&&mouseX<700&&mouseY>54&&mouseY<82&&gunDialogOpen&&guns[1].purchased==false) { //sks highlighted
			ctx.fillStyle = 'black';
			if(highlighted==false) { //only draw if necessary
				if(guns[1].purchased==false) { //sks
					ctx.drawImage(gunSelectedImg, 370, 30);
					ctx.drawImage(sksImg, 370, 30);
					ctx.fillText("$400", 400, 100);
					highlighted = true;
				}
				if(guns[0].maxAmmo==10) { //g26 upgrade
					ctx.drawImage(g26xImg, 370, 300);
					ctx.fillText("Glock 26 - 33 round magazines.", 445, 340);
				}
				if(guns[1].purchased && guns[1].maxAmmo == 10) { //sks upgrade
					ctx.drawImage(sksxImg, 370, 370);
					ctx.fillText("SKS - 30 round magazines.", 445, 420);
					ctx.fillText("$400", 410, 440);
				}
			}
		} else if(mouseX>370&&mouseX<700&&mouseY>90&&mouseY<186&&gunDialogOpen&&guns[2].purchased==false) { //870 highlighted
			if(highlighted==false) {
				ctx.drawImage(gunSelectedImg, 370, 100);
				ctx.drawImage(r870Img, 370, 105);
				ctx.fillText("Remington 870 - small magazine, slow reload speed.", 435, 140);
				ctx.fillText("00 buckshot spreads and can hit multiple targets.", 435, 155);
				ctx.fillText("$600", 396, 175);
				highlighted=true;
			}
		} else if(mouseX>385&&mouseX<685&&mouseY>315&&mouseY<365&&gunDialogOpen&&guns[0].maxAmmo==10) { //g26 upgrade highlighted
			ctx.fillStyle = 'black';
			if(highlighted==false) { //only draw if necessary
				if(guns[1].purchased==false) { //sks
					ctx.drawImage(sksImg, 370, 30);
					ctx.fillText("$400", 400, 100);
				}
				if(guns[0].maxAmmo==10) { //g26 upgrade
					ctx.drawImage(gunSelectedImg, 370, 310);
					ctx.drawImage(g26xImg, 370, 300);
					ctx.fillText("$200", 410, 360);
					highlighted = true;
				}
				if(guns[1].purchased && guns[1].maxAmmo == 10) { //sks upgrade
					ctx.drawImage(sksxImg, 370, 370);
					ctx.fillText("SKS - 30 round magazines.", 445, 420);
					ctx.fillText("$400", 410, 440);
				}
			}
		} else if(mouseX>380&&mouseX<670&&mouseY>395&&mouseY<435&&gunDialogOpen&&guns[1].purchased&&guns[1].maxAmmo==10) { //sks upgrade highlighted
			ctx.fillStyle = 'black';
			if(highlighted==false) { //only draw if necessary
				if(guns[1].purchased==false) { //sks
					ctx.drawImage(sksImg, 370, 30);
					ctx.fillText("$400", 400, 100);
				}
				if(guns[0].maxAmmo==10) { //g26 upgrade
					ctx.drawImage(g26xImg, 370, 300);
				}
				if(guns[1].purchased && guns[1].maxAmmo == 10) { //sks upgrade
					ctx.drawImage(gunSelectedImg, 370, 375);
					ctx.drawImage(sksxImg, 370, 370);
					ctx.fillText("$400", 410, 440);
					highlighted = true;
				}
			}
	} else if(highlighted&&gunDialogOpen) { //nothing highlighted
		highlighted = false;
		displayGunDialog();
				
			
			
		} 
	}
	);
	
$("#map").click(function(e){

    var x = Math.floor((e.pageX-$("#map").offset().left));
    var y = Math.floor((e.pageY-$("#map").offset().top));
	
	if(x>703&&x<730&&y>18&&y<44&&(gunDialogOpen||healthDialogOpen||funkDialogOpen)) { //close dialog
		gunDialogOpen = false;
		healthDialogOpen = false;
		funkDialogOpen = false;
		inShop = true;
		ctx.drawImage(shopImg,0,0);
		ctx.drawImage(moneyBackImg, 30, 15);
		ctx.font = "20px Arial";
		ctx.fillStyle = 'green';
		ctx.textAlign="end"; 
		ctx.fillText("$", 50, 40);
		ctx.fillText(money, 120, 40);
		
		ctx.font = "40px Arial";
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'black';
	ctx.fillText("Level", 1000, 500);
	ctx.fillText(level, 1035, 500);
	ctx.strokeText("Level", 1000, 500);
	ctx.strokeText(level, 1035, 500);
		
	for(i=0;i<health;i++) {
		ctx.drawImage(heartImg, 20 + 30*i, 550);
	}
	for(i=health;i<maxHealth;i++) {
		ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
	}
	}
	
	if(x>270&&x<400&&y>100&&y<208&&inShop) {
		inShop = false;
		init();
	}
	
	
	if (x>405&&x<497&&y<112&&inShop) {
		setCookie("sksUnlocked", guns[1].purchased, 365);
		setCookie("level",level, 365);
		setCookie("g26MaxAmmo",guns[0].maxAmmo, 365);
		setCookie("sksMaxAmmo",guns[1].maxAmmo, 365);
		setCookie("870Unlocked", guns[2].purchased, 365);
		setCookie("health", health, 365);
		setCookie("maxHealth", maxHealth, 365);
		setCookie("subsonicUnlocked", subsonicUnlocked, 365);
		setCookie("maxKickCD", maxKickCD, 365);
		setCookie("maxSubCD", maxSubCD, 365);
		setCookie("money", money, 365);
	}
	
	if(x>370&&x<700&&y>54&&y<82&&healthDialogOpen) { //heal clicked
		if(health==maxHealth) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you don't need", 440, 280);
			ctx.fillText("to be healed!", 440, 315);
			//alert("you don't need to be healed!"); //alerts suck, this should display some sexy pngs
		} else if(money<50) { //insufficient funds
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
		
			//alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - 50;
			health = maxHealth;
			displayHealthDialog();
		}
	}
	
	if(x>370&&x<700&&y>315&&y<365&&healthDialogOpen) { //health upgrade clicked
		if(money<(200*maxHealth)) { //insufficient funds
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
		
			//alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - (200*maxHealth);
			maxHealth = maxHealth + 1;
			health = health + 1;
			displayHealthDialog();
		}
	}
	
	if(x>375&&x<700&&y>54&&y<112&&funkDialogOpen) { 
		if(subsonicUnlocked) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you have already", 440, 280);
			ctx.fillText("purchased this.", 440, 315);
			
			//alert("you already bought this, bitch!"); //alerts suck, this should display some sexy pngs
		} else if(money<750) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
			
			//alert("come back with some more money, puta"); //alerts suck, this should display some sexy pngs
		} else {
			money = money - 750;
			subsonicUnlocked = true;
			displayFunkDialog();
		}
	}
	if(x>374&&x<700&&y>325&&y<405&&funkDialogOpen) {
		if(money<500) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
			//alert("you can't afford this, cyka"); //alerts suck, this should display some sexy pngs
		} else {
			money = money - 500;
			maxKickCD = maxKickCD/2;
			displayFunkDialog();
		}
	}
	
	if(x>374&&x<700&&y>410&&y<505&&funkDialogOpen) {
		if(subsonicUnlocked == false) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you must buy", 440, 280);
			ctx.fillText("SubShock before", 440, 315);
			ctx.fillText("you can upgrade.", 440, 350);
			
			//alert("you gotta unlock Subsonic Shockwave before you can upgrade it!");
		} else if(money<500) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
			
			//alert("you can't afford this, cyka"); //alerts suck, this should display some sexy pngs
		} else {
			money = money - 500;
			maxSubCD = maxSubCD/2;
			displayFunkDialog();
		}
	}
	
	if(x>370&&x<700&&y>54&&y<82&&gunDialogOpen) { //sks clicked
		if(guns[1].purchased) { //sks already owned
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you already own", 440, 280);
			ctx.fillText("this gun!", 440, 315);
		
			//alert("you already own this gun!"); //alerts suck, this should display some sexy pngs
		} else if(money<400) { //insufficient funds
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
		
			//alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - 400;
			guns[1].purchased = true;
			displayGunDialog();
		}
	}
	if(x>370&&x<700&&y>90&&y<186&&gunDialogOpen) { //870 clicked
		if(guns[2].purchased) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you already own", 440, 280);
			ctx.fillText("this gun!", 440, 315);
			
			//alert("you already own this!");
		} else if(money<600) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
			
			//alert("you ain't got enough cheese, biznatch!");
		} else {
			money = money - 600;
			guns[2].purchased = true;
			displayGunDialog();
		}
	}
	if(x>385&&x<685&&y>315&&y<365&&gunDialogOpen) { //g26 upgrade clicked
		if(guns[0].maxAmmo==33) { //already owned
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you already own", 440, 280);
			ctx.fillText("this upgrade!", 440, 315);
			
			//alert("you have already purchased this upgrade!"); //alerts suck, this should display some sexy pngs
		} else if(money<200) { //insufficent funds
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
			
			//alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - 200;
			guns[0].maxAmmo = 33;
			guns[0].ammo = 33;
			displayGunDialog();
		}
	}
	
	if(x>380&&x<670&&y>395&&y<435&&gunDialogOpen) { //sks upgrade clicked
		if(guns[1].purchased==false) { //sks not purchased
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you must buy", 440, 280);
			ctx.fillText("the SKS before", 440, 315);
			ctx.fillText("you can upgrade.", 440, 350);
			
			//alert("you need to purchase the SKS before you can you upgrade it!");
		} else if(guns[1].maxAmmo == 30) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("you already own", 440, 280);
			ctx.fillText("this upgrade!", 440, 315);
			
			//alert("you have already purchased this upgrade!");
		} else if(money<400) {
			ctx.drawImage(shopDialog, 400, 225);
			ctx.fillStyle = 'black';
			ctx.font = "30px Arial";
			ctx.fillText("insufficient", 440, 280);
			ctx.fillText("funds.", 440, 315);
			
			//alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - 400;
			guns[1].maxAmmo = 30;
			guns[1].ammo = 30;
			displayGunDialog();
		}
	}
	if(x>110&&x<210&&y>30&&y<360 && inShop) {
		inShop = false;
		gunDialogOpen = true;
		displayGunDialog();
		
	} else if(x>405&&x<635&&y>220&&y<510 && inShop) {
		inShop = false;
		healthDialogOpen = true;
		displayHealthDialog();
	} else if(x>750&&y>10&&y<210 && inShop) {
		inShop = false;
		funkDialogOpen = true;
		displayFunkDialog();
	}
} );
}

function shop() {
	inShop = true;
	highlighted = false;
	ctx.drawImage(shopImg,0,0);
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
	ctx.font = "40px Arial";
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'black';
	ctx.fillText("Level", 1000, 500);
	ctx.fillText(level, 1035, 500);
	ctx.strokeText("Level", 1000, 500);
	ctx.strokeText(level, 1035, 500);
	
	for(i=0;i<health;i++) {
		ctx.drawImage(heartImg, 20 + 30*i, 550);
	}
	for(i=health;i<maxHealth;i++) {
		ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
	}
	if(sounds) {
		document.getElementById("music").pause();
		document.getElementById("altMusic").play();
		
	}
}

function displayGunDialog() {
	ctx.drawImage(shopPaper, 350, 0);
	ctx.font = '12px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'start';
	ctx.fillText("Guns", 530, 50);
	ctx.fillText("Upgrades", 527, 310);
	if(guns[1].purchased) {
		ctx.fillStyle = 'gray';
	}
	ctx.drawImage(sksImg, 370, 30);
	ctx.fillText("SKS - medium clip size, medium reload speed,", 445, 70);
	ctx.fillText("high damage.", 445, 85);
	ctx.fillText("$400", 400, 100);	
	if(guns[2].purchased) {
		ctx.fillStyle = 'gray';
	} else {
		ctx.fillStyle = 'black';
	}
	ctx.drawImage(r870Img, 370, 105);
	ctx.fillText("Remington 870 - small magazine, slow reload speed.", 435, 140);
	ctx.fillText("00 buckshot spreads and can hit multiple targets.", 435, 155);
	ctx.fillText("$600", 396, 175);
	
	if(guns[0].maxAmmo!=10) {
		ctx.fillStyle = 'gray';
	} else{
		ctx.fillStyle = 'black';
	}
	ctx.drawImage(g26xImg, 370, 300);
	ctx.fillText("Glock 26 - 33 round magazines.", 445, 340);
	ctx.fillText("$200", 410, 360);
	if(guns[1].purchased == false || guns[1].maxAmmo == 30) { //sks not yet purchased or upgrade purchased
		ctx.fillStyle = 'gray';
	} else {
		ctx.fillStyle = 'black';
	}
	ctx.drawImage(sksxImg, 370, 370);
	ctx.fillText("SKS - 30 round magazines.", 445, 420);
	ctx.fillText("$400", 410, 440);
	
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
	
	for(i=0;i<health;i++) {
		ctx.drawImage(heartImg, 20 + 30*i, 550);
	}
	for(i=health;i<maxHealth;i++) {
		ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
	}
	ctx.font = "40px Arial";
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'black';
	ctx.fillText("Level", 1000, 500);
	ctx.fillText(level, 1035, 500);
	ctx.strokeText("Level", 1000, 500);
	ctx.strokeText(level, 1035, 500);
}

function displayHealthDialog() {
	ctx.drawImage(shopPaper, 350, 0);
	ctx.font = '12px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'start';
	ctx.fillText("Heal", 530, 50);
	ctx.fillText("Upgrades", 527, 310);
	ctx.drawImage(heartImg, 400, 60);
	ctx.fillText("Full Heal - Recover all lost hearts.", 445, 74);
	ctx.fillText("$", 385, 100);	
	ctx.fillText(50, 405, 100);
	
	ctx.drawImage(extraHeartImg, 400, 322);
	ctx.fillText("Extra Heart - Increase your ability to", 445, 335);
	ctx.fillText("take damage in battle.", 445, 350);
	ctx.fillText("$", 385, 360);	
	ctx.fillText(200*maxHealth, 405, 360);
	
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
	
	for(i=0;i<health;i++) {
		ctx.drawImage(heartImg, 20 + 30*i, 550);
	}
	for(i=health;i<maxHealth;i++) {
		ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
	}
	ctx.font = "40px Arial";
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'black';
	ctx.fillText("Level", 1000, 500);
	ctx.fillText(level, 1035, 500);
	ctx.strokeText("Level", 1000, 500);
	ctx.strokeText(level, 1035, 500);
}

function displayFunkDialog() {
	ctx.drawImage(shopPaper, 350, 0);
	ctx.font = '12px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'start';
	ctx.fillText("Abilities", 530, 50);
	ctx.fillText("Upgrades", 527, 310);
	ctx.drawImage(subsonicImg, 370, 40);
	ctx.drawImage(kickUpgradeImg, 370, 325);
	ctx.drawImage(subUpgradeImg, 370, 410);
	if(subsonicUnlocked) {
		ctx.fillStyle = 'gray';
	} else {
		ctx.fillStyle = 'black';
	}
	ctx.fillText("Subsonic Shockwave - Push back zombies with", 445, 80);
	ctx.fillText("some bass from your sound system.", 445, 95);
	ctx.fillText("$750", 395, 120);	
	
	ctx.fillStyle = 'black';
	ctx.fillText("Reduce Kick Cooldown - Use Disco Kick", 445, 350);
	ctx.fillText("twice as frequently.", 445, 365);
	ctx.fillText("$500", 385, 400);	
	
	if(subsonicUnlocked) {
		ctx.fillStyle = 'black';
	} else {
		ctx.fillStyle = 'gray';
	}
	ctx.fillText("Reduce Sub Shock Cooldown - Use Sub Shock", 445, 435);
	ctx.fillText("twice as frequently.", 445, 450);
	ctx.fillText("$500", 385, 490);	
	
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
	
	for(i=0;i<health;i++) {
		ctx.drawImage(heartImg, 20 + 30*i, 550);
	}
	for(i=health;i<maxHealth;i++) {
		ctx.drawImage(emptyHeartImg, 20 + 30*i, 550);
	}
	ctx.font = "40px Arial";
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'black';
	ctx.fillText("Level", 1000, 500);
	ctx.fillText(level, 1035, 500);
	ctx.strokeText("Level", 1000, 500);
	ctx.strokeText(level, 1035, 500);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
} 