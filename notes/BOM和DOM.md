# BOM

## Window对象

### 窗口位置

* screenLeft和screenTop属性，分别表示窗口相对于屏幕左侧和上侧的位置
* 解决兼容性，代码应如下

```js
var leftPos = (typeof window.screenLeft == 'number') ? window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == 'number') ? window.screenTop : window.screenY;
```

### 窗口大小

```js
var pageWidth = window.innerWidth;
var pageHeight = window.innerHeight;
if(typeof pageWidth != 'number') {
  if(document.compatMode == 'CSS1Compat'){
       pageWidth = document.documentElement.clientWidth;
       pageHeight = documen.documentElement.clientHeight;               
  } else {
       pageWidth = document.body.clientWidth;
       pageHeight = document.body.clientHeight;               
  }
}
```

* resizeTo()和resizeBy()方法
  * 可以调整浏览器窗口的大小
  * resizeTo接受浏览器窗口的新宽度和新高度
  * resizeBy()接受新窗口与原窗口的宽度和高度之差

### 间歇调用和超时调用

* 超时调用setTimeout()

  * 第一个参数为要执行的代码，可以是函数
  * 第二个是以毫秒表示的时间

  ```js
  setTimeout(function(){
    alert('hello world');
  },1000);
  //清除调用
  clearTimeout；
  ```

* 间歇调用

  * 按照间隔时间重复执行代码

  ```js
  setInterval(function(){
    alert('hello');
  },1000);
  clearInterval
  ```

### 系统对话框

* alert()警告框
* confirm()确认框
* prompt()提示输入框

## Location对象

* 提供了与当前窗口加载的文档有关的信息
* 它既是window对象的属性，也是document的属性

