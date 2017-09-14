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




// 做热门商品的图片切换
let lb = new XMLHttpRequest();
let imageData;
lb.onreadystatechange = function(){
	if(this.readyState==this.DONE){
		let json = JSON.parse(this.responseText);
		imageData = json.data;
		changeImage();
		blicktoDetail();
	}
}

lb.open("GET","http://h6.duchengjiu.top/shop/api_goods.php");
lb.send();

//改变图片源
function changeImage(){
	let populars = document.querySelector(".popular");
	for(let i =0;i<imageData.length;i++){
		populars.innerHTML +=`
					<div class="popular-cell ${i%3==0?"":"left-26"}">
						<div class="cell-top ">
							<a><img src=${imageData[i].goods_thumb}></a>
							<p class = "popular-price">￥${imageData[i].price}</p>
							<h3 class = "popular-header">${imageData[i].goods_name}</h3>
							<p class="popular-intro">${imageData[i].goods_desc}</p>
						</div>
					</div>`
	}
}

//绑定点击图片跳转到详情
function blicktoDetail(){
	let blinkImages = document.querySelectorAll(".popular-cell");
	for(let i=0;i<blinkImages.length;i++){
		blinkImages[i].onclick = function(){
			location.href = `./../template/商品详情页.html?goods_id=${imageData[i].goods_id}`;
		}
	}
}

