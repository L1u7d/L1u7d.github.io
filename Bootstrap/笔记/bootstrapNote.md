# bootstrap

## 起步 

* bootstrap的所有插件都依赖于jQuery，因此必须在Bootstrap之前引入jQuery。

* 安装

  * npm安装

  ```js
  $ npm install bootstrap@3
  ```

#### 禁止响应式布局

* Bootstrap会自动帮你针对不同的屏幕尺寸调整你的页面，使其在各个尺寸的屏幕上表现良好。

  1. 移除css文档中提到的设置浏览器视口的标签:<meta>

  2. 通过.container类设置一个width值从而覆盖框架的默认width设置,确保这些设置全部放在默认的Bootstrap CSS文档后面。

     ```css
     width: 970px ！important;
     ```

  3. 如果使用了导航条，需要移除所有导航条的折叠和展开行为。
  4. 对于栅格布局，额为增加**.col-xs-***类或者替换掉**.col-md-***和**.col-lg-***

## 全局CSS样式

#### 移动设备优先

* 为确保适当的绘制和触屏缩放，需要在头部之中添加viewport元数据标签

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```

* 禁止缩放功能，设置meta属性为user-scalable=no

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  ```

#### 排版与链接

* Bootstrap排版、链接样式设置了基本的全局样式
  * 为body元素设置**background-color: #fff;**
  * 使用**@font-family-base**、**@font-size-base**和**@line-height-base**
  * 为所有链接设置了基本颜色@link-color，并且当链接处于：hover状态时才添加下划线。

#### 布局容器

* Bootstrap需要为页面内容和栅格系统包裹一个.container容器

  * .container类用于固定宽度并支持响应式布局的容器

    ```html
    <div class="container">
      ...
    </div>
    ```

  * .container-fluid类用于100%宽度，占据全部视口的容器

    ```html
    <div class=".container-fluid">
      ...
    </div>
    ```

* 由于padding等属性的原因，这两种容器不能互相嵌套

#### 栅格系统

* row必须包含在.container或者.container-fluid中，以便于为其赋予合适的排列和内补
* 通过row在水平方向上创建一组column
* 内容应放置于column内，并且只有column可以作为row的直接子元素
* 通过column设置padding属性，从而创建列与列之间的 间隔，通过.row元素设置复制margin从而抵消掉.container设置的padding，也就间接为row包含的column抵消掉了padding。

#### 媒体查询

* 在Less文件中使用媒体查询来创建关键的分界点阈值。

  ```less
  /*超小屏幕（手机，小于780px)，无代码，设备优先*/
  
  /*小屏幕（平板，大于等于780px）*/
  @media (min-width: @screen-sm-min){...}
  
  /*中等屏幕（桌面显示器，大于等于992px）*/
  @media (min-width: @screen-md-min){...}
  
  /*大屏幕（大桌面显示器，大于等于1200px）*/
  @media (min-width: @screen-lg-min){...}
  ```

#### 栅格参数

* 所有的column必须放在row中
* 如果在一个row内包含的列多余12个，包含多余列的元素将作为一个整体单元被另起一行排列
* 使用.col-md-offset-*类可以将列向右偏移
* 嵌套列，通过添加一个新的.row元素来嵌套列，被嵌套的行所包含的列不能超过12个。
* 列排序，可以使用.col-md-push-*和.col-md-pull-*来改变列的顺序

### 排版

#### 标题

* HTML中的所有标题标签均可使用
* .h1到.h6类，可以给内联(inline)属性文本赋予标题的样式
* <small>标签或.small类可以用来标记副标题

####  页面主体

* Bootstrap将全局字体大小设置为14px，行高设置为1.428，p标签元素设置了二分之一的行高(10px)的底部外边距。

### 表单

#### 基本表单

- 向父 <form> 元素添加 *role="form"*。
- 把标签和控件放在一个带有 class *.form-group* 的 <div> 中。这是获取最佳间距所必需的。
- 向所有的文本元素 <input>、<textarea> 和 <select> 添加 class ="*form-control*" 。

