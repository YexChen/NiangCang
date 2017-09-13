//绑定手机号的oninput事件,利用正则进行验证
let phone = document.querySelector(".inputting");
let reg = new RegExp(/^1[3458][0-9]{9}$/);

phone.onblur = function(){
	if(!phone.value.match(reg)){
		alert("您的手机有误，请填写真实的手机号码");
	}
}

//获取验证码
function getCTcode(){
	let seed = "";
	for(let i=0;i<6;i++){
		seed += Math.trunc(Math.random()*10);
	}
	return seed;
}

let acquire = document.querySelector(".acquiring");
acquire.onclick = function(){
	if(!phone.value.match(reg)){
		alert("您的手机有误，请填写真实的手机号码");
		return;
	}
	if(localStorage.centificateCode) localStorage.removeItem("centificateCode");
	if(localStorage.phone) localStorage.removeItem("phone");
	localStorage.phone = phone.value;
	localStorage.centificateCode = getCTcode();
	alert(`来自您的iphone:
			您的验证码为：${localStorage.centificateCode},
			如果不是本人操作，请联系良仓客服中心
		`);
}




//登陆验证
//验证手机号码和密码
let centi = document.querySelector(".btm");
	centi.onclick = function(){
		//获取填写的验证码
		let oCode = parseInt(document.querySelector(".auth_code").value);
		console.log(phone.value);
		console.log(localStorage.phone);
		console.log(oCode);
		console.log(localStorage.centificateCode);
		if(phone.value==localStorage.phone&&oCode==localStorage.centificateCode){
			//这里添加后续ajax请求
			alert("登陆成功！");
		}
		else{
			alert("登陆失败，请验证用户名和密码");
		}
}