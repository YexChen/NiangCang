// 实现轮播图效果
// 思路：1.移动train的位置
// 2.移到尾部则返回
//伪代码：
// 1.获取信号变量
// 2.移动函数
// 3.（IIFE?）匿名连续调用移动函数

//获取信号变量
let train = document.querySelector(".train");
let btns = document.querySelector(".carousel-dots").querySelectorAll("span");
let arrLeft = document.querySelector(".arrowLeft");
let arrRight = document.querySelector(".arrowRight");
let index = 0;
let imageLength = 1000;

// 右部点击事件
arrRight.onclick = function(){
	if(!train.isAnimated){
		index++;
		checkPosition();
		animate(train,{"marginLeft":(-1)*index*imageLength},500);
	}
}

// 左部点击事件
arrLeft.onclick = function(){
	if(!train.isAnimated){
		index--;
		checkPosition();
		animate(train,{"marginLeft":(-1)*index*imageLength},500);
	}
}

//还原位置
function checkPosition(){
	if(index<0){
		train.style.marginLeft = "-4000px";
		index = 3;
	}
	if(index>4){
		train.style.marginLeft = "0px";
		index = 1;
	}
	for(let i=0;i<btns.length;i++){
		btns[i].className = "";
	}
	btns[(index-1)<0?3:(index-1)].className = "cur";
}

//底部选页
for(let i =0;i<btns.length;i++){
	btns[i].onclick = function(){
		index = i+1;
		checkPosition();
		animate(train,{"marginLeft":(-1)*index*imageLength},500);
		for(let j=0;j<btns.length;j++){
			btns[j].className = "";
		}
		btns[i].className = "cur";
	}
}

//自动轮播
let timer = null;
let intervalTimes = 5000;
clearInterval(timer);
timer = setInterval(function(){
	if(!train.isAnimated){
		index++;
		checkPosition();
		animate(train,{"marginLeft":(-1)*index*imageLength},500);
	}
},intervalTimes)


//轮播图结束/////////////////////////////////


//开始做小手队列动画//
let hand = document.querySelector("#animate-hand");

hand.onmouseover = function team(){
	animate(hand,{"marginLeft":"0px"},500,function(){
	animate(hand,{"marginLeft":"10px"},500,function(){
		animate(hand,{"marginLeft":"0px"},500,function(){
			animate(hand,{"marginLeft":"10px"},500,function(){
				animate(hand,{"marginLeft":"0px"},500);
			});
		});
	})});
	
}
