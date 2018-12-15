const can = document.getElementById("myCanvas");
const ctx = can.getContext("2d");
// //雪花的原型
// function Snow (x, y, radius){
// 	this.x = x;
// 	this.y = y;
// 	this.radius = radius;
// }

// function Sky(){	
// }
// Sky.prototype = {
// 	//画布的宽和高
// 	wid:window.innerWidth, // 屏幕宽度
// 	hei:window.innerHeight, //屏幕的高度
// 	snowNum:100, //雪花的数量
// 	snows:new Array(), // 存放雪花的数组
// 	//初始化雪花
// 	creat: function(){
// 	 //雪花的数组 
// 		for(let i = 0;i<this.snowNum;i++){
// 			let randomX = Math.random() * this.wid;
// 			let randomY = Math.random() * this.hei;
// 			let randomRadius = Math.random() * 10 + 1;
// 			snow = new Snow(randomX,randomY,randomRadius);//每次要new一个Snow对象
// 			this.snows.push(snow);
// 		}
// 	},
// 	//雪花飘落
// 	fall: function(){
// 		for(let i = 0; i<this.snowNum; i++){
// 			this.snows[i].y += Math.random() * 5 + 1;
// 			if(this.snows[i].y >this.hei){
// 				this.snows[i].y = 0;
// 			}
// 			this.snows[i].x += Math.random() * (-2) + 1;
// 			if(this.snows[i].x > this.wid){
// 				this.snows[i].x = 0;
// 			}
// 		}
// 	},
// 	//画雪花
// 	draw: function(){
// 		can.width = this.wid;
// 		can.height = this.hei;
// 		ctx.clearRect(0,0,this.wid,this.hei);
// 		ctx.fillStyle = "white";
// 		ctx.beginPath();
// 		//画每个雪花
// 		for (let i = 0; i< this.snowNum; i++){
// 			ctx.moveTo(this.snows[i].x,this.snows[i].y);
// 			ctx.arc(this.snows[i].x, this.snows[i].y, this.snows[i].radius,0,2*Math.PI,false);
// 		}
// 		ctx.fill();
// 		//更新雪花的坐标
// 		this.fall();
// 		ctx.closePath();
// 	},
// 	snowing:function(){
// 		//!!!一定要加（）=》！！！
// 		// setInterval(() => {
// 		// 	this.draw();
// 		// }, 60);
// 		// requestAnimationFrame(this.draw());
// 	}
// };

// let sky = new Sky(); // 画布
// sky.creat();
// sky.snowing();
// // sky.draw();
// setInterval(sky.draw(),200);

//雪花的原型
function Snow (x,y,radius,color,startAngle,endAngle){
	//雪花的基本样式
	this.x = x //x坐标 随机
	this.y = y; //y坐标
	this.radius = radius;//半径
	this.color = color;
	this.startAngle = startAngle;
	this.endAngle = endAngle; //终止角度
}
//雪花运动
Snow.prototype.move = function(){
	this.x += Math.random() *2 + 1;
	this.y += Math.random() *5 +1;
}
//画雪花
Snow.prototype.draw = function(){
	ctx.save();//储存
	ctx.fillStyle = this.color; // 填充颜色
	//绘制雪花
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
	ctx.fill();
	ctx.restore();
	this.move(); // 雪花的坐标改变
}
var arry = [];
var snowNum = 0;
function show(){
	//设置画布的宽和高
	can.height = window.innerHeight;
	can.width = window.innerWidth;// 每次重新创建画布
	let randomX = Math.random() * can.width; //改变的x坐标
	let randomY = Math.random() * can.height;//改变的y坐标
	let randomRadius = Math.random() * 10 + 1; // 半径
	let pi = 2 * Math.PI;
	let snow = new Snow(randomX,randomY,randomRadius,"white",0,pi);//创建雪花
	arry.push(snow); // 添加进入数组
	for(let i in arry){
		arry[i].draw();
	}
	snowNum++; //执行一次添加一个雪花
	//添加100个雪花就删除数组里面的50个雪花
	if(snowNum>100){
		arry.splice(0,50);
		console.log("test");
		snowNum = 0;
	}
	requestAnimationFrame(show);
}
show();