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

let phone = document.querySelector(".group1").querySelector("input");
let reg = new RegExp(/^1[3458][0-9]{9}$/);

