# jQuery实现类似淘宝轮播图

本周的作业是写一个类似淘宝首页的jQuery轮播图，这里做出记录。

如有错误，欢迎批评指证。



## html实现静态的布局

### 静态布局分析

一个轮播图静态的部分分为三个

- 展示区
- 图片的储存部分
- 左右按钮
- 下方小圆点作为提示部分

#### html部分代码

```javascript
	<div class="container"> <!-- 展示区 -->
		<div class="photoContainer">
			<img src="img/3.jpg" alt="3" >
			<img src="img/1.jpg" alt="1" >
			<img src="img/2.jpg" alt="2" >
			<img src="img/3.jpg" alt="3" >
			<img src="img/1.jpg" alt="1" >
		</div>
		<ul class="dots">  <!-- 三个小按钮 -->
			<li class="dot"></li>
			<li class="dot"></li>
			<li class="dot"></li>
		</ul>
		<div class="left-triangle"> <!-- 向左的箭头 -->
			<img src="img/left_arrow.png" id="left">
		</div>
		<div class="right-triangle"> <!-- 向右的箭头 -->
			<img src="img/left_arrow.png" id="right">
		</div>
	</div>
```

***



#### css部分

- 设置展示区 container的样式

```css
.container{
	width: 600px; 
	height: 400px; /*宽和高可以自己设置*/
	background: black;
	margin:20px auto;
	overflow: hidden; 
	position: relative;
}
```



**利用overflow属性将超出展示区的部分隐藏**

**图片的容器依靠展示区的容器定位 设置position属性**

- 设置图片的容器 和 图片

```css
.photoContainer{
	position: absolute;
	left: -600px;
	display: inline-block;
	white-space: nowrap;
}
.photoContainer img{
	width: 600px;
	height: 400px; /*和展示区的长宽设置为一样的*/
	margin: 0;
	padding: 0;
	display: inline-block;
}
```

***



- 左右箭头的设置

```css
.left-triangle{
	position: absolute;
	top: 50%;
	left: 0;
	margin-top:-27.2px;
	margin-left:-37px;
	transition: margin-left 1s;
	cursor: pointer;
}
.right-triangle{
	position: absolute;
	top: 50%;
	right: 0;
	margin-top:-27.2px;
	margin-right:-37px;
	transition: margin-right 1s;
	cursor: pointer;
}
#right{
	transform: rotate(180deg); /*顺时针旋转180°*/
}
```

***



- 小圆点部分

```css
.dots{
	width: inherit;/*获取父元素的相应值*/
	position: absolute;
	bottom: 10px;
	text-align: center;
}
.dot{
	display: inline-block;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: white;
	margin-right: 20px;
	cursor: pointer;
}
.redDot{
	background: red;
}
```

**其中的.redDot是高亮显示的样式**

***



- 设置部分动画 让左右箭头的出现和消失

```css
/*暂时css确定鼠标移动到 出现左右小图标*/
.container:hover .left-triangle{
	margin-left:0;
}
.container:hover .right-triangle{
	margin-right:0;
}
```



## jQuery 逻辑部分

### 功能分析

- 自动循环播放
- 点击箭头实现图片替换
- 鼠标放入容器内循环停止
- 鼠标移开容器 循环继续
- 下方原点根据图片响应的滚动 并且点击可以移动到相应的图片

### 功能实现

#### 1）自动循环播放

这个部分的难点在于：

- 第一张和最后一张如何无缝的衔接。
- 如何实现循环播放

对于第一个问题：

**一个小技巧就是在要展示的图片的第一张前面放最后一张**

**最后一张图片的后面放上第一张图片**

代码如下：

```html
<div class="photoContainer">
    <img src="img/3.jpg" alt="3" >
    <img src="img/1.jpg" alt="1" >
    <img src="img/2.jpg" alt="2" >
    <img src="img/3.jpg" alt="3" >
    <img src="img/1.jpg" alt="1" >
</div>
```



第二个问题：

1. 使用**定时器**

- `setInterval()`方法会重复调用一个函数或执行一个代码段，在每次调用之间具有固定的时间延迟，返回一个`intervalID`，可以作为参数传给`clearInterval()`来取消该定时器。

2. **利用图片容器的宽度，不断移动left的定位，就可以让图片每次在展示区显示一次**
3. 使用**animate**属性让图片有拖动的效果

解决的了以上两个问题就可以写定时器部分