### 内联表单

如果需要创建一个表单，它的所有元素是内联的，向左对齐的，标签是并排的，请向 <form> 标签添加 class *.form-inline*。

- 默认情况下，Bootstrap 中的 input、select 和 textarea 有 100% 宽度。在使用内联表单时，您需要在表单控件上设置一个宽度。
- 使用 class *.sr-only*，您可以隐藏内联表单的标签。

### 水平表单

水平表单与其他表单不仅标记的数量上不同，而且表单的呈现形式也不同。如需创建一个水平布局的表单，请按下面的几个步骤进行：

- 向父 <form> 元素添加 class *.form-horizontal*。
- 把标签和控件放在一个带有 class *.form-group* 的 <div> 中。
- 向标签添加 class *.control-label*。

## 支持的表单控件

Bootstrap 支持最常见的表单控件，主要是 *input、textarea、checkbox、radio 和 select*。

### 输入框（Input）

最常见的表单文本字段是输入框 input。用户可以在其中输入大多数必要的表单数据。Bootstrap 提供了对所有原生的 HTML5 的 input 类型的支持，包括：*text、password、datetime、datetime-local、date、month、time、week、number、email、url、search、tel* 和 *color*。适当的 *type* 声明是必需的，这样才能让 *input* 获得完整的样式。

```html
<form role="form">
  <div class="form-group">
    <label for="name">标签</label>
    <input type="text" class="form-control" placeholder="文本输入">
  </div>
 </form>
```

### 文本框（Textarea）

当您需要进行多行输入的时，则可以使用文本框 textarea。必要时可以改变 *rows* 属性（较少的行 = 较小的盒子，较多的行 = 较大的盒子）。

```html
<form role="form">
  <div class="form-group">
    <label for="name">文本框</label>
    <textarea class="form-control" rows="3"></textarea>
  </div>
</form>
```

### 复选框（Checkbox）和单选框（Radio）

复选框和单选按钮用于让用户从一系列预设置的选项中进行选择。

- 当创建表单时，如果您想让用户从列表中选择若干个选项时，请使用 *checkbox*。如果您限制用户只能选择一个选项，请使用 *radio*。
- 对一系列复选框和单选框使用 *.checkbox-inline* 或 *.radio-inline* class，控制它们显示在同一行上。

### 选择框（Select）

当您想让用户从多个选项中进行选择，但是默认情况下只能选择一个选项时，则使用选择框。

- 使用 <select> 展示列表选项，通常是那些用户很熟悉的选择列表，比如州或者数字。
- 使用 *multiple="multiple"* 允许用户选择多个选项。

## 静态控件

当您需要在一个水平表单内的表单标签后放置纯文本时，请在 <p> 上使用 class *.form-control-static*。

```html
<form class="form-horizontal" role="form">
  <div class="form-group">
    <label class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <p class="form-control-static">email@example.com</p>
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword" class="col-sm-2 control-label">密码</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword" placeholder="请输入密码">
    </div>
  </div>
</form>
```

## 表单控件状态

除了 *:focus* 状态（即，用户点击 input 或使用 tab 键聚焦到 input 上），Bootstrap 还为禁用的输入框定义了样式，并提供了表单验证的 class。

### 输入框焦点

当输入框 input 接收到 *:focus* 时，输入框的轮廓会被移除，同时应用 *box-shadow*。

### 禁用的输入框 input

如果您想要禁用一个输入框 input，只需要简单地添加 *disabled* 属性，这不仅会禁用输入框，还会改变输入框的样式以及当鼠标的指针悬停在元素上时鼠标指针的样式。

### 禁用的字段集 fieldset

对 <fieldset> 添加 disabled 属性来禁用 <fieldset> 内的所有控件。

### 验证状态

Bootstrap 包含了错误、警告和成功消息的验证样式。只需要对父元素简单地添加适当的 class（*.has-warning、 .has-error 或 .has-success*）即可使用验证状态。

## 表单帮助文本

