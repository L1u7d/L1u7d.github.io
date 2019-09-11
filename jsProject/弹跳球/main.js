// 设定画布
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min,max) {
  return Math.floor(Math.random()*(max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}
// 构建小球对象
/*参数说明： 
* x,y：小球在屏幕上最开始的位置。
* velX，velY：水平和竖直速度。
* color：小球颜色。
* size：小球大小
*/
function Ball(x,y,velX,velY,color,size) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.color = color;
	this.size = size;
}
//小球draw函数
Ball.prototype.draw = function(){
	ctx.beginPath(); //开始路径，画图形。
	ctx.fillStyle = this.color; //定义小球颜色
	ctx.arc(this.x,this.y,this.size,0,2*Math.PI); //画圆弧：x,y圆弧中心坐标（小球中心坐标），this.size小球的半径，最后两个参数代表开始和结束（圆弧的夹角）
	ctx.fill();//结束绘画，进行颜色填充。
}
//小球运动
Ball.prototype.update = function(){
	//判断小球x方向是否碰到右侧，并进行反转方向
	if ((this.x+this.size) >= width) {
		this.velX = -(this.velX);
	}
	////判断小球x方向是否碰到左侧，并进行反转方向
	if ((this.x-this.size) <= 0) {
		this.velX = -(this.velX);
	}
	//判断是否碰到上下侧
	if ((this.y+this.size) >= height) {
		this.velY = -(this.velY);
	}
	if ((this.y-this.size) < 0) {
		this.velY = -(this.velY);
	}
	// 小球每次移动的坐标变化
	this.x += this.velX;
	this.y += this.velY;
}
//定义小球数组
var balls = [];
//运动循环
function loop(){
	ctx.fillStyle = "rgba(0,0,0,0.25)"; //将画布设置为半透明黑色
	ctx.fillRect(0,0,width,height); //画出一个充满整个画布的矩形
	//这是在下一个视图画出来时遮挡之前视图，如果不遮挡，看到的是蛇形的形状，半透明是可以看到之前的轨迹

	//创建25个小球
	while (balls.length <25) {
		var ball = new Ball(
			random(0,width),
			random(0,height),
			random(-7,7),
			random(-7,7),
			randomColor(),
			random(10,20)
			);
		balls.push(ball);
	}
	//遍历小球数组，画出每个小球并运动
	for(var i = 0; i <balls.length; i++){
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}
	//递归，在运行一次本函数
	requestAnimationFrame(loop);
}
//碰撞检测
Ball.prototype.collisionDetect = function() {
	for(var j = 0; j < balls.length; j++){
		//检测两球是否是同一个
		if(!(this === balls[j])) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);
			//相撞时，颜色随机
			if (distance < this.size + balls[j].size) {
				balls[j].color = this.color = randomColor();
			}
		}
	}
}
loop();
