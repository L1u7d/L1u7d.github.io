# JavaScript笔记

### call()和apply()的用法和区别

https://www.cnblogs.com/chenhuichao/p/8493095.html

### 各种数据类型对应转换为Boolean值

* 字符串：
  * ""(空字符串)   false
* Number：
  任何非零数字值（包括无穷大） true
* 0和NaN		false
* Object:
  任何对象		true
* null		false
* Undefined:
  n/a		true
  Undefined 	false

* 函数的特点

  1. 定义函数时，不必指定返回值，任何函数都可以通过return语句来实现返回值。
  2. 函数中在return语句后的语句不会被执行。
  3. 函数不规定传入的参数个数和类型，即使定义了要接受多少个参数，参数在函数内部是由数组存储的，在函数体内可以通过arguments对象来访问数组。arguments[0]等
  4. arguments对象可以和命名参数一起使用。
  5. 没有被传入的参数被自动赋予undefied值。
  6. 函数没有重载

* 引用类型

  1. object类型

     * 创建Object示例的方法有两种

       1. 使用new构造符跟Object构造函数

          ```js
          var person = new Object();
          person.name = "liu";
          person.age = 24;
          ```

       2. 使用对象字面量表示(推荐使用)

          ```js
          var	person = {
          	name: "liu".
          	age: 5
          }
          ```

     * 访问对象的属性

       1. 使用.表示法(建议使用)

          ```js
          person.name;
          ```

       2. 使用[]表示

          ```js
          person["name"];
          ```

       3. 优点

          * 可以通过变量来访问属性

            ```js
            var str = "name";
            person[str];
            ```

            * 属性名中包含导致语法错误的字符，或者属性名使用的是关键字或保留字。
            * person["first name"] = "liu"

