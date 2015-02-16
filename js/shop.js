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
var shopImg = new Image();
var shopGun = new Image();
var shopHealth = new Image();
var shopDJ = new Image();
var shopDoors = new Image();
var gunDialogOpen = false;
var healthDialogOpen = false;
var inShop = false;
var shopPaper = new Image();
var moneyBackImg = new Image();

shopPaper.src = 'img/shopPaper.png';
shopHealth.src = 'img/shop-healthHighlight.png';
shopDJ.src = 'img/shop-djHighlight.png';
shopGun.src = 'img/shop-gunHighlight.png';
shopDoors.src = 'img/shopDoors.png';
shopImg.src = 'img/shop.png';
moneyBackImg.src = 'img/moneyBack.png';

function shop() { //can't yet buy anything or truly interact with the shop yet. but onMouseOver is working, which is cool.
	inShop = true;
	highlighted = false;
	ctx.drawImage(shopImg,0,0);
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
	$("#map").mousemove(function(e){
		var mouseX = Math.floor((e.pageX-$("#map").offset().left));
		var mouseY = Math.floor((e.pageY-$("#map").offset().top));
		ctx.font = '12px Arial';
		ctx.fillStyle = 'black';
		ctx.textAlign = 'start';
		if(mouseX>110&&mouseX<210&&mouseY>30&&mouseY<360 && inShop) { //draw shop
			ctx.drawImage(shopGun,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			highlighted = true;
		} else if(mouseX>405&&mouseX<635&&mouseY>220&&mouseY<510 && inShop) {
			ctx.drawImage(shopHealth,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			highlighted = true;
		} else if(mouseX>750&&mouseY>10&&mouseY<210 && inShop) {
			ctx.drawImage(shopDJ,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			highlighted = true;
		} else if(mouseX>270&&mouseX<400&&mouseY>100&&mouseY<208&&inShop) {
			ctx.drawImage(shopDoors,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			highlighted = true;
		} else if(highlighted && inShop) {
			ctx.drawImage(shopImg,0,0);
			ctx.drawImage(moneyBackImg, 30, 15);
			ctx.font = "20px Arial";
			ctx.fillStyle = 'green';
			ctx.textAlign="end"; 
			ctx.fillText("$", 50, 40);
			ctx.fillText(money, 120, 40);
			highlighted = false;
		}
		
		if(mouseX>370&&mouseX<700&&mouseY>54&&mouseY<82&&healthDialogOpen) { //extra heart selected
			if(highlighted==false) {
				ctx.drawImage(gunSelectedImg, 370, 40);
				ctx.drawImage(heartImg, 400, 60);
				ctx.fillText("Extra Heart - Increase the damage you can take", 445, 70);
				ctx.fillText("before dying.", 445, 85);
				ctx.fillText("$", 385, 100);	
				ctx.fillText(300*maxHealth, 405, 100);
				highlighted = true;
			}
		} else if(highlighted && healthDialogOpen) {
			highlighted = false;
			displayHealthDialog();
			
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
					ctx.fillText("Glock 26 - 33 round magazines.", 445, 340);
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
					ctx.fillText("Glock 26 - 33 round magazines.", 445, 340);
					ctx.fillText("$200", 410, 360);
				}
				if(guns[1].purchased && guns[1].maxAmmo == 10) { //sks upgrade
					ctx.drawImage(gunSelectedImg, 370, 375);
					ctx.drawImage(sksxImg, 370, 370);
					ctx.fillText("SKS - 30 round magazines.", 445, 420);
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
	
	if(x>703&&x<730&&y>18&&y<44&&(gunDialogOpen||healthDialogOpen)) { //close dialog
		gunDialogOpen = false;
		healthDialogOpen = false;
		inShop = true;
		ctx.drawImage(shopImg,0,0);
		ctx.drawImage(moneyBackImg, 30, 15);
		ctx.font = "20px Arial";
		ctx.fillStyle = 'green';
		ctx.textAlign="end"; 
		ctx.fillText("$", 50, 40);
		ctx.fillText(money, 120, 40);
	}
	
	if(x>270&&x<400&&y>100&&y<208&&inShop) {
		inShop = false;
		init();
	}
	
	if(x>370&&x<700&&y>54&&y<82&&healthDialogOpen) { //heart clicked
		if(money<(300*maxHealth)) { //insufficient funds
			alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - (300*maxHealth);
			maxHealth = maxHealth + 1;
			health = health + 1;
			displayHealthDialog();
		}
	}
	
	
	if(x>370&&x<700&&y>54&&y<82&&gunDialogOpen) { //sks clicked
		if(guns[1].purchased) { //sks already owned
			alert("you already own this gun!"); //alerts suck, this should display some sexy pngs
		} else if(money<400) { //insufficient funds
			alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - 400;
			guns[1].purchased = true;
			displayGunDialog();
		}
	}
	
	if(x>385&&x<685&&y>315&&y<365&&gunDialogOpen) { //g26 upgrade clicked
		if(guns[0].maxAmmo==33) { //already owned
			alert("you have already purchased this upgrade!"); //alerts suck, this should display some sexy pngs
		} else if(money<200) { //insufficent funds
			alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
		} else { //purchase successful
			money = money - 200;
			guns[0].maxAmmo = 33;
			guns[0].ammo = 33;
			displayGunDialog();
		}
	}
	
	if(x>380&&x<670&&y>395&&y<435&&gunDialogOpen) { //sks upgrade clicked
		if(guns[1].purchased==false) { //sks not purchased
			alert("you need to purchase the SKS before you can you upgrade it!");
		} else if(guns[1].maxAmmo == 30) {
			alert("you have already purchased this upgrade!");
		} else if(money<400) {
			alert("you must construct additional pylons! (get more money bitch)"); //alerts suck, this should display some sexy pngs
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
		alert("You clicked on the dj!");
	}
} );
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
}

function displayHealthDialog() {
	ctx.drawImage(shopPaper, 350, 0);
	ctx.font = '12px Arial';
	ctx.fillStyle = 'black';
	ctx.textAlign = 'start';
	ctx.fillText("Upgrades", 530, 50);
	ctx.drawImage(heartImg, 400, 60);
	ctx.fillText("Extra Heart - Increase the damage you can take", 445, 70);
	ctx.fillText("before dying.", 445, 85);
	ctx.fillText("$", 385, 100);	
	ctx.fillText(300*maxHealth, 405, 100);
	
	ctx.drawImage(moneyBackImg, 30, 15);
	ctx.font = "20px Arial";
	ctx.fillStyle = 'green';
	ctx.textAlign="end"; 
	ctx.fillText("$", 50, 40);
	ctx.fillText(money, 120, 40);
}