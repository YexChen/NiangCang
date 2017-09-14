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

		},
		checked : {

		},
		jsonId:{

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
		gwcData = json.data;
		AfterGwcAjax();

	}
}

gwc.open("GET",`http://h6.duchengjiu.top/shop/api_cart.php?token=${localStorage.token}`);
gwc.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
gwc.send();

// ajax执行完毕之后
function AfterGwcAjax(){
	//先绑定提交
		let oSubmit = document.querySelector(".sb");
		oSubmit.onclick = function(){
			submitAjax();
		}
	//
	for(let i =0;i<gwcData.length;i++){
		//获取商品种类数量
		let goodsCount = document.querySelectorAll(".tr-1");
		//更新数据到数据表
		localJson.data.numbers[i]= parseInt(gwcData[i].goods_number);
		localJson.data.price[i] = parseInt(gwcData[i].goods_price);
		localJson.data.sum[i] = localJson.data.numbers[i]*localJson.data.price[i];
		localJson.data.total = 0;
		localJson.data.checked[i] = false;
		localJson.data.jsonId[i] = gwcData[i].goods_id;

		for(let i =0;i<goodsCount.length;i++){
			if(localJson.data.checked[i])
			localJson.data.total+=localJson.data.sum[i];
		}
		//添加元素
		myGwc.innerHTML += `
		<tr class="tr-1">
			<td> 
				<sup>
					<input type="checkbox" name="td-i" id="td-i" class = "td-ii"/>
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
			<td><a  class = "deletes">删除</a></td>
		</tr>
		`
	}
	//先检查是否选择框框
	checkedHandler();
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
					//计算总价
					localJson.data.total=0;
					for(let i =0;i<goodsCount.length;i++){
						if(localJson.data.checked[i]){
							localJson.data.total+=localJson.data.sum[i];
							dataChangeCallback(i,goodsCount)
						}
					}
				}
			}
			goodsCount[i].querySelectorAll(".b1")[1].onclick = function(){
				if(localJson.data.numbers[i]>-100){
					// 改变localJson的值
					localJson.data.numbers[i]++;
					localJson.data.sum[i]=localJson.data.numbers[i]*localJson.data.price[i];
					dataChangeCallback.call(this,i,goodsCount);
					//计算总价
					localJson.data.total=0;
					for(let i =0;i<goodsCount.length;i++){
						if(localJson.data.checked[i]){
							localJson.data.total+=localJson.data.sum[i];
							dataChangeCallback(i,goodsCount);
						}
					}
				}
			}
		}
		deleteHandler();
	}
	bindEvent();
}

// 然后使用绑定物品数量，总价，添加减少事件



//解决选定问题
function checkedHandler(){
	let goodsCount = document.querySelectorAll(".tr-1");
	let oCheck = document.querySelectorAll(".td-ii");
	for(let i =0;i<goodsCount.length;i++){
		oCheck[i].onclick = function(){
			if(localJson.data.checked[i]==false){
				localJson.data.checked[i]=true;
				dataChangeCallback(i,goodsCount);
			}
			else if(localJson.data.checked[i]==true){
				localJson.data.checked[i]=false;
				dataChangeCallback(i,goodsCount);
			}
			localJson.data.total=0;
			for(let i =0;i<goodsCount.length;i++){
				if(localJson.data.checked[i]){
					localJson.data.total+=localJson.data.sum[i];
					dataChangeCallback(i,goodsCount);
				}
			}
		}
	}
}

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
function deleteHandler(){
	let oDelete = document.querySelectorAll(".deletes");
	let goodsCount = document.querySelectorAll(".tr-1");
	for(let i =0;i<goodsCount.length;i++){
		oDelete[i].onclick = function(){
			if(confirm("确认删除吗？")){
				//真删除(改localjson中的number为0)
				localJson.data.numbers[i]=0;

				goodsCount[i].parentNode.removeChild(goodsCount[i]);
				localJson.data.checked[i] = false;
				localJson.data.checked[i] = false;
				localJson.data.sum[i] = 0;
				localJson.data.total=0;
				for(let i =0;i<goodsCount.length;i++){
				if(localJson.data.checked[i]){
					localJson.data.total+=localJson.data.sum[i];
					dataChangeCallback(i,goodsCount);
					}
				}
			}
		}
		// 然后删除数据
	}
}


// 第二个功能就是获取商品名称和数量
// 然后发送ajax提交内容
function submitAjax(){
	for(let i=0;i<gwcData.length;i++){

		let gxgwc = new XMLHttpRequest();
		//小小的改动，让未勾选的项目数量改为0;
		for(let j=0;j<localJson.length;j++){
			if(!localJson.data.checked[i]){
				localJson.data.numbers[i]=0;
			}
		}

		gxgwc.onreadystatechange = function(){
			if(this.readyState==this.DONE){
				let json = JSON.parse(this.responseText);
				location.href = "订单.html";
			}
		}

		gxgwc.open("POST",`http://h6.duchengjiu.top/shop/api_cart.php?token=${localStorage.token}`);
		gxgwc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		gxgwc.send(`goods_id=${localJson.data.jsonId[i]}&&number=${localJson.data.numbers[i]}`);
	}
}