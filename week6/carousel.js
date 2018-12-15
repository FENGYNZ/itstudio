function setSize (width,height){
	//设置容器的宽度
	$(".container").css({
		width: width + "px",
		height: height + "px"
	});
	//设置图片宽度
	$(".photoContainer").children("img").css({
		width: width + "px",
		height: height + "px"
	});
	$(".photoContainer").css({
		left:-width + "px"
	});
}


$(document).ready(function($) {
	//设置容器宽度
	setSize(700,400);
	//小圆点
	const dot = $(".dots").children('li');
	//左边的按钮
	const leftIcon = $(".left-triangle");
	//右边的按钮
	const rightIcon = $(".right-triangle");
	//圆点的父元素
	const dotFather = $(".dots");
	//展示区容器
	const showContainer = $(".container");
	//图片的容器
	const container = $(".photoContainer");
	//获取图片的宽度
	var imgWidth = container.children('img').eq(0).width();
	//获取原点的数量
	var length = dot.length;
	//定时器
	var time;
	// 防止重复的点击
	var timeFlag = true;
	// 延时装置 防止重复点击
	var timeout;
	//默认第一个小圆点是亮的
	dot.eq(0).addClass("redDot");
	//周期性播放事件

	function run(){
	clearInterval(time);
	time = setInterval(function(){
		//亮小圆点
		dot.each(function(){
			//如果是当前图片
			if($(this).hasClass("redDot")){
				num = $(this).index()+ 1;
			//图片移动
				container.animate({
					//去掉收尾用于衔接的图片的宽度
					left :-num*imgWidth - imgWidth + "px"
				},800);
				//到达最后一张，从头开始
				if(num == length){
					container.animate({
						left:-imgWidth+"px"
					},0);
					num = 0;
				}
			}
		});
			//改变相应小圆点的样式
			dot.eq(num).addClass("redDot");
			//移除其他小点的样式
			dot.eq(num).siblings("li").removeClass('redDot');
		},2000);
	}
	run();

	
	//左边按钮添加事件
	leftIcon.click(function(event) {
		if(timeFlag){
			timeFlag = false;
		let flag; 
		//判断当前在哪一个照片
		dot.each(function(){
			//将图片容器向右移动
			if($(this).hasClass('redDot')){
				flag = $(this).index() - 1;
					container.animate({left: -flag * imgWidth - imgWidth+"px"}, 300);
				//当达到最左边的时候
				if(flag < 0){
					flag = length-1;
					container.animate({left: -flag * imgWidth - imgWidth+"px"}, 0);
				}

			}
		});
		//图标按钮改变
		dot.eq(flag).addClass('redDot');
		dot.eq(flag).siblings('li').removeClass('redDot');
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


	//右边按钮添加事件
	rightIcon.click(function(event) {
		let flag ;//判断当前在哪一个照片
		if(timeFlag){
			timeFlag = false;
		dot.each(function(){
			//将图片容器向左移动
			if($(this).hasClass('redDot')){
				flag = $(this).index() + 1;
				console.log(flag);
				container.animate({left: -flag * imgWidth - imgWidth +"px"}, 300);
				//当达到最右边的时候 回到最左边
				if(flag == length){
					flag = 0;
					container.animate({left: -imgWidth + "px"}, 0);
				}
			}
		});
		//图标按钮改变
		dot.eq(flag).addClass('redDot');
		dot.eq(flag).siblings('li').removeClass('redDot');
	}
	//防止重复提交
	if(!timeout){
		timeout=setTimeout(
			function(){
				timeFlag = true;
				timeout = null;//清楚重复设置的延时
			},1000
		);
		}
	});

	//给小点添加事件 事件委托
	dotFather.on("click","li",function(event) {
		if(timeFlag){
			timeFlag = false;
		$(this).addClass('redDot');
		$(this).siblings('li').removeClass('redDot');
		//获取当前序号
		let flag = $(this).index();
		container.animate({
			left: -flag*imgWidth - imgWidth + "px"},
			300);
		}
		//防止重复点击
		if(!timeout){
			timeout=setTimeout(
				function(){
					timeFlag = true;
					timeout = null;//清楚重复设置的延时
				},1000
			);
			}
	});

	//鼠标移动到窗口内
	showContainer.mousemove(function(event) {
		clearInterval(time);
	});
	//鼠标移动出窗口
	showContainer.mouseout(function(event) {
		run();
	});
});