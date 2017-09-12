// 做一个根据鼠标滚轮，根据滚动上下来进行缩进和弹出fixed窗口的效果
//实现：
// 1.监听onscroll事件
// 2.进行动画效果
// 注意：
// 1.不使用原型来进行滚动，全部使用dom
// 伪代码：
// 获取信号变量
// timer
// distance1
// distance2
// xxx.onscroll = function(){
	// 判断语句
	//move(xxx,distance); 
// }
// move = function(xxx,distance){
// 	timer = setInterval(){
// 		xxx移动距离distance1
// 		如果distance超过则清除定时器
// 	}
// }

// 获取信号变量：
let nav = document.querySelector(".nav");
let mainNav = document.querySelector(".main-nav");
let windowScroll = document.body.scrollTop;
let currentScroll;
let intervalTime = 10;

//绑定事件
window.onscroll = function(e){
	//判断Y轴是在向上滚还是在向下滚
	let scrollY = (this.y||window.scrollY) - window.scrollY;
	this.y = window.scrollY;

	if(scrollY>0){
		if(!nav.isAnimated){
		animate(nav,{"top":0},250,"QuadEaseOut");
		}
		if(!mainNav.isAnimated){
			animate(mainNav,{"top":56},250,"QuadEaseOut");
		}
	}
	else if(window.scrollY>109){
		if(!nav.isAnimated){
			animate(nav,{"top":-56},250,"QuadEaseIn");
		}
		if(!mainNav.isAnimated){
			animate(mainNav,{"top":0},250,"QuadEaseIn");
		}
	}
}
