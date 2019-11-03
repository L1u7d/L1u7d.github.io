## 原生JS与jQuery的区别

1. 原生js会等到DOM元素加载完毕，并且body里的元素例如图片加载完才执行；jQuery会等到DOM 元素加载完，但不会等到body里的元素也加载才执行。
2. 原生JS如果编写了多个入口函数，后面的会覆盖前面的；jQuery中编写的多个入口函数，后面的不会覆盖前面的

## jQuery的入口函数的写法

1. 第一种写法

   ```js
    $(document).ready(function(){
    	alert('ddd');
    }
   ```

2. 第二种写法

   ```js
    jQuery(document).ready(function(){
    	alert('ddd');
    }
   ```

3. 第三种写法（推荐）

   ```js
    	$(function (){
    		alert("ddd");
    	})
   ```

4. 第四种写法

   ```js
    jQuery(function (){
    		alert("ddd");
    	})
   ```

### jQuery冲突问题

- $在jQuery中频繁使用，若使用多个框架，都使用了$符号 

  1. 释放$的使用权，

     ```
     jQuery.noConflict();
     ```

      以后使用jQuery 

     - 注意： 释放操作前必须在编写其他jQuery之前编写，释放之后不能使用$符号了，只能使用jQuery

  2. 自定义一个访问符号，`var nj = jQuery.noConflict();`

### jQuery的核心函数

* $();就代表着调用jQuery的核心函数

  1. 接受一个函数

     ```javascript
     $(function(){
         alert("ddd");
     })
     ```

  2. 接受一个字符串，包括字符串选择器和一段代码

     ```js
     var $box1 = $('.box1');
     var $p = $('<p>我是段落</p>');
     ```

  3. 接受一个DOM元素，会被包装成一个jQuery对象返回给我们

     ```js
     var span = document.getElementByTagName('span');
     var $span = $(span)
     ```

### jQuery对象

1. 什么是jQuery对象
   * jQuery对象是一个伪数组

2. 什么是伪数组
   * 有0到length-1的属性，并且有length属性

### 静态方法

**示例代码**

```js
var arr = [1,3,5,7,9]	//数组
var obj = {0:1,1:2,2:3,length:3}//伪数组
```

1. each方法

   * jQuery中的each方法

     * 利用jQuery的each静态方法遍历数组，也可以遍历伪数组

       ```js
       $.each(arr,function(index,value){....})
       ```

   * 原生js中的each方法

     * 原生Js中的forEach方法只能遍历数组，不能遍历伪数组

       ```js
       arr.forEach(function(value,index){....})
       ```

2. map 方法

   * 原生js的map方法

     * 不能遍历伪数组

       ```js
       arr.map(function(value,index,array){....})//array指的是当前被遍历的数组
       ```

   * jQuery中的map方法

     * 可以遍历伪数组

       ```js
       $.map(arr,function(value,index){...});
       ```

3. jQuery中的each方法和map方法的区别

   * each方法默认的返回值就是，遍历谁就返回谁，map方法默认的返回值是一个空数组；

   * each方法不支持在回调函数中对遍历数组进行处理，而map方法可以在回调函数中通过return对遍历数组进行处理，然后生成一个新的数组返回。

     ```js
     $.each(arr,function(index,value){
     	return index+value; //这是不可以的
     });
     
     $.map(arr,function(value,index){
     	return index+value;//这是可以的
     });
     ```

4. 其他方法

   ```js
   var str = "   lqd    ";
   ```

   * trim方法

     * 清除字符串两端的空格，返回去除之后的字符串

       ```js
       var res = $.trim(str);
       ```

   * isWindow方法

     * 用来判断传入的参数是否为window对象，返回Boolean值

       ```js
       var res = $.isWindow(arr/obj/function...);
       ```

   * isFunction方法

     * 用来判断传入的参数是否为函数，返回Boolean值

       ```js
       var res = $.isFunction(arr/obj/...);
       ```

     * jQuery本质上是一个函数

   * isArray方法

     * 用来判断传入的参数是否为数组，返回Boolean值

       ```js
       var res = $.isArray(arr/obj/...);
       ```

### 属性和属性方法

