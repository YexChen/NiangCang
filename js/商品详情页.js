var oadd = document.querySelector(".add");
var onumbers = document.querySelector(".numbers");
var osubtraction = document.querySelector(".subtraction");
var onub = onumbers.value;
oadd.onclick = function  () {
	onub--;
	if (onub>=0) {
		onumbers.value = onub;
	} else{
		onub=0;
		onumbers.value = 0;
	}
}
osubtraction.onclick = function  () {
	onub++;
	onumbers.value = onub;
}


var goods_id = getQueryString('goods_id');
var opresentation = document.querySelector(".presentation");
var bookTitle = document.querySelector(".book_title");
var oparticulars = document.querySelector(".particulars");
var omuch = document.querySelector(".much");
var oabc = document.querySelector(".abc");
var ocontent = document.querySelector(".content_introduction");
var ofirst = document.querySelector(".first_picture");
var osecond = document.querySelector(".second_picture");
var othird = document.querySelector(".third_picture");
myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{goods_id:goods_id},function  (error,responseText) {
	var json = JSON.parse(responseText);
	var data = json.data; 
//	ofirst.style.background = `url("${data[0].price}") no-repeat`;
//	osecond.style.background = `${data[0].price}`;
//	othird.style.background = `${data[0].price}`;
	ofirst.innerHTML = `<img src="${data[0].goods_thumb}" class="first_pictures"/>`;
	osecond.innerHTML = `<img src="${data[0].goods_thumb}" class="first_pictures"/>`;
	othird.innerHTML = `<img src="${data[0].goods_thumb}" class="first_pictures"/>`;
	opresentation.innerHTML = `${data[0].goods_name}`;
	oparticulars.innerHTML = `${data[0].goods_name}`;
	omuch.innerHTML = `\¥${data[0].price}`;
	oabc.innerHTML = `<img class = "big_pc" src="${data[0].goods_thumb}"/>`;
	ocontent.innerHTML = `${data[0].goods_desc}`
})



var oshopping = document.querySelector(".shopping_cart");
oshopping.onclick = function  () {
	
	if (localStorage.token == undefined) {
	location.href = "登录.html"
	} else{
		console.log("aaa");
		myajax.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
		{goods_id,number:onumbers.value},
			 function(err, responseText) {
          var json = JSON.parse(responseText);
          if (json.code === 0) {
            alert(json.message);
           }
		})
	}
}
var opurchasing = document.querySelector(".purchasing");
opurchasing.onclick = function  () {
	if (localStorage.token == undefined) {
	location.href = "登录.html"
	} else{
		myajax.post("http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.token,
		{goods_id,number:1},
			 function(err, responseText) {
          var json = JSON.parse(responseText);
          if (json.code === 0) {
            location.href="订单.html";
           }
		})
	}
	
}