| 属性     | 例子                  |                             说明                             |
| -------- | --------------------- | :----------------------------------------------------------: |
| hash     | "#contents"           | 返回URL中的hash(#号后跟零或者多个字符)，如果URL中不包含散列，则返回空字符串 |
| host     | "www.wrox.com:80"     |                    返回服务器名称和端口号                    |
| hostname | "www.wrox.com"        |                  返回不带端口号的服务器名称                  |
| href     | "http://www.wrox.com" | 返回当前加载页面的完整URL，而location对象的toString()方法也返回这个值 |
| pathname | "/WileyCDA"           |                   返回URL中的目录和文件名                    |
| port     | "8080"                | 返回URL中指定的端口号，如果URL中不包含端口号，则这个属性返回空字符串 |
| protocol | "http:"               |            返回页面使用的协议，通常是http和https             |
| search   | "?q=javascript"       |            返回URL的查询字符，这个字符以问号开头             |



# DOM

* DOM（文档对象模型）是针对HTML和xml文档的一个API，DOM描述了一个层次化的节点树，允许开发人员添加、删除和修改页面的某一部分

## Node类型

* 每一个节点都有一个nodetype属性，表明节点的类型
* 节点类型由在Node类型中定义的12个数值常量来表示。

| Node.ELEMENT_NODE                | 1    |
| -------------------------------- | ---- |
| Node.ATTRIBUTE_NODE              | 2    |
| Node.TEXT_NODE                   | 3    |
| Node.CDATA_SECTION_NODE          | 4    |
| Node.ENTITY_REFERENCE_NODE       | 5    |
| Node.ENTITY_NODE                 | 6    |
| Node.PROCESSING_INSTRUCTION_NODE | 7    |
| Node.COMMETN_NODE                | 8    |
| Node.DOCUMENT_NODE               | 9    |
| Node.DOCUMENT_TYPE_NODE          | 10   |
| Node.DOCUMENT_FRAGMENT_NODE      | 11   |
| Node.NOTATION_NODE               | 12   |

### nodeName和nodeValue

* 这两个属性可以获得节点的具体信息

### 节点关系

* 每一个节点都有一个childNodes属性，其中保存着一个NodeList对象
* NodeList是一种类数组对象，可以通过位置来访问保存的节点
* NodeList也有length属性

```js
var firstChild = someNode.childNodes[0];
var secondChild = someNode.childNodes.item(1);
var count = someNode.childNodes.length;
```

* 每一个节点都有一个parentNode属性，该属性指向文档树中的父节点
* 可以通过previousSibling和nextSibling访问前一个和后一个节点

### 操作节点

* appendChild()方法
  * 用于向childNodes末尾添加一个节点
  * 返回新增的节点
* removeChild()方法
  * 移除某个节点
  * 返回被移除的节点
* replace()方法
  * 替换某个节点
  * 接受的参数为：要插入的节点和要替换的节点
  * 返回被替换的节点

```js
someNode.appendChild(newNode);
someNode.removeChild(newNode);
someNode.replace(newNode,someNode.firstChild);
```

## Document类型

* document对象是HTMLDocument的一个实例，也是window对象的一个属性，可以作为全局对象来访问
* document节点特征

| nodeType      | 9           |
| ------------- | ----------- |
| nodeName      | "#document" |
| nodeValue     | null        |
| parentNode    | null        |
| ownerDocument | null        |

* 其子节点可能是DocumentType(最多一个)、Element(最多一个)、ProcessingInstruction或Comment

### 文档子节点

* documentElement属性，该属性指向html元素
* body属性，指向body元素

### 文档信息

* title属性，页面的标题属性

```js
var originTitle = document.title;
document.title = "New Page";
```

* url属性，包含整个页面完整的url信息
* domain: 页面的域名
* referrer: 保存着链接到当前页面的那个页面的url

```js
var url = document.URL;
var domain = document.domain;
var referrer = document.referrer;
```

### 查找元素

* getElementById()方法
  * 通过类名查找元素
  * 只返回文档中第一次出现的元素

* getElementsByTag()方法
  * 通过标签名查找元素
  * 返回包含0个或多个元素的Nodelist

## Element类型

* Element 类型用于表现XML和HTML元素，提供了对元素标签名、子节点及特性的访问
  * nodeType的值为1
  * nodeName的值为元素的标签名
  * nodeValue的值为null
  * parentNode值为null
  * 其子节点可能是Element、Text、Commet、ProcessingInstruction、CDATASection或EntityReference

### HTML元素

* id： 元素在文档中的唯一标识
* title：有关元素的附加说明信息
* lang: 元素内容的语言代码
* dir： 语言的方向

### 特性

* getAttribute()方法,取得特性

```js
var div = document.getElementById("myDiv");
div.getAttribute("id");
div.getAttribute('class');
```

* 设置特性： setAttribute()

```js
div.setAttribute("id","someId");
```

* 移除特性： removeAttribute()

```js
div.removeAttribute("class");
```

### attributes属性

* Element类型是使用atrtribute属性的唯一一个DOM节点类型。
* attributes属性包含一个NameNodeMap,与NodeList类似
* 元素的每一个特性都由一个Attr节点表示，每个节点都保存在NameNodeMap对象中。
  * getNamedItem(name): 返回nodeName属性等于name的节点
  * removeNamedItem(name): 从列表移除nodeName属性等于name的节点
  * setNamedItem(node):向列表中添加节点，一节点的nodeName为索引
  * item(pos): 返回位于数字pos位置处的节点

### 创建节点

```js
var div = document.createElement('div');
div.id = 'myName';
document.body.appendChild(div);
```


## Text类型

### 创建文本节点

```js
var textNode = document.createTextNode("hello");
document.body.appendChid(textNode);
```

# DOM扩展

### 选择符API

#### querySelector()方法

* querySelector()方法接受一个CSS选择符，返回与该模式匹配的第一个元素，没有返回null

```js
var body = document.querySelector("body");
var div = document.querySelector("#myDiv");
var btn = document.querySelector(".btn")
```

#### querySelectorAll()方法

* 返回一个NodeList实例