1. **属性**

   * 什么是属性
     * 对象身上保存的变量就是属性

   * 如何操作属性
     * 对象.属性名称 = 值 /对象["属性名称"]	/对象.属性名称

   * 什么是属性节点
     * 在编写HTML代码时，在HTML标签中添加的属性就是属性节点

   * 如何操作属性节点
     * DOM元素.setAttribute("属性名称","值"); //设置属性值
     * DOM元素.getAttribute("属性名称"); // 获取属性值

   * 属性与属性节点的区别
     * 任何对象都有属性，只有DOM元素才有属性节点

2. **属性（节点）方法**

   1. attr方法

      * 获取或者设置属性节点的值，可以传递一个参数，也可以传递两个参数、

      * **获取：**无论找到多少个元素，只会返回第一个元素的属性值

      * **设置：**找到多少个元素，就设置多少个元素的属性值，设置的属性不存在，系统就会自动添加属性和属性值。

        ```js
        $("span").attr("class");//获取span元素的class属性值
        $("span").attr("class","box");//设置span元素的class属性值为box
        ```

   2. removeAttr方法

      * 删除属性节点，删除所有找到的属性节点

        ```js 
        $("span").removeAttr("class name"); // 
        ```

      * 删除span元素的class和name属性节点，要删除的属性节点以空格隔开

   3. prop方法

      * 方法不仅能操作属性，还能操作属性节点

        ```js
        $("span").prop("class"); // 获取span元素的class属性节点值
        $("span").prop("class","sss"); // 设置span元素属性节点class的值
        ```

      * 和attr的使用场景

        ```js
        <input type="checkbox" checked>
        $("input").prop("checked"); // 返回true
        $("input").attr("checked"); // 返回checked
        <input type="checkbox">
        $("input").prop("checked"); // 返回false   
        $("input").attr("checked"); // 返回undefined
        ```

      * **故在操作属性节点时，具有true和false两个属性的属性节点，如checked、selected、disabled使用prop()方法，其他使用attr()。**

### CSS类

1. addClass方法

   * 添加一个类，添加的多个在类名之间以空格隔开

     ```js
     $("div").addClass("class1"); // 给div元素添加一个类：class1;
     ```

2. removeClass方法

   * 删除一个类，删除多个以空格隔开

     ```js
     $("div").removeClass("class1"); // 将div元素中的class1类删除
     ```

3. toggleClass方法

   * 切换类，有就删除，没有就添加

     ```js
     $("div").toggleClass("class1 class2");
     ```

### html代码/文本/值

1. html方法

   * 和原生中的innerHTML一样

     ```js
     $("div").html("<p>我是一个段落</p>"); // 给div元素添加一个p标签
     ```

2. text方法

   * 和原生的innerText方法一样

     ```js
     $("div").text("<p>我是一个段落</p>");
     ```

3. value方法

   ```js
   $("input").val("请输入值");
   ```

### CSS

1. 逐个设置

   ```js
   $("div").css("width","100px");
   $("div").css("height","100px");
   ```

2. 链式设置

   ```js
   $("div").css("width","100px").css("height","100px");
   ```

   * **如果链式操作大于三步，建议分开。**

3. 批量设置（推荐使用）

   ```js
   $("div").css({
   	width:"100px",
   	height:"100px"
   })
   ```

4. 获取CSS值

   ```js
   $("div").css("background");
   ```

### 位置和尺寸

1. offset方法

   * 获取元素距离窗口的偏移量

     ```js
     $(".son").offset().left; // 获取类为.son的元素到窗口左侧的距离
     ```

   * 设置元素距离窗口的偏移量

     ```js
     $(".son").offset({
     	left:10
     })
     ```

2. position方法

    * 获取元素距离定位元素的偏移量

      ```js
      $(".son").position().left; 
      ```

   * 设置元素距离定位元素的偏移量

     ```js
     position()不能设置
     	$(".son").position({
     		left:10
     	})
     ```

3. scrollTop方法

   * 用来获取元素滚动的距离

     ```js
     $(".scroll").scrollTop();
     ```

   * 获取网页的滚动距离

     ```js
     $("html/body").scrollTop();	
     ```

     * 为了保证浏览器的兼容，获取网页滚动的偏移需要按照以下写法

       ```js
       $("html").scrollTop()+$("body").scrollTop()
       ```

   * 设置元素的滚动距离

     ```js
     $(".scroll").scrollTop(100);
     ```

   * 设置网页的滚动距离

     ```js
     $("html/body").scrollTop(100);	
     ```

     * 为了保证浏览器的兼容，获取网页滚动的偏移需要按照如下写法

       ```js
       $("html,body").scrollTop()
       ```

### 事件

1. jQuery中的两种绑定事件方式

   1. eventName

      * 编码效率略高、部分jQuery事件没有实现，所以不能添加

      * 可以同时添加多个事件，不会覆盖

        ```js
        $("button").click(function(){
        	......
        })
        ```

   2. on(eventName,function)

      * 编码效率略低、所有js事件都可以添加

      * 可以同时添加多个事件，不会覆盖

        ```js
        $("button").on("click",functio(){
        	.....
        })
        ```

2. jQuery事件移除

   * off()

     1. 如果不传递参数，会移除所有事件

        ```js
        $("button").off();
        ```

     2. 如果传递参数，会移除所有指定的事件

        ```js
        $("button").off("click");
        ```

     3. 如果传递两个参数，会移除指定事件的指定方法

        ```js
        $("button").off("click",funtion1);
        ```

3. jQuery事件冒泡和默认行为

   1. 事件冒泡

      ```js
      $(".son").click(function(){
      	....
      });
      $(".father").click(funtion(){
      	......
      })
      ```

      * 子类事件响应完会响应父类事件，由里向外，由下级向上级，层层响应

   2. 阻止事假冒泡

      * 在回调函数中return false，可以阻止事件冒泡

        ```js
        $(".son").click(function(){
        	....
        	return false;
        });
        ```

      * 使用event.stopPropagation()，也可以阻止事件冒泡

        ```js
        $(".son").click(function(event){
        	....
        	event.stopPropagation();
        });
        ```

   3. 默认行为
      
   * 默认的a标签等点击会自动进行下一步，如跳转到链接、提交表单等
      
   4. 阻止默认行为

      * 使用event.preventDefault(),也可以阻止事件默认行为

        ```js
        $("a").click(function(event){
        	....
        	event.preventDefault();
        });
        ```

4. jQuery事件自动触发

   * 在加载页面时自动触发事件

   1. **trigger()**

      ```js
      $(".son").trigger("click"); //自动触发子类的click事件
      ```

   2. **triggerHandler()**

      ```js
      $(".son").triggerHandler("click"); //自动触发子类的click事件
      ```

   3. **两者的区别**
      * trigger()会触发冒泡事件，triggerHandler()不会触发冒泡事件
      * trigger()会触发默认行为，triggerHandler()不会触发默认行为

   4. **特殊情况**

      ```html
      <a href="https://www.baidu.com">注册</a>
      ```

      * 给a标签添加点击事件

        ```js
        $("a").click(function(){
        	alert("a");
        })
        ```

      * 使用triggerHandler()不会触发默认行为

        ```js
        $("a").triggerHandler("click");
        ```

      * 使用trigger()也不会触发默认行为

        ```js
        $("a").trigger("click");
        ```

      * 解决方法

        ```html
        <a href="https://www.baidu.com"><span>注册</span></a>
        ```

        ```js
        $("span").click(function(){
        	alert("a");
        });
        $("span").trigger("click");
        ```

5. 自定义事件

   * 想要自定义事件，要满足两个条件

     * 事件必须是通过on绑定的

     * 事件必须是通过trigger来触发的

       ```js
       $(".son").on("myClick",function(){
       	alert("a");
       });
       $(".son").trigger("myClick");
       ```

6. 事件的命名空间

   * 想要事件的命名空间有效，要满足两个条件

     * 事件必须是通过on绑定的

     * 事件必须通过trigger来触发

       ```js
       $(".son").on("click.zz",function(){
       	alert("a");
       });
       $(".son").on("click.ll",function(){
       	alert("a");
       });
       $(".son").trigger("click.zz");
       ```

   * 利用trigger触发子元素带命名空间的事件，父元素带相同命名空间的事件也会被触发，而父元素没有命名空间的事件不会被触发
   * 利用trigger触发子元素不带命名空间的事件，子元素所有相同类型的事件和父元素所有相同类型的事件都会触发。

