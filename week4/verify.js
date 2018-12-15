//验证姓名
function verifyName() {
	var name = document.getElementById("Name").value;//获得名字
	var domName = document.getElementById("name");//获取父节点
	var domFlag = document.getElementById("tipsName");
	var reg = /^[\u4E00-\u9FA5]{2,7}$/; //姓名的正则表达式
	var flag = reg.test(name);
	//如果之前有提示框出现
	if(domFlag){
		domName.removeChild(document.getElementById("tipsName"));
	}
	//用户名为空的情况
	if(name == ""){
		//添加提示节点
		var tipsNull = document.createElement("span");
		tipsNull.setAttribute("id", "tipsName");
		var tipscontent = document.createTextNode("用户名不能为空");
		tipsNull.appendChild(tipscontent);
		tipsNull.style.color = "red";//修改颜色
		domName.appendChild(tipsNull);
		return false;
	}
	//用户名格式错误
	else if(!flag){
		//向input后添加节点
		var spantips = document.createElement("span");
		spantips.setAttribute("id", "tipsName");
		var spancontent = document.createTextNode("用户名为2-7字");
		spantips.appendChild(spancontent);//添加元素内容
		spantips.style.color = "red";
		document.getElementById("Name").value = '';
		domName.appendChild(spantips);//
		return false;
	}
	//姓名格式正确 无事发生
	else{
		return true;
	}
}
//验证年级
function verifyGrade(){
	var grade = document.getElementById("Grade").value;//获得输入的年级
	var domGrade = document.getElementById("grade");//获取父节点
	var domFlag = document.getElementById("tipsGrade");
	var reg = /201[01234]/; //姓名的正则表达式
	var flag = reg.test(grade);
	//如果之前有提示框出现
	if(domFlag){
		//删除之前的提示框
		domGrade.removeChild(document.getElementById("tipsGrade"));
	}
	if(grade==""){
		//输入框为空的情况
		//添加提示节点
		var tipsNull = document.createElement("span");
		tipsNull.setAttribute("id", "tipsGrade");
		var tipscontent = document.createTextNode("年级不能为空");
		tipsNull.appendChild(tipscontent);
		tipsNull.style.color = "red";//修改颜色
		domGrade.appendChild(tipsNull);
		return false;
	}
	else if(!flag){
		//输入格式不正确
		//向input后添加节点
		var spantips = document.createElement("span");
		spantips.setAttribute("id", "tipsGrade");
		var spancontent = document.createTextNode("年级为2010-2014");
		spantips.appendChild(spancontent);//添加元素内容
		spantips.style.color = "red";
		document.getElementById("Grade").value ='';
		domGrade.appendChild(spantips);//
		return false;
	}
	else {
		//输入正确 无事发生
		return true;
	}
}
//验证手机号
function verifyPhoneNumber(){
	var phoneNumber = document.getElementById("PhoneNumber").value;//获取手机号码
	var domPhoneNumber = document.getElementById("phoneNumber");//获取父节点
	var domFlag = document.getElementById('tipsNumber');//错误信息节点
	var reg = /[0-9]{11}/;
	var flag = reg.test(phoneNumber);
	//如果之前有提示框出现
	if(domFlag){
		domPhoneNumber.removeChild(document.getElementById("tipsNumber"));
	}
	if (phoneNumber=="") {
		//添加提示节点
		var tipsNull = document.createElement("span");
		tipsNull.setAttribute("id", "tipsNumber");
		var tipscontent = document.createTextNode("手机号码不能为空");
		tipsNull.appendChild(tipscontent);
		tipsNull.style.color = "red";//修改颜色
		domPhoneNumber.appendChild(tipsNull);
		return false;
	}
	else if(!flag){
		var spantips = document.createElement("span");
		spantips.setAttribute("id", "tipsNumber");
		var spancontent = document.createTextNode("手机号为11位数");
		spantips.appendChild(spancontent);//添加元素内容
		spantips.style.color = "red";
		document.getElementById("PhoneNumber").value ='';
		domPhoneNumber.appendChild(spantips);//
		return false;
	}
	//电话号码格式正确 无事发生
	else {
		return true;
	}
}
//验证邮箱
function verifyEmail(){
	var email = document.getElementById("emailAddress").value;//获得名字
	var domEmail = document.getElementById("email");//获取父节点
	var domFlag = document.getElementById("tipsEmail");
	var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/; //邮箱的正则表达式
	var flag = reg.test(email);
	if(domFlag){
		domEmail.removeChild(document.getElementById("tipsEmail"));
	}
	//邮件为空的情况
	if(email == ""){
		//添加提示节点
		var tipsNull = document.createElement("span");
		tipsNull.setAttribute("id", "tipsEmail");
		var tipscontent = document.createTextNode("邮箱不能为空");
		tipsNull.appendChild(tipscontent);
		tipsNull.style.color = "red";//修改颜色
		domEmail.appendChild(tipsNull);
		return false;
	}
	//邮件格式错误
	else if(!flag){
		//向input后添加节点
		var spantips = document.createElement("span");
		spantips.setAttribute("id", "tipsEmail");
		var spancontent = document.createTextNode("邮箱格式错误");//节点输入内容
		spantips.appendChild(spancontent);//添加元素内容
		spantips.style.color = "red";
		document.getElementById("emailAddress").value = '';//清空输入框
		domEmail.appendChild(spantips);//
		return false;
	}
	//邮箱格式正确 无事发生
	else{
		return true;
	}
}
//验证自我介绍
function verifyIntroduction(){
	var text = document.getElementById("introduction").value;
	var domIntroduction = document.getElementById("myself");//获取父节点
	var domFlag = document.getElementById("tipsMyself");
	//如果之前有错误信息提醒框
	if(domFlag){
		domIntroduction.removeChild(document.getElementById("tipsMyself"));
	}
	if (text=="") {
		var tipsNull = document.createElement("span");
		tipsNull.setAttribute("id", "tipsMyself");
		var tipscontent = document.createTextNode("自我介绍不能为空");
		tipsNull.appendChild(tipscontent);
		tipsNull.style.color = "red";//修改颜色
		domIntroduction.appendChild(tipsNull);
		return false;
	}
	//输入正确 无事发生
	else{
		return true;
	}

}
function verify() {
	var flagName = verifyName();
	var flagGrade = verifyGrade();
	var flagNumber = verifyPhoneNumber();
	var flagEmail = verifyEmail();
	var flagIntroduction = verifyIntroduction();
	//正确通过
	if(flagName && flagGrade && flagNumber && flagEmail && flagIntroduction){
		alert('成功');
		window.open("test2.html");
	}
	else {
		return false;
	}
}