2. Array类型

   * 数组的每一项可以保存任何类型的数据
   * 数组的大小是可以动态的调整的

   * 创建Array的方法

     1. 使用Array构造函数

        ```js
        var arr = new Array();
        var arr = new Array(3);
        var arr = Array();
        var arr = Array(3);
        ```

     2. 使用字面量表示法

        ```js
        var arr = ["red","blue","green"];
        ```

   * 访问Array

     ```js
     arr[0]
     ```

   * 检测数组

     1. instanceof方法

        ```js
        arr instanceof Array
        ```

        * 在一个全局环境中有效，若包含多个框架，有多个全局环境，就会有两个以上的Array构造函数。

     2. Array.isArray()方法

        ```js
        Array.isArray(value);
        ```

   * 转换方法

     1. toString()方法

        * 返回由数组中的每个值的字符串形式拼接而成的一个以逗号分隔的字符串。
        * 为了创建这个字符串每次会调用数组每一项的toString()方法

     2. valueOf()方法

        返回数组本身

     3. toLocaleString()方法

        * 和toString()一样返回字符串
        * 不同的是每次调用toLocaleString()方法

   * 栈方法

     * **栈是一种后进先出LIFO数组结构。**
       1. push()方法
          * 接受任意数量的参数，添加到数组末尾，**返回修改后数组的长度**。
       2. pop()方法
          * 从数组末尾移除最后一项，减少数组的length值，**返回被移除的项**。

   * 队伍方法

     * **队伍的数据结构是先进先出FIFO.**
       1. shift()方法
          * 移除数组中第一个项并返回该项，数组length-1.
       2. unshift()方法
          * 在数组前端添加任意个项并返回新数组的长度。

   * 重排序方法

     * sort()方法

       * sort()方法按照升序排列数组，通过调用每个数组项的toString()方法，比较字符串来进行排序

         ```js
         arr.sort();
         ```

       * 这样造成的结果是通常排序没有按照预期的效果进行，所以通常将一个比较函数传递给它，来达到正确排序的结果。

         ```js
         arr.sort(compare);
         function compare(value1,value2){
            return value1-value2;
          }  
         ```

       * 第一个数小于第二个数时，返回一个负数，说明第一个数应该排在第二个数的前面；

       * 第一个数大于第二个数时，返回一个正数，说明第一个数应排在第二个数的后面。

     * reverse()方法

       * 反转数组的顺序。

   * 操作方法

     * concat()方法

       * 先创建当前数组的一个副本，然后将传入的参数添加到数组末尾，返回**一个新的数组**。

         ```js
         arr.concat("aaa"/["aaad","dddd"]);
         ```

     * slice()方法

       * 传入一到两个参数，确定开始和结束的位置，**返回起始位置和结束位置之间的项(不包括结束位置)**。

         ```js
         arr.slice(1,3);
         ```

       * **如果参数中有一个负数，则用数组长度加上该数来确定相应位置**

     * splice()方法

       * 删除：可以删除任意数量的项。指定两个参数，要删除的第一项位置和要删除的项数。

         ```js
         arr.splice(0,2);//删除前两项。
         ```

       * 插入：可以向指定位置插入任意数量的项，提供三个参数，起始位置，0(要删除的项数)，要插入的项

         ```js
         arr.splice(2,0,"aaa","bbb");// 从第二项的位置插入"aaa"和"bbb"
         ```

       * 替换：可以向指定位置插入任意数量的项，同时删除任意数量的项，提供三个参数，起始位置、要删除的项数和要插入的项

         ```js
         arr.splice(2,1,"red");//替换index=2 的值为red
         ```

       * splice方法都会返回一个数组，包含从原始数组中删除的项（没有返回空数组）。

   * 位置方法

     * indexOf方法
       * 接受两个参数，要查找的项目和查找起点的位置（可选）
       * 返回查找项的位置，没有返回-1
       * 从数组的开头向后找
     * lastIndexOf方法
       - 接受两个参数，要查找的项目和查找起点的位置（可选）
       - 返回查找项的位置，没有返回-1
       - 从数组的末尾向前找

   * 迭代方法

     * 每个方法都接受两个参数： 要在每一项上运行的函数和运行该函数的作用域对象（可选）

     * 传入方法中的函数接受三个参数：数组项中的值、该项在数组中的位置和数组对象本身

     * every方法，对每一项都运行传入的函数，每一项都返回true，则返回true

     * filter方法，对每一项运行函数，返回函数返回true的项组成的数组

     * forEach方法，对每项运行函数，没有返回值

     * map方法，对每项运行函数，返回每次函数调用的结果组成的数组

     * some方法，对每项运行函数，如果任意一项返回true，则返回true

       ```js
       
       var number = [1,2,3,4,5,4,3,2,1];
       
       var everyRes = number.every(function(item,index,array){
         return item > 2;
       })
       alert(everyRes);//false
       
       var someRes = number.some(function(item,index,array){
         return item > 2;
       })
       alert(someRes);//true
       
       var filterRes = number.filter(function(item,index,array){
         return item > 2;
       })
       alert(filterRes);//[3,4,5,4,3]
       
       var mapRes = number.map(function(item,index,array){
         return item * 2;
       })
       alert(mapRes);//[2,4,6,8,10,8,6,4,2]
       ```

   * 归并方法

     * 两个方法都接受两个参数：一个在每一项上调用的函数和作为归并基础的初始值（可选）

     * 传入的函数接受四个参数：前一个值、当前值、项的索引和数组对象，函数的返回值都会作为第一个参数传给下一项

     * reduce方法从数组第一项开始，reduceRight从数组最后一项开始

       ```js
       var value = [1,2,3,4,5];
       var sum = value.reduce(function(pre,cur,index,array){
         return prev + cur;
       })
       alert(sum);//15
       ```

       

### 函数

* 函数代码中，return语句后面的代码不会执行
* 参数
  * 在函数体内可以通过arguments对象来访问参数数组，可以获取到传递给参数的每一个参数
  * 在js中函数没有重载，定义两个同名函数，后面的会覆盖前面的。

### 作用域和内存

* 传递参数，当传递的参数为引用类型时，其实是按值传递的

  ```js
  function setName(obj){
      obj.name = "liu";
      obj = new Object();
      obj.name = "qing"
  }
  var person = new Person();
  setName(person);
  console.log(person.name);//结果为liu
  ```

  * 即使在函数内部修改了参数的值，但原始的引用仍然保持未变。实际上，当在函数内部重写obj时，这个变量引用的就是另外一个局部对象了，而这个局部对象在函数执行完毕后立即被销毁

* **执行环境及作用域**

  * 执行环境定义了变量或者函数有权访问的其他数据，决定了他们各自的行为。
  * 全局执行环境被认为是window对象，因此所有全局变量和函数都是作为window对象的属性和方法被创建的。
  * 每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就会被推入一个环境栈中，在函数执行完毕后， 栈将其退出，把控制权返回之前的环境
  * 当代码在一个环境中执行时，会创建变量对象的一个作用域链
    * 作用域链的作用是保证执行环境对有权访问的所有变量和函数的有序访问。
    * 作用域的前端，始终都是当前执行的代码所在环境的变量对象
    * 全局执行环境的变量对象始终都是作用域链中的最后一个对象。

* 块级作用域

  * var定义的变量或者对象是没有块级作用域的。
  * var 定义的变量如在函数中定义的，在执行完函数后，仍然存在于外部的执行环境中。