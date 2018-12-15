$(document).ready(function () {
    const bottom = $(".bottom-triangle");
    //图片高度
    const imgHeight =$(".photoContainer").children("img").eq(0).height()+2;
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




});