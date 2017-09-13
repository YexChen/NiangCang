var oNewProduct = document.querySelector(".new_product");
var oLi = document.querySelector(".new_product").querySelectorAll("li");
myajax.get('http://h6.duchengjiu.top/shop/api_cat.php',{},function(error,responseText) {
	var json = JSON.parse(responseText);
	var data =json.data;
	for (var i = 0;i<data.length;i++) {
		var obj = data[i];
		oLi[i+1].innerHTML =`<a href="商品列表.html?cat_id=${obj.cat_id}" >${obj.cat_name}</a>`;		
	}
});
var cat_id = getQueryString('cat_id');
var oOurShop = document.querySelector(".our_shop");
myajax.get('http://h6.duchengjiu.top/shop/api_goods.php',{cat_id:cat_id},function(error,responseText) {
	var json = JSON.parse(responseText);
	var data = json.data;
	for (var i = 0;i < data.length;i++) {
		var obj = data[i];
		oOurShop.innerHTML +=`<li><div class="commodity_picture">
		<img class="big_graph" src = "${obj.goods_thumb}"/>
		<a href="商品详情页.html?goods_id=${obj.goods_id}" class = "instruction">
		<p class = "popular-price">\¥${obj.price}</p>
		<h3 class = "popular-header">${obj.goods_name}</h3>
		<p class="popular-intro">${obj.goods_desc}</p>
		</a></div></li>`;
	}
	var oLis = oOurShop.querySelectorAll("li");
	for (var j=0;j<oLis.length;j++) {
		if (j%3===0) {
			oLis[j].style.marginLeft= "0";
		} else{
			oLis[j].style.marginLeft = "26px";
		}
	}
});
var oPager = document.querySelectorAll(".checked");
var oNextPage = document.querySelector(".next_page");
var oPagerNumber = document.querySelector(".pager_number");
var oConfirm = document.querySelector(".confirm");
var pagernumber = oPagerNumber.innerHTML;

//oPager[1].onclick = (function  () {	
//		
//		myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",
//		{"cat_id":cat_id,"page":2},function  (error,responseText) {
//			var json = JSON.parse(responseText);
//			var data = json.data;
//			for (var i = 0;i < data.length;i++) {
//				var obj = data[i];
//				oOurShop.innerHTML +=`<li><div class="commodity_picture">
//				<img class="big_graph" src = "${obj.goods_thumb}"/>
//				<a href="商品详情页.html?goods_id=${obj.goods_id}" class = "instruction">
//				<p class = "popular-price">\¥${obj.price}</p>
//				<h3 class = "popular-header">${obj.goods_name}</h3>
//				<p class="popular-intro">${obj.goods_desc}</p>
//				</a></div></li>`;
//			}
//		})
//	})();	
//for (var k=0;k<oPager.length;k++) {	
	oPager[2].onclick = function  () {
		myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",
		{"cat_id":cat_id,"page":3},function  (error,responseText) {
			var json = JSON.parse(responseText);
			var data = json.data;
			for (var i = 0;i < data.length;i++) {
				var obj = data[i];
				oOurShop.innerHTML +=`<li><div class="commodity_picture">
				<img class="big_graph" src = "${obj.goods_thumb}"/>
				<a href="商品详情页.html?goods_id=${obj.goods_id}" class = "instruction">
				<p class = "popular-price">\¥${obj.price}</p>
				<h3 class = "popular-header">${obj.goods_name}</h3>
				<p class="popular-intro">${obj.goods_desc}</p>
				</a></div></li>`;
			}
		})
	}	
//}