7. 事件委托

   * **事件委托**

     请别人帮忙做事情，做完后将结果反馈给我们。

   * **Example：**

     ```html
     <ul>
     	<li>我是第一个</li>
     	<li>我是第二个</li>
     	<li>我是第三个</li>
     </ul>
     <button>添加</button>
     ```

     ```js
     $(function(){
      	$("button").click(function(){
       		$("ul").append("<li>我是新添加的</li>");
     	});
     	$("ul>li").click(function(){
       		console.log(this);
     	 })
     })
     ```

     * 新添加的不会显示，是因为入口函数在DOM元素加载完后才执行，先添加的li元素事件失效

     * 将li的事件委托给存在的ul。

       ```js
       $("ul").delegate('li', 'click', function(event) {
           console.log(this);
       });
       ```

8. 事件的移入移出

   1. 移入事件mouseover()

      ```js
      $(".father").mouseover(function(event) {
      	console.log("fatehr被移入");
      });
      ```

   2. 移出事件mouseout();

      ```js
      $(".father").mouseout(function(event) {
      	console.log("father被移出");
      });
      ```

      * 子元素的移入移出也会触发父元素事件（冒泡事件）

      * **解决方法：**

        ```js
        $(".father").mouseenter(function(event) {
          console.log("fatehr被移入");
         });
         $(".father").mouseleave(function(event) {
          console.log("father被移出");
         });
        ```

      * **mouseenter()和mouseleave()不会触发冒泡事件。**

   3. 移入移出hover()

      ```js
      $(".father").hover(function() {
        console.log("father被移入");
      }, function() {
        console.log("father被移出");
      });
      ```

      * **不会触发冒泡事件。**

### jQuery效果

* 基本

  1. **show()**

     ```js
     $("button").click(function(){
     	$("div").show(1000,function{
     	//动画执行完之后调用
          })
     }); //1秒钟
     ```

  2. **hide()**

     ```js
     $("button").click(function(){
     	$("div").hide(1000,function{
     	//动画执行完之后调用
     	})
     }); //1秒钟
     ```

  3. **toggle()**

     ```js
     $("button").click(function(){
     	$("div").toggle(1000,function{
     	//动画执行完之后调用
     	})
     }); //1秒钟
     ```

* 滑动（展开收起）

  * **slideDown() //展开**

    ```js
    $("div").slideDown(1000,function(){
       //动画执行完后调用
    })；
    ```

  * **slideUp() //收起**

    ```js
    $("div").slideUp(1000,function(){
    	//动画执行完后调用
    })
    ```

  * **slideToggle() //切换**

    ```js
    $("div").slideToggle(1000,function(){
    	//动画执行完后调用
    })
    ```

* stop()
  * **停止当前的动画**
  * 在jQuery中如果需要执行动画，建议在执行动画之前先调用stop方法，然后再执行动画。

* 淡入淡出

  * **fadeIn()淡入**

    ```js
    $("div").fadeIn(1000,funtion(){
                    
    })
    ```

  * **fadeOut()淡出**

    ```js
    $("div").fadeIn(1000,funtion(){
    	
    })
    ```

  * **fadeToggle()淡入淡出切换**

    ```js
    $("div").fadeToggle(1000,funtion(){
    
    })
    ```

  * **fadeTo()淡入到**

    * 第二个参数指的淡入到什么程度

    ```js
    $("div").fadeTo(1000,0.5,funtion(){
    
    })
    ```

* 自定义动画

  * **animate();**

    * 参数说明
      1. 要修改的属性值
      2. 时间
      3. 动画的节奏，默认swing
      4. 执行的函数

    ```js
    $("div").animate({
    	width：500px	 // 初始值为200px
    	width: "+100" //累加属性，每次累加100px
    	width:"hide" //关键字，隐藏
    },1000,linear,function{
    	//动画执行后执行的语句
    })
    ```

    * 可以修改多个属性，动画同时执行，要想顺序执行动画，可以写两个按顺序执行。也可以链式。

  * **stop()方法**

    * 立即停止当前动画，继续执行后续动画

      ```js
      stop()/stop(false)/stop(false,false)
      ```

    * 立即停止当前和后续所有的动画

      ```js
      stop(true) /stop(true,false) 
      ```

    * 立即完成当前动画，继续执行后续的动画

      ```js
      stop(false,true)
      ```

    * 立即完成当前的，并且结束后续所有的

      ```js
      stop(true,true)
      ```

    * **总结：**

      ```js
      stop("是否停止后续动画","是否完成当前动画");
      ```

  * delay方法

    ```js
    $("div").animate({
    	width:500
    },1000,function{}).delay(2000).animate({
    	height:500
    },1000,function(){})
    两个动画之间延迟2秒执行。
    ```

