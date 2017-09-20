var opreservation = document.querySelector(".preservation");
var oform = document.querySelector(".form_a1");
var oaddressInput = document.querySelector(".address-input1");
var oprovince = document.querySelector(".province");
var ocity = document.querySelector(".city");
var oaddress = document.querySelector(".address");
var ophoneNumber = document.querySelector(".phone_number");
var ocharts = document.querySelector(".charts");
opreservation.onclick = function  () {
	var postobj = serializeForm(document.querySelector('.form_a1'));
	console.log(111);
	myajax.post("http://h6.duchengjiu.top/shop/api_useraddress.php?status=add&token="+localStorage.token,
	postobj,
	 function  (error,responseText) {
	 	let json = JSON.parse(responseText);
	 	alert(json.message);
	 	myajax.get("http://h6.duchengjiu.top/shop/api_useraddress.php?token"+localStorage.token,
				 	{},
				 	 function  (error,responseText) {
				 	 	var json = JSON.parse(responseText);
				 	 	var data = json.data;				 	 	
				 	 	for(var i = 0; i<data.length;i++){
				 	 		var obj = data[i];
				 	 		ocharts.innerHTML = `<li>
				 	 								<div class="address-top">
														<p class = "top-p1">${obj.address_name}</p>
														<p class = "top-p2">${obj.mobile}</p>
													</div>
													<div class="address-center">
														<p class = "center-p1"><span>${obj.province}</span><span>${obj.city}</span></p>
														<p class = "center-p2">${obj.address}</p>
													</div>
													<div class="address-bottom">
														<p>默认地址</p>	<a href="#">删除</a><a href="#">编辑</a>
													</div>
				 	 							</li>`
				 	 		console.log(ocharts.innerHTML);
				 	 	}
				 	 })
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 });
}