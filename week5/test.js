$("#add").click(function() {
	var content = $("#input").val();//获取文本框的输入值
	//是否输入的判断
	if(content!=""){
	var iconDelet = $("<div id='delet'></div>");
	var li = $("<li class='li'>"+content+"</li>");
	//添加DOM节点
	$("#ul").append(li);
	li.append(iconDelet);
	事件绑定2
	$("#ul").delegate(".li","click",function(){
		//line为封装好的属性
		$(this).toggleClass("line");
	});
	$("#ul").delegate("#delet","click",function() {
		$(this).parent().remove();
		$(this).remove();
	});
	}
	else {
	//输入框为空的情况
	alert("输入框不能为空");
	}
});

	$("#ul").on("click",".li",function(event) {
		//把属性封装 直接切换
		$(this).toggleClass("line");
	});
	$("#ul").on("click","#delet",function(event) {
		$(this).parent().remove();
		$(this).remove();
	});