### 文档处理

* 内部插入节点

  ```js
  //创建一个节点
  var $li = $("<li>新增的li</li>")；
  ```

* 添加节点

  1. append()，将节点添加到指定元素内部的最后

     ```js
     $("ul").append($li);
     ```

  2. prepend()，将节点添加到指定元素内部的最前面

     ```js
     $("ul").prepend($li);
     ```

  3. appendTo(),将节点添加到指定元素内部的最后,语句格式不一样

     ```js
     $li.appendTo("ul");
     ```

  4. prependTo()将节点添加到指定元素内部的前面,语句格式不一样

     ```js
     $li.prependTo("ul");
     ```

* 外部插入

  1. after()将节点添加到指定元素外部的后面

     ```js
     $("ul").after($li);
     ```

  2. before()将节点添加到指定元素外部的前面

     ```js
     $("ul").before($li);
     ```

  3. insertAfter()将节点添加到指定元素外部的后面

     ```js
     $li.insertAfter("ul");
     ```

  4. insertBefore()将节点添加到指定元素外部的前面

     ```js
     $li.insertBefore("ul");
     ```

* 删除节点

  * 方法可以添加参数，删除指定的元素

    ```js
    $("li").remove(".item"); 
    //删除类为item的li元素
    ```

  * remove()删除指定元素（包括元素本身及内部内容和子元素）

    ```js
    $("div").remove();
    ```

  * empty()删除指定元素内部内容和子元素

  * detach()删除指定元素（包括元素本身及内部内容和子元素）

    ```js
    $("div").detach();
    ```

  * remove()和detach()的区别：
    * remove()不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。但除了这个元素本身得以保留之外，其他的比如绑定的事件，附加的数据等都会被移除。
    * detach()这个方法不会把匹配的元素从jQuery对象中删除，因而可以在将来再使用这些匹配的元素。与remove()不同的是，所有绑定的事件、附加的数据等都会保留下来。

* 替换节点

  * **clone();**

    * 如果传入false就是浅复制，浅复制只会复制元素，不会复制元素绑定的事件等

    * 如果传入true就是深复制，深复制不仅复制元素，也复制元素绑定的事件等。

      * 浅复制第一个li元素

        ```js
        var $li = $("li:first").clone(false);
        ```

### jQuery的基本结构

* 结构

  * jQuery的本质是一个闭包，闭包是指立即执行的函数。能够读取其他函数内部变量的函数
    * 闭包：是指有权访问另一个函数作用域的变量的函数。它由函数和创建该函数的环境两部分组成，环境由闭包创建时在作用域的任何局部变量组成。

  * jQuery为什么要使用闭包来使用
    * 为了避免多个框架的冲突
  * jQuery如何让外部访问内部定义的局部变量
    * window.xxx =  xxx;
  * jQuery为什么要给自己传递一个window参数
    * 为了方便后期压缩代码
    * 为了提升查找的效率
  * jQuery为什么要给自己接受一个undefined参数
    * 为了方便后期压缩代码，IE9以下浏览器undefined可以被修改，为了保证内部使用的undefined不被修改，所以需要接受一个正确的undefined

* jQuery的入口函数测试

  * 传入""、null、undefined、NaN、0、false
    * 返回一个空的jQuery对象给我们
  * 传入Html片段
    * 会将创建好的DOM元素存储到jQuery对象返回
  * 传入选择器
    * 会将找到的所有的元素存储到jQuery对象返回
  * 传入数组和伪数组
    * 会将数组存储的元素依次存储到jQuery对象中返回
  * 传入对象和DOM元素
    * 会将传入的对象和DOM元素存储到jQuery对象返回
  * 传入基本类型
    * 会将传入的基本数据类型存储到jQuery对象返回
  * **总结**
    1. 传入""、null、undefined、NaN、0、false 返回空jQuery对象
    2. 字符串
       1. 传入Html片段，会将创建好的DOM元素存储到jQuery对象返回。
       2. 传入选择器，会将找到的所有的元素存储到jQuery对象返回
    3. 数组，会将数组存储的元素依次存储到jQuery对象中返回
    4. 其他类型，会将传入的数据类型存储到jQuery对象返回



