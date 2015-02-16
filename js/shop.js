var c = document.getElementById("map");
var ctx = c.getContext("2d");
var shopImg = new Image();
var shopGun = new Image();
var shopHealth = new Image();
var shopDJ = new Image();
var gunDialogOpen = false;
var inShop = false;
var shopPaper = new Image();

shopPaper.src = 'img/shopPaper.png';
shopHealth.src = 'img/shop-healthHighlight.png';
shopDJ.src = 'img/shop-djHighlight.png';
shopGun.src = 'img/shop-gunHighlight.png';
shopImg.src = 'img/shop.png';


function shop() { //can't yet buy anything or truly interact with the shop yet. but onMouseOver is working, which is cool.
	inShop = true;
	highlighted = false;
	ctx.drawImage(shopImg,0,0);
	$("#map").mousemove(function(e){
		var mouseX = Math.floor((e.pageX-$("#map").offset().left));
		var mouseY = Math.floor((e.pageY-$("#map").offset().top));
		if(mouseX>110&&mouseX<210&&mouseY>30&&mouseY<360 && inShop) { //draw shop
			ctx.drawImage(shopGun,0,0);
			highlighted = true;
		} else if(mouseX>405&&mouseX<635&&mouseY>220&&mouseY<510 && inShop) {
			ctx.drawImage(shopHealth,0,0);
			highlighted = true;
		} else if(mouseX>750&&mouseY>10&&mouseY<210 && inShop) {
			ctx.drawImage(shopDJ,0,0);
			highlighted = true;
		} else if(highlighted && inShop) {
			ctx.drawImage(shopImg,0,0);
			highlighted = false;
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
	
	if(x>703&&x<730&&y>18&&y<44&&gunDialogOpen) {
		gunDialogOpen = false;
		inShop = true;
		ctx.drawImage(shopImg,0,0);
	}
		
	
	if(x>110&&x<210&&y>30&&y<360 && inShop) {
		inShop = false;
		gunDialogOpen = true;
		displayGunDialog();
		
	} else if(x>405&&x<635&&y>220&&y<510 && inShop) {
		alert("You clicked on the whores!");
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
}