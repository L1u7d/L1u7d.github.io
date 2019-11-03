## JSON

### JSON的语法可以表示一下三种类型的值：

* 简单值，可以在JSON中表示字符串、数值、布尔值和null，不支持undefined。JSON字符串必须使用双引号。

* 对象，要求给属性加双引号，没有声明变量，没有末尾的分号。

  ```json
  {
    "name": "liu",
    "age": 18
  }
  ```

* 数组，数组也没有变量和分号，可以把数组和对象结合起来

  ```json
  [
    {
     	"title": "hello world",
       "person": ["liu","qing"]                 
    }
  ]
  ```

### 解析与序列化

* stringify()方法用于将JavaScript对象序列化为一个JSON字符串，默认情况下，输出的JSON字符串不包含任何空格字符和缩进。

* parse()方法用于将JSON字符串转化为JavaScript值

  ```js
  var book = {
    "title": "hello world",
    "person": ["liu","qing"],
    edition: 3
  };
  var jsontext = JSON.stringify(book);
  var bookCopy = JSON.parse(jsontext);
  ```

* 序列化选项

  JSON.stringify()还可以接受两个参数，用于指定以不同的方式序列化JavaScript对象

  * 第一个参数为过滤器，可以是一个数组，也可以是函数。

    ```js
    //数组，返回的结果只会包含数组中列出的属性
    var jsonText = JSON.stringify(book,["title","edition"]);
    //函数，接受两个参数属性名和属性值
    var jsonText1 = JSON.stringify(book,function(key,value){
      switch(key){
         case "person":
          return value.join(",")
      }
    })
    ```

  * 第二个参数为一个选项，表示是否在JSON中保持字符串缩进
    * 数值，表示缩进的空格数。
    * 字符串，将用字符串代替空格作为缩进

* toJSON()方法

  * 返回其自身的JSON数据格式。

    ```js
    var book = {
      "title": "hello world",
      "person": ["liu","qing"],
      edition: 3,
      toJSON: function(){
        return this.title;                  
      }
    };
    var jsontext = JSON.stringify(book);
    ```

* toJSON()是作为过滤器的补充，将一个对象传入JSON.stringify()，序列化该对象的顺序为：

  * 如果存在toJSON()方法且能通过它取得有效值，则调用该方法，否则返回对象本身。
  * 如果提供了第二个参数，应用这个函数过滤器，传入函数过滤器的值是第一步返回的值
  * 对第二步返回的值进行序列化。
  * 如果提供了第三个参数，执行相应的格式化。

#### 解析选项

* JSON.parse()也可以接受一个参数，该参数是一个函数，将在每个键值对上调用

* 该函数被称为还原函数人（reviver），接受key和value，返回一个值

  * 如果返回undefined，表示要从结果中删除对应的键。
  * 如果返回其他值，将该值插入到结果中。

  ```js
  var book = {
    "title": "hello world",
    "person": ["liu","qing"],
    edition: 3,
  	releaseDate: new Date(2019,12,12)
  };
  var jsontext = JSON.stringify(book);
  var bookCopy = JSON.parse(jsontext,function(key,value){
    if(key == releaseDate){
      return new Date(value);                  
    } else{
     	return value;                   
    }
  })
  ```

## Ajax

   

