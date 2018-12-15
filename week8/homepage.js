//reaction部分
$(document).ready(function () {
    
    const appear = $("#appear");
    const reaction = $(".reaction");
    appear.mouseover(function () { 
        reaction.css("display","block");
    });
   appear.mouseout(function () { 
        reaction.css("display","none");
    });
    reaction.mouseover(function () { 
        reaction.css("display","block");
    });
    reaction.mouseout(function () { 
        reaction.css("display","none");
    });

    //轮播部分
    const leftIcon = $(".triangle_left");//左边的按钮
    const rightIcon = $(".triangle_right");//右边的按钮
    //展示区内容
    const showcontainer  = $(".showcontainer");
    //获取图片的宽度
    var imgWidth = showcontainer.children("img").eq(0).outerWidth(true);
    var position = showcontainer.position();
    //左偏移量
    const leftfirst = position.left;
    

    //防止重复点击
    var timeFlag = true;
    var timeout;
    //左边按钮添加事件
    leftIcon.click(function(event) {
		if(timeFlag){
			timeFlag = false;
        //判断当前偏移量
        var position = showcontainer.position();
        let left = position.left;
        //判断条件
        let flagLeft = leftfirst - imgWidth*4;
        left -= imgWidth;
        showcontainer.animate({left: left +"px"}, 300);  
        if(left <= flagLeft ){
            //当达到最左边的照片
            console.log("test");
            showcontainer.animate({left: leftfirst +"px"},0);
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
    //为右边按钮添加事件
    rightIcon.click(function(event) {
		if(timeFlag){
			timeFlag = false;
        //判断当前偏移量
        var position = showcontainer.position();
        let left = position.left;
        //判断条件
        let flagright = leftfirst + imgWidth*4;
        left += imgWidth;
        showcontainer.animate({left: left +"px"}, 300);
        if(left >= flagright){
            //当达到最右边的照片
            timesRight = 0;
            showcontainer.animate({left: leftfirst +"px"},0);
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


//置顶键部分
$(function(){
    
    //获取head的高度
    var headHeight = $(".head").height();
    
    //页面监听滚动
    $(window).scroll(function () { 
        
        //获取当前页面滚动高度
        let windowTop = $(window).scrollTop();
        
        //页面滚动超过head时执行的代码
        if(windowTop>headHeight){
            //position设置成 fixed top为0
           $(".float").addClass("float_fixed");
        }
        else{
            //去除添加的样式
            $(".float").removeClass("float_fixed");
        }

    });

});
