function Slideshow (slideshow) {
	this.rightBtn = document.querySelector(".to_right");
	this.leftBtn = document.querySelector(".to_left");
	this.bigUl = document.querySelector(".pic");
	this.bigLi = document.querySelector(".pic").querySelectorAll("li");
	this.oul = document.querySelector(".thumbnail").querySelector("ul");
	this.left = 0;
	this.oli = document.querySelector(".thumbnail").querySelector("ul").querySelectorAll("li");
	this.index = 25;
	
	var timer = null;
	this.listLength = this.bigLi.length;
	this.widths = parseInt(this.bigLi[0].offsetWidth);
	this.froms = parseInt(this.widths/this.index);
	this.fromes = 0;
	this.bigUl.innerHTML += this.bigUl.innerHTML;
	this.frequency = 0;
	
	this.Jumps();
}
Slideshow.prototype.motions = function  () {
	var self = this;
	clearInterval(this.timer);
	this.timer = setInterval(function  () {
		self.left -= self.index;
		self.fromes++;
		
		for (var i = 0;i<self.oli.length;i++) {
			self.oli[i].style.border = "1px solid white";
			if (self.left > -self.widths) {
			self.oli[1].style.border = "1px solid black";
		} else if(self.left < -self.widths&&self.left>-self.widths*2){
			self.oli[2].style.border = "1px solid black";
		}else{
			self.oli[0].style.border = "1px solid black";
		}
		}
		if (parseInt(self.bigUl.style.left) <= -self.widths*3) {
			self.left = 0;
		}
		self.bigUl.style.left = self.left + "px";
		if (self.fromes>=self.froms) {
			clearInterval(self.timer);
			self.fromes = 0;
			if (Math.round(self.left/self.widths)<=3) {
				self.bigUl.style.left =Math.round(self.left/self.widths)*self.widths+"px";
			} else{
				self.bigUl.style.left = 0;
			}
			
		};
	},20)
}
Slideshow.prototype.move = function  () {
	var self = this;
	this.interval = setInterval(function  () {
		self.motions()
	},3000)
}
Slideshow.prototype.Jumps = function  () {
	this.move();
	var self = this;
	this.leftBtn.onmouseover = function  () {
		clearInterval(self.interval);
	}
	this.leftBtn.onmouseout = function  () {
		self.move();
	}
	this.rightBtn.onmouseover = function  () {
		clearInterval(self.interval);
	}
	this.rightBtn.onmouseout = function  () {
		self.move();
	}
	this.leftBtn.onclick = function  () {		
		self.left -= self.widths;
		if (self.left<=-self.widths*3) {
			self.left = 0;
		}
		for (var i = 0;i<self.oli.length;i++) {
			self.oli[i].style.border = "1px solid white";
			if (self.left == -self.widths) {
			self.oli[1].style.border = "1px solid black";
		} else if(self.left==-self.widths*2){
			self.oli[2].style.border = "1px solid black";
		}else if(self.left==0){
			self.oli[0].style.border = "1px solid black";
		}
		}
		self.bigUl.style.left = self.left + "px";
	}
	this.rightBtn.onclick = function  () {		
		self.left += self.widths;
		if (self.left>=0) {
			self.left = -self.widths*3;
		}
		for (var i = 0;i<self.oli.length;i++) {
			self.oli[i].style.border = "1px solid white";
			if (self.left >= -self.widths) {
			self.oli[1].style.border = "1px solid black";
		} else if(self.left < -self.widths&&self.left>=-self.widths*2){
			self.oli[2].style.border = "1px solid black";
		}else{
			self.oli[0].style.border = "1px solid black";
		}
		}
		self.bigUl.style.left = self.left + "px";
	}
}