Bootstrap 表单控件可以在输入框 input 上有一个块级帮助文本。为了添加一个占用整个宽度的内容块，请在 <input> 后使用 *.help-block*。

```html
<form role="form">
  <span>帮助文本实例</span>
  <input class="form-control" type="text" placeholder="">
  <span class="help-block">一个较长的帮助文本块，超过一行，
  需要扩展到下一行。本实例中的帮助文本总共有两行。</span>
</form>
```

# Bootstrap 按钮

本章将通过实例讲解如何使用 Bootstrap 按钮。任何带有 class **.btn** 的元素都会继承圆角灰色按钮的默认外观。但是 Bootstrap 提供了一些选项来定义按钮的样式，具体如下表所示：

以下样式可用于<a>, <button>, 或 <input> 元素上：

| 类           | 描述                                    |
| :----------- | :-------------------------------------- |
| .btn         | 为按钮添加基本样式                      |
| .btn-default | 默认/标准按钮                           |
| .btn-primary | 原始按钮样式（未被操作）                |
| .btn-success | 表示成功的动作                          |
| .btn-info    | 该样式可用于要弹出信息的按钮            |
| .btn-warning | 表示需要谨慎操作的按钮                  |
| .btn-danger  | 表示一个危险动作的按钮操作              |
| .btn-link    | 让按钮看起来像个链接 (仍然保留按钮行为) |
| .btn-lg      | 制作一个大按钮                          |
| .btn-sm      | 制作一个小按钮                          |
| .btn-xs      | 制作一个超小按钮                        |
| .btn-block   | 块级按钮(拉伸至父元素100%的宽度)        |
| .active      | 按钮被点击                              |
| .disabled    | 禁用按钮                                |

## 按钮大小

下表列出了获得各种大小按钮的 class：

| Class      | 描述                                         |
| :--------- | :------------------------------------------- |
| .btn-lg    | 这会让按钮看起来比较大。                     |
| .btn-sm    | 这会让按钮看起来比较小。                     |
| .btn-xs    | 这会让按钮看起来特别小。                     |
| .btn-block | 这会创建块级的按钮，会横跨父元素的全部宽度。 |

## 按钮状态

Bootstrap 提供了激活、禁用等按钮状态的 class，下面将进行详细讲解。

### 激活状态

按钮在激活时将呈现为被按压的外观（深色的背景、深色的边框、阴影）。

下表列出了让按钮元素和锚元素呈激活状态的 class：

| 元素     | Class                                                |
| :------- | :--------------------------------------------------- |
| 按钮元素 | 添加 **.active** class 来显示它是激活的。            |
| 锚元素   | 添加 **.active** class 到 <a> 按钮来显示它是激活的。 |

### 禁用状态

当禁用一个按钮时，它的颜色会变淡 50%，并失去渐变。

下表列出了让按钮元素和锚元素呈禁用状态的 class：

| 元素     | Class                                           |
| :------- | :---------------------------------------------- |
| 按钮元素 | 添加 **disabled** *属性* 到 <button> 按钮。     |
| 锚元素   | 添加 **disabled** *class* 到 <a> 按钮。按钮标签 |

## 按钮标签

您可以在 <a>、<button> 或 <input> 元素上使用按钮 class。但是建议您在 <button> 元素上使用按钮 class，避免跨浏览器的不一致性问题。

## 自适应大小的按钮组

可以通过 .btn-group-justified 类来设置自适应大小的按钮组。

**注意:** 如果是 `<button>` 元素, 你需要在外层使用 `.btn-group` 类来包裹:

## 内嵌下拉菜单的按钮组

按钮组内嵌的按钮可以设置下拉菜单，如下实例：

```html
<div class="btn-group">
  <button type="button" class="btn btn-primary">Apple</button>
  <button type="button" class="btn btn-primary">Samsung</button>
  <div class="btn-group">
    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    Sony <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu">
      <li><a href="#">Tablet</a></li>
      <li><a href="#">Smartphone</a></li>
    </ul>
  </div>
</div>
```

# Bootstrap 图片

Bootstrap 提供了三个可对图片应用简单样式的 class：

- *.img-rounded*：添加 *border-radius:6px* 来获得图片圆角。
- *.img-circle*：添加 *border-radius:50%* 来让整个图片变成圆形。
- *.img-thumbnail*：添加一些内边距（padding）和一个灰色的边框。

## <img> 类

以下类可用于任何图片中。

| 类              | 描述                              |
| :-------------- | :-------------------------------- |
| .img-rounded    | 为图片添加圆角 (IE8 不支持)       |
| .img-circle     | 将图片变为圆形 (IE8 不支持)       |
| .img-thumbnail  | 缩略图功能                        |
| .img-responsive | 图片响应式 (将很好地扩展到父元素) |

## 响应式图片

通过在 <img> 标签添加 .img-responsive 类来让图片支持响应式设计。 图片将很好地扩展到父元素。

.img-responsive 类将 max-width: 100%; 和 height: auto; 样式应用在图片上：

```html
<img src="cinqueterre.jpg" class="img-responsive" alt="Cinque Terre">
```

# Bootstrap 辅助类

## 文本

以下不同的类展示了不同的文本颜色。如果文本是个链接鼠标移动到文本上会变暗：

| 类            | 描述                        |
| :------------ | :-------------------------- |
| .text-muted   | "text-muted" 类的文本样式   |
| .text-primary | "text-primary" 类的文本样式 |
| .text-success | "text-success" 类的文本样式 |
| .text-info    | "text-info" 类的文本样式    |
| .text-warning | "text-warning" 类的文本样式 |
| .text-danger  | "text-danger" 类的文本样式  |

## 背景

以下不同的类展示了不同的背景颜色。 如果文本是个链接鼠标移动到文本上会变暗：

| 类          | 描述                             |
| :---------- | :------------------------------- |
| .bg-primary | 表格单元格使用了 "bg-primary" 类 |
| .bg-success | 表格单元格使用了 "bg-success" 类 |
| .bg-info    | 表格单元格使用了 "bg-info" 类    |
| .bg-warning | 表格单元格使用了 "bg-warning" 类 |
| .bg-danger  | 表格单元格使用了 "bg-danger" 类  |

## 其他

| 类                 | 描述                                                         |
| :----------------- | :----------------------------------------------------------- |
| .pull-left         | 元素浮动到左边                                               |
| .pull-right        | 元素浮动到右边                                               |
| .center-block      | 设置元素为 display:block 并居中显示                          |
| .clearfix          | 清除浮动                                                     |
| .show              | 强制元素显示                                                 |
| .hidden            | 强制元素隐藏                                                 |
| .sr-only           | 除了屏幕阅读器外，其他设备上隐藏元素                         |
| .sr-only-focusable | 与 .sr-only 类结合使用，在元素获取焦点时显示(如：键盘操作的用户) |
| .text-hide         | 将页面元素所包含的文本内容替换为背景图                       |
| .close             | 显示关闭按钮                                                 |
| .caret             | 显示下拉式功能                                               |

------

## 更多实例

### 关闭图标

使用通用的关闭图标来关闭模态框和警告框。使用 class **close** 得到关闭图标。

```html
<p>关闭图标实例
  <button type="button" class="close" aria-hidden="true">
    &times;
  </button>
</p>
```

### 插入符

使用插入符表示下拉功能和方向。使用带有 class **caret** 的 <span> 元素得到该功能。

```html
<p>插入符实例
  <span class="caret"></span>
</p>
```

### 快速浮动

可以分别使用 class **pull-left** 或 **pull-right** 来把元素向左或向右浮动。下面的实例演示了这点。

```html
实例
<div class="pull-left">
  向左快速浮动
</div>
<div class="pull-right">
  向右快速浮动
</div>
```

### 内容居中

使用 class **center-block** 来居中元素。

```html
<div class="row">
  <div class="center-block" style="width:200px;background-color:#ccc;">
    这是 center-block 实例
  </div>
</div>
```