```javascript
	//默认第一个小圆点是亮的
	$(".dots").children("li").eq(0).addClass("redDot");

	//获取图片的宽度
	var imgWidth = $(".photoContainer").children('img').eq(0).width();

	//获取原点的数量
	var length = $(".dots").children('li').length;
//设置定时器的变量
	var time;
function run(){
	clearInterval(time); //清除迭代器防止鬼畜
	time = setInterval(function(){
		//亮小圆点
		$(".dots").children('li').each(function(){
			//如果是当前图片
			if($(this).hasClass("redDot")){
				num = $(this).index()+ 1;
			//图片移动
				$(".photoContainer").animate({
					//去掉收尾用于衔接的图片的宽度
					left :-num*imgWidth - imgWidth + "px"
				},800);
				//到达最后一张，从头开始
				if(num == length){
					$(".photoContainer").animate({
						left:-imgWidth+"px"
					},0);
					num = 0;
				}
			}
		});
			//改变相应小圆点的样式
			$(".dots").children('li').eq(num).addClass("redDot");
			//移除其他小点的样式
	$(".dots").children('li').eq(num).siblings("li").removeClass('redDot');
		},2000);
	}
```



注意：

- **此处是根据遍历小圆点的样式来判断当前是哪一个图片，避免全局变量统计。以便实现之后的功能**
- **使用定时器之前一定要清除定时器。不然多次点击之后就会出现非常鬼畜的速度。**

---



#### 2) 鼠标移入和移除实现停止和继续移动

给容器添加相应的清除和创建定时器事件就可以实现：

```javascript
		//鼠标移动到窗口内
	$(".container").mousemove(function(event) {
		clearInterval(time);
	});
//移出窗口内
	$(".container").mouseout(function(event) {
		run();
	});
```

#### 3）点击左边箭头向左移动

难点：**第一张图片移动到最后一张图片**

可以通过在第一张图片的dom结构之前加最后一张图片，直接用animate属性向左移动，时间为0.多添加的图片就作为铺垫效果。实现无缝链接

```javascript
//当达到最左边的时候
if(flag < 0){
flag = length-1;
$(".photoContainer").animate({left: -flag * imgWidth - imgWidth+"px"}, 0);
}
```

整体代码

```javascript
	$(".left-triangle").click(function(event) {
		var flag; 
		//判断当前在哪一个照片
		$(".dots").children('li').each(function(){
			//将图片容器向右移动
			if($(this).hasClass('redDot')){
				flag = $(this).index() - 1;
					$(".photoContainer").animate({left: -flag * imgWidth - imgWidth+"px"}, 300);
				//当达到最左边的时候
				if(flag < 0){
					flag = length-1;
					$(".photoContainer").animate({left: -flag * imgWidth - imgWidth+"px"}, 0);
				}

			}
		});
		//图标按钮改变
		$(".dots").children('li').eq(flag).addClass('redDot');
		$(".dots").children('li').eq(flag).siblings('li').removeClass('redDot');
	});
```

#### 4) 点击右边箭头向右移动

与左边箭头类似 只需在最后一张后面添加第一张图片，同时annimate时间设置为0.

```javascript
//右边按钮添加事件
	$(".right-triangle").click(function(event) {
		var flag ;//判断当前在哪一个照片
		$(".dots").children('li').each(function(){
			//将图片容器向左移动
			if($(this).hasClass('redDot')){
				flag = $(this).index() + 1;
				console.log(flag);
				$(".photoContainer").animate({left: -flag * imgWidth - imgWidth +"px"}, 300);
				//当达到最右边的时候 回到最左边
				if(flag == length){
					flag = 0;
					$(".photoContainer").animate({left: -imgWidth + "px"}, 0);
				}
			}
		});
		//图标按钮改变
		$(".dots").children('li').eq(flag).addClass('redDot');
		$(".dots").children('li').eq(flag).siblings('li').removeClass('redDot');
	});
```

#### 5) 点击圆点切换图片

利用事件委托 给父元素添加事件。判断当前图片并进行移动。

```javascript
//给小点添加事件 事件委托
	$(".dots").on("click","li",function(event) {
		$(this).addClass('redDot');
		$(this).siblings('li').removeClass('redDot');
		//获取当前序号
		var flag = $(this).index();
		$(".photoContainer").animate({
			left: -flag*imgWidth - imgWidth + "px"},
			300);
	});
```

