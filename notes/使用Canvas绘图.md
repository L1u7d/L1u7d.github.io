 ### 基本用法

* 要使用canvas元素，首先要设置其width和height属性，指定绘制区域的大小。

```html
<canvas id="drawing" width="200" height="200">A drawing of something</canvas>
```

* 要在画布上绘图，需要取得上下文，取得上下文对象的引用，需要调用getContext()方法传入上下文的名字

```js
var drawing = document.getElementById("drawing");
//判断浏览器是否支持<canvas>元素
if(drawing.getContext){
  var context = drawing.getContext("2d");
}
```

### 2D上下文

#### 填充和描边

* fillStyle()和strokeStyle()
* 这两个属性的值可以是字符串、渐变对象或模式对象，默认值为#000000

```js
var drawing = document.getElementById("drawing");
if(drawing.getContext){
  var context = drawing.getContext("2d");
  context.strokeStyle = "red";
  context.fillStyle = "#0000ff";
}
```

#### 绘制矩形

* fillRect()、strokeRect()、clearRect()
* 接受四个参数
  * 矩形的x坐标
  * 矩形的y坐标
  * 矩形的宽度
  * 矩形的高度
* fillRect()在画布上绘制的矩形会填充指定的颜色。填充的颜色通过fillStyle属性指定

```js
var drawing = document.getElementById("drawing");
if(drawing.getContext){
  var context = drawing.getContext("2d");
  context.fillStyle = "#ff0000";
  context.fillRect(10,10,50,50);
  
  context.fillStyle = "rgba(0,0,255,0.5)";
  context.fillRect(30,30,50,50);
}
```

* strokeRect()在画布上绘制的矩形会使用指定的颜色进行描边，描边的颜色通过strokeStyle属性来指定

```js
var drawing = document.getElementById("drawing");
if(drawing.getContext){
  var context = drawing.getContext("2d");
  context.strokeStyle = "#ff0000";
  context.strokeRect(10,10,50,50);
  
  context.strokeStyle = "rgba(0,0,255,0.5)";
  context.strokeRect(30,30,50,50);
}
```

*  clearRect()用来清除画布上的矩形区域。