### 清除浮动

如需清除元素的浮动，请使用 **.clearfix** class。

```html
<div class="clearfix"  style="background: #D8D8D8;border: 1px solid #000;padding: 10px;">
  <div class="pull-left" style="background:#58D3F7;">
    向左快速浮动
  </div>
  <div class="pull-right" style="background: #DA81F5;">
    向右快速浮动
  </div>
</div>
```

### 显示和隐藏内容

您可以通过使用 class **.show** 和 **.hidden** 来强行设置元素显示或隐藏（包括屏幕阅读器）。

```html
<div class="row" style="padding: 91px 100px 19px 50px;">
  <div class="show" style="margin-left:10px;width:300px;background-color:#ccc;">
    这是 show class 的实例
  </div>
  <div class="hidden" style="width:200px;background-color:#ccc;">
    这是 hide class 的实例
  </div>
</div>
```

### 屏幕阅读器

您可以通过使用 class **.sr-only** 来把元素对所有设备隐藏，除了屏幕阅读器。

# Bootstrap 按钮组

按钮组允许多个按钮被堆叠在同一行上。当你想要把按钮对齐在一起时，这就显得非常有用。您可以通过 [Bootstrap 按钮（Button） 插件](https://www.runoob.com/bootstrap/bootstrap-button-plugin.html) 添加可选的 JavaScript 单选框和复选框样式行为。

下面的表格总结了 Bootstrap 提供的使用按钮组的一些重要的 class：

| Class                                       | 描述                                                         | 代码示例                                                     |
| :------------------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| .btn-group                                  | 该 class 用于形成基本的按钮组。在 **.btn-group** 中放置一系列带有 class **.btn** 的按钮。 | `<div class="btn-group">   <button type="button" class="btn btn-default">Button1</button>    <button type="button" class="btn btn-default">Button2</button> </div>` |
| .btn-toolbar                                | 该 class 有助于把几组 <div class="btn-group"> 结合到一个 <div class="btn-toolbar"> 中，一般获得更复杂的组件。 | `<div class="btn-toolbar" role="toolbar">   <div class="btn-group">...</div>   <div class="btn-group">...</div> </div>` |
| .btn-group-lg, .btn-group-sm, .btn-group-xs | 这些 class 可应用到整个按钮组的大小调整，而不需要对每个按钮进行大小调整。 | `<div class="btn-group btn-group-lg">...</div> <div class="btn-group btn-group-sm">...</div> <div class="btn-group btn-group-xs">...</div>` |
| .btn-group-vertical                         | 该 class 让一组按钮垂直堆叠显示，而不是水平堆叠显示。        | `<div class="btn-group-vertical">   ... </div>`              |

## 按钮上拉菜单

菜单也可以往上拉伸的，只需要简单地向父 **.btn-group** 容器添加 **.dropup** 即可。

当一个人力图完善自己的时候，他将不再像外界寻求什么，也不向外界推诿什么，他将重心放在自己的内部，而社会的进步就由一个一个独立的人试图自我完善的过程当中得来。我的起点那么低，所以这个过程无限长，永无尽头。想到这一点也就踏实了。

善良的人，总觉得拒绝别人像是自己做错了事。有些人，你帮他七分，他反倒觉得你欠他三分。

不知不觉一年又过去了，初步回味一下这 一年，没心没肺笑过，不求回报傻过，无可奈何的承受过，心静如水的经历过，心如刀绞的期盼过。曾以为过不去的坎，回头看一看笑一笑，都是小事。

人应该具备两个觉悟：一是勇于从零开始，二是坦然于未完成。

总有一日，我要在一个充满阳光的早晨醒来，那时我要躺在床上，静静的听窗外如洗的鸟声，那是多么安适而又快乐的一种苏醒。

读的书走的路见的人经的事越多，才越发觉得自己知道的越少，而人只有知道自己的无知之后，才能从骨子里谦和起来，不再孤芳自赏，不再咄咄逼人，不再恃才傲物，因而也不会再去强迫别人接受自己的观点。