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
var shopButton = new Image();
var gunBG = new Image();
var gunSelectedImg = new Image();
var g26Img = new Image();
var sksImg = new Image();
var g26xImg = new Image();
var sksxImg = new Image();
var sounds = true;
var soundOn = new Image();
var soundOff = new Image();
var soundStorage = true; //remembers if sound was on before pausing
var money = 0;
var maxHealth = 3;
var health = 3;
var started = false;
var subsonicUnlocked = false;
var loadGameImg = new Image();
var grayButton = new Image();
var title = new Image();

title.src = 'img/title.png';
grayButton.src = 'img/loadGray.png';
loadGameImg.src = 'img/loadGame.png';
bgImg.src = 'img/bg.png';
newGameImg.src = 'img/newGame.png';
shopButton.src = 'img/shopButton.png';
intro1.src = 'img/intro1.png';
intro2.src = 'img/intro2.png';
intro3.src = 'img/intro3.png';
intro4.src = 'img/intro4.png';
intro5.src = 'img/intro5.png';
intro6.src = 'img/intro6.png';
intro7.src = 'img/intro7.png';
intro8.src = 'img/intro8.png';
intro9.src = 'img/intro9.png';
sksxImg.src = 'img/sksx.png';
g26xImg.src = 'img/g26x.png';
gunBG.src = 'img/gunSlot.png';
gunSelectedImg.src = 'img/gunSelected.png';
g26Img.src = 'img/g26.png';
sksImg.src = 'img/sks.png';
soundOn.src = 'img/soundOn.png';
soundOff.src = 'img/soundOff.png';

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

var guns = [];

function startMenu() {
	guns[0] = new gun("G26",10, 10, 18, "semi", true, true, 500);
	guns[1] = new gun("SKS",10,10, 40, "semi", false, false, 650);
	guns[2] = new gun("870",4,4,25, "pump", false, false, 800);
	
	var loadCheck = getCookie("level");
	
	ctx.drawImage(bgImg,0,0);
	ctx.drawImage(title,150, 0);
	ctx.drawImage(newGameImg,250,400);
	ctx.drawImage(soundOn, 1060, 35);
	ctx.drawImage(loadGameImg,650, 400);
	if(loadCheck=="") {
		ctx.drawImage(grayButton, 650,400);
	}
	
	shopInit();
	
	$("#map").click(function(e){
	var x = Math.floor((e.pageX-$("#map").offset().left));
	var y = Math.floor((e.pageY-$("#map").offset().top));
	
	
	//console.log(x,y);
	
	if(x>250 && x < 450 && y >400 && y < 520 && started==false) {
		started = true;
		money = 0;
		health = 3;
		maxHealth =3;
		guns[0].maxAmmo = 10;
		guns[1].maxAmmo = 10;
		guns[1].purchased = false;
		guns[0].active = true;
		guns[1].active = false;
		activeGun = 0;
		level =1;
		subUnlocked = false;
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
	
	//if(x>418&&x<600 && y> 400 && y < 515 && started==false) {
	//	started = true;
	//	shop();
	//}
	
	if(x>650 && x < 850 && y >400 && y < 520 && started==false && loadCheck != "") {
		started = true;
		guns[1].purchased = getCookie("sksUnlocked");
		guns[1].purchased = isTrue(guns[1].purchased); //this fixes a weird issue where .purchase is set to "true" or "false" instead of true or false (they're strings, not booleans)
		level = Number(getCookie("level"));
		guns[0].maxAmmo = Number(getCookie("g26MaxAmmo"));
		guns[1].maxAmmo = Number(getCookie("sksMaxAmmo"));
		guns[2].purchased = getCookie("870Unlocked");
		guns[2].purchased = isTrue(guns[2].purchased);
		health = Number(getCookie("health"));
		maxHealth = Number(getCookie("maxHealth"));
		subsonicUnlocked = getCookie("subsonicUnlocked");
		subsonicUnlocked = isTrue(subsonicUnlocked);
		maxKickCD = Number(getCookie("maxKickCD"));
		maxSubCD = Number(getCookie("maxSubCD"));
		money = Number(getCookie("money"));
		shop();
	}
	
	if(x>1060 && x < 1100 && y >0 && y < 30 && started) {
		if(hints) {
			hints = false;
		} else {
			hints = true;
		}
	}
	if(x>1061 && x < 1100 && y > 40 && y < 68) {
		if(sounds) {
			ctx.drawImage(soundOff, 1060, 35);
			sounds = false;
			soundStorage = false;
			document.getElementById("music").pause();
		} else {
			ctx.drawImage(soundOn, 1060, 35);
			sounds = true;
			soundStorage = true;
			document.getElementById("music").play();
		}
	}
	
	});
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 

function isTrue(string) {
	if(string=="true") {
		return true;
	} else {
		return false
	}
}
	