//模态框的制作

//显示模态框
function showModel(msg = "未知错误"){
	let model = document.querySelector(".modelBox");
	let wrapper = document.querySelector(".wrapper2");
	let modelText = document.querySelector(".modelText");
	modelText.innerText = msg;
	wrapper.style.display = "block";
}

//关闭模态框
function closeModel(){
	let model = document.querySelector(".modelBox");
	let wrapper = document.querySelector(".wrapper2");
	wrapper.style.display = "none";
}

//绑定模态框关闭事件
let exitBtn = document.querySelector(".exit");
exitBtn.onclick = function(){
	closeModel()
}


//注册页面的认证
//需要验证
// 手机号 标准手机号验证
// 验证码 明着的验证码怕不怕
// 创建密码 6-20位，区分大小写
// 密码确认 密码确认一遍
// 同意条款


//手机
let phone = document.querySelector(".group1").querySelector("input");
//验证码
let oCT = document.querySelector(".group2").querySelector("input");
//密码
let oPassword = document.querySelector(".password").querySelector("input");
//验证密码
let oConfirm = document.querySelector(".confirm").querySelector("input");
//勾选条款
let oProtocol = document.querySelector(".group3").querySelector("input");
//提交按钮
let oSubmit = document.querySelector(".group4").querySelector("button");
//手机正则
let reg = new RegExp(/^1[3458][0-9]{9}$/);
//密码正则
let reg2 = new RegExp(/^[\w]{6,20}$/);
//所谓验证码
let CTcode = "2a55";



phone.onblur = function(){
	if(!phone.value.match(reg)){
		showModel("请您输入真实的手机号码")
		return;
	}
}

oCT.onblur = function(){
	if(oCT.value!=CTcode){
		showModel("验证码错误，请您重新输入！");
		return;
	}
}

oPassword.onblur = function(){
	if(!oPassword.value.match(reg2)){
		showModel("密码为6-20位，不能包含特殊字符~")
		return;
	}
}

oConfirm.onblur = function(){
	if(oPassword.value!=oConfirm.value){
		showModel("您输入的密码不一致");
		return;
	}
}

//验证完所有条件，进行上传
oSubmit.onclick = function(){
	if(!phone.value.match(reg)){
		showModel("请您输入真实的手机号码")
		return;
	}
	else if(oCT.value!=CTcode){
		showModel("验证码错误，请您重新输入！");
		return;
	}
	else if(!oPassword.value.match(reg2)){
		showModel("密码为6-20位，不能包含特殊字符~")
		return;
	}
	else if(oPassword.value!=oConfirm.value){
		showModel("您输入的密码不一致");
		return;
	}
	else if(!oProtocol.checked){
		showModel("请同意良仓注册条款，谢谢！");
		return;
	}
	//这里写跨域请求部分
	let rg = new XMLHttpRequest();
	rg.onreadystatechange = function(){
		if(rg.readyState == rg.DONE){
			let json = JSON.parse(this.responseText);
			showModel(json.message);
			location.href = "./../template/登录.html";
		}
	}
	rg.open("POST","http://h6.duchengjiu.top/shop/api_user.php");
	rg.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	rg.send(`status=register&username=${phone.value}&password=${oPassword.value}`);

	//跨域请求完毕
	
	return;
}