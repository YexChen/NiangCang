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
			【良仓】您的验证码为：${localStorage.centificateCode},
			如果不是本人操作，请联系良仓客服中心
		`);
}

//验证密码
let oPassword = document.querySelector(".password");
let oReg = new RegExp(/^[\w]*$/);
oPassword.onblur = function(){
	if(!oPassword.value.match(oReg)){
		alert("您的密码有不合法字符，请核对后再次输入");
	}
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
		if(phone.value==localStorage.phone&&oCode==localStorage.centificateCode&&oPassword.value.match(oReg)){
			//这里添加后续ajax请求
			let lg = new XMLHttpRequest();

			lg.onreadystatechange = function(){
				if(this.readyState==this.DONE){
					let json = JSON.parse(this.responseText);
					console.log(json);
					if(localStorage.token)	localStorage.removeItem("token");
					localStorage.token=json.data.token;
					if(localStorage.username)	localStorage.removeItem("username");
					localStorage.username=json.data.username;
					alert(json.message);
					if(!history.back()){
						location.href = "./../template/index.html";
					}
				}
			}

			lg.open("POST","http://h6.duchengjiu.top/shop/api_user.php");
			lg.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
			lg.send(`status=login&username=${phone.value}&password=${oPassword.value}`);
		}
		else{
			alert("登陆失败，请验证用户名和密码");
		}
}