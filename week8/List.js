$(document).ready(function () {
    //图片高度
    const imgHeight =$(".photoContainer").children("img").eq(0).height();
    //容器
    const container =$(".photoContainer");
    var position = container.position();
    //一开始的偏移量
    const topfirst = position.top;
    
      //防止重复点击
      var timeFlag = true;
      var timeout;

      $(".bottom-triangle").click(function (e) { 
        if(timeFlag){
			timeFlag = false;
        //判断当前偏移量
        var position = container.position();
        let top = position.top;
        //判断条件
        let flagTop = topfirst - imgHeight*4;
        top -= imgHeight;
        container.animate({top: top +"px"}, 300);  
        if(top <= flagTop ){
            //当达到最左边的照片
            console.log("test");
            container.animate({top: topfirst +"px"},0);
        } 		
		//一定时间后 才能变化
		if(!timeout){
		timeout=setTimeout(
			function(){
				timeFlag = true;
				timeout = null;//清楚重复设置的延时
			},2000
		);
		}
	    }
      });

      //跳转部分
      const page = $(".paging").children("a");
      console.log(page);
      page.eq(1).addClass("forpage");
});

$("#testpage").click(function (e) { 
    //获取输入的值
    let num = $("#pagenumber").val();
    console.log(num);
    pageflag = /(^[1-9]$)|(^[1][0-8]$)/;
    //超过页面
    let flag = pageflag.test(num);
    if(num == ""){
        alert("输入不能为空！");
    }
    else{
        if(!flag){
            alert("页码输入错误，请重新输入！");
        }
        else{
            alert("输入正确！");
        }
    }
});

