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
let subNav = document.querySelector(".nav-slide");
let windowScroll = document.body.scrollTop;
let currentScroll;
let intervalTime = 10;
let slideShop = document.querySelector(".slide-shop");

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
		if(!subNav.isAnimated){
			animate(subNav,{"top":109},250,"QuadEaseOut");
		}
	}
	else if(window.scrollY>109){
		if(!nav.isAnimated){
			animate(nav,{"top":-56},250,"QuadEaseIn");
		}
		if(!mainNav.isAnimated){
			animate(mainNav,{"top":0},250,"QuadEaseIn");
		}
		if(!subNav.isAnimated){
			animate(subNav,{"top":53},250,"QuadEaseIn");
		}
	}
}

//绑定划过事件
slideShop.onmouseenter = function(){
	if(!subNav.isAnimated){
		animate(subNav,{"height":570},250,"QuadEaseOut");
	}
}

subNav.onmouseleave = function(){
	if(!subNav.isAnimated){
		animate(subNav,{"height":0},250,"QuadEaseOut");
	}
}


//获取json，来初始化nav下拉栏的列表
let newRequest = new XMLHttpRequest();
let json;
newRequest.onreadystatechange = function(){
	if(newRequest.readyState == newRequest.DONE){
		json = JSON.parse(newRequest.responseText);
		afterAjax1();
	}
}

newRequest.open("GET","./../json/nav-slide-bar.json");
newRequest.send();

//获取信号变量，添加东西
function afterAjax1(){
	let theNav = document.querySelector(".nav-slide-left");

	for(let i=1;i<20;i++){
		theNav.innerHTML +=`
				<div class="nav-slide-item">
					<img src=`+json.data.imageSrc[`image${i}`]+`>
					<h3>`+json.data.name[`name${i}`]+`</h3>
				</div>
		`
	}
}

//更新购物车里面的内容
let haveOrNot = undefined;
//购物车内容
let oMyChart = null;
//购物车肉体
let oChartBody = document.querySelector(".chart-wrapper");

if(localStorage.token){
	let gw = new XMLHttpRequest();

	gw.onreadystatechange = function(){
		if(this.readyState==this.DONE){
			let json = JSON.parse(this.responseText);	
			if(json.code == 1){
				haveOrNot = false;
				return;
			}
			else{
				haveOrNot = true;
			}
			oMyChart = json.data;
			dealChart();
		}
	}

	gw.open("GET",`http://h6.duchengjiu.top/shop/api_cart.php?token=${localStorage.token}`);
	gw.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
	gw.send();
}

function dealChart(){
	//如果有商品，推上货架，不然推上另外的架子
	if(haveOrNot){
		putOnMarket();
	}
	else{
		putOnShell();
	}
}

function putOnMarket(){
	for(let i =0;i<oMyChart.length;i++){
		oChartBody.innerHTML += `
		<div class="slide-3">
			<div class="slide-3-inner">
				<img src=${oMyChart[i].goods_thumb}>
				<div class="nav-slide-text">
					<p class = "temp-font-grey">${oMyChart[i].goods_name}</p>
					<p>一只</p>
					<p>数量&nbsp;:&nbsp;${oMyChart[i].goods_number}件</p>
				</div>
				<span>￥${oMyChart[i].goods_price}</span>
			</div>
		</div>
		`
	}
	oChartBody.innerHTML +=`
	<div class = "slide-2">
		<p>查看我的购物车</p>
	</div>
	`
}

function putOnShell(){
	oChartBody.innerHTML +=`
	<div class="slide-1">
		<p>你的购物车暂时没有商品...</p>
	</div>
	<div class = "slide-2">
		<p>快去采购良仓商品吧！</p>
	</div>
	`
}

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