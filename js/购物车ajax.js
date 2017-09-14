// 购物车就是请求ajax数据（根据token）
// 根据ajax发送数据

// 第二个功能就是获取商品名称和数量
// 然后发送ajax提交内容

// 在一个就是加减的js
// 昨天忘记要他们做了。。

//定义信号变量
let myGwc = document.querySelector(".order-tb");
let gwcData;
let localJson = {
	data :{
		numbers : {

		},
		price :{

		},
		sum : {
			
		},
		total :{

		}
	}
}


//没登陆的送去登陆
if(!localStorage.token){
	alert("您还未登录");
	location.href = "./../template/登录.html";
}

let gwc = new XMLHttpRequest();

gwc.onreadystatechange = function(){
	if(this.readyState==this.DONE){
		let json = JSON.parse(this.responseText);
		console.log(json);
		gwcData = json.data;
		AfterGwcAjax();
	}
}

gwc.open("GET",`http://h6.duchengjiu.top/shop/api_cart.php?token=${localStorage.token}`);
gwc.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gwc.send();

// ajax执行完毕之后
function AfterGwcAjax(){
	for(let i =0;i<gwcData.length;i++){
		//获取商品种类数量
		let goodsCount = document.querySelectorAll(".tr-1");
		//更新数据到数据表
		localJson.data.numbers[i]= parseInt(gwcData[i].goods_number);
		localJson.data.price[i] = parseInt(gwcData[i].goods_price);
		localJson.data.sum[i] = localJson.data.numbers[i]*localJson.data.price[i];
		localJson.data.total = 0;
		for(let i =0;i<goodsCount.length;i++){
						localJson.data.total+=localJson.data.sum[i];
		}
		//添加元素
		myGwc.innerHTML += `
		<tr class="tr-1">
			<td> 
				<sup>
					<input type="checkbox" name="td-i" id="td-i"/>
				</sup>
				<img src=${gwcData[i].goods_thumb}>
			</td>
			<td class="tr-2">
				<p>${gwcData[i].goods_name}</p>
			</td>
			<td>
				<button class="b1">-</button>
				<span class = "numbersss">1</span>
				<button class="b1">+</button>
			</td>
			<td>${gwcData[i].goods_price}</td>
			<td class = "xiaoji">299.00</td>
			<td><a href="">删除</a></td>
		</tr>
		`
	}
	//获取商品种类数量
	let goodsCount = document.querySelectorAll(".tr-1");
	//绑定添加，减少事件
	// 使用for来进行绑定(因为有索引值)
	function bindEvent(){
		for(let i =0;i<goodsCount.length;i++){
			dataChangeCallback.call(this,i,goodsCount);
			//减少事件
			goodsCount[i].querySelectorAll(".b1")[0].onclick = function(){
				if(localJson.data.numbers[i]>0){
					// 改变localJson的值
					localJson.data.numbers[i]--;
					localJson.data.sum[i]=localJson.data.numbers[i]*localJson.data.price[i];
					dataChangeCallback.call(this,i,goodsCount);
					localJson.data.total=0;
					for(let i =0;i<goodsCount.length;i++){
						localJson.data.total+=localJson.data.sum[i];
					}
				}
			}
			goodsCount[i].querySelectorAll(".b1")[1].onclick = function(){
				if(localJson.data.numbers[i]>-100){
					// 改变localJson的值
					localJson.data.numbers[i]++;
					localJson.data.sum[i]=localJson.data.numbers[i]*localJson.data.price[i];
					dataChangeCallback.call(this,i,goodsCount);
					localJson.data.total=0;
					for(let i =0;i<goodsCount.length;i++){
						localJson.data.total+=localJson.data.sum[i];
					}
				}
			}
		}
	}
	bindEvent();
}

// 然后使用绑定物品数量，总价，添加减少事件

//渲染数量，小计，和总价
function dataChangeCallback(i,goodsCount){
	//准备渲染
	let oAmount = goodsCount[i].querySelector(".numbersss");
	let oXiaoji = goodsCount[i].querySelector(".xiaoji");
	let oTotal = document.querySelector(".m2");

	oAmount.innerText = localJson.data.numbers[i];
	oXiaoji.innerText = localJson.data.sum[i];
	oTotal.innerText = localJson.data.total;
}



// 第一次模拟了数据的动态绑定，感觉乱糟糟的
// 然后就是删除购物车内容



// 第二个功能就是获取商品名称和数量
// 然后发送ajax提交内容
