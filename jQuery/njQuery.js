(function(window,undefined){
	var njQuery = function(selector){
		return new njQuery.prototype.init(selector);
	}
	njQuery.prototype = {
		constructor: njQuery,
		init: function(selector){
			//1，传入""、null、undefined、NaN、0、false 返回空jQuery对象
			//2，字符串
			// 	传入Html片段
			// 		会将创建好的DOM元素存储到jQuery对象返回。
			// 	传入选择器
			// 		会将找到的所有的元素存储到jQuery对象返回
			// 3，数组
			// 	会将数组存储的元素依次存储到jQuery对象中返回
			// 4，其他类型
			// 	会将传入的数据类型存储到jQuery对象返回
			// 0,去除字符串两端的空格
			selector = njQuery.trim(selector);
			// 	1,传入""、null、undefined、NaN、0、false
			if (!selector) {
				return this;
			}
			//方法处理
			else if(njQuery.isFunction(selector)){
				njQuery.ready(selector);
			}
			// 2,字符串
			else if(njQuery.isString(selector)) {
				//2.1 html代码
				if (njQuery.isHtml(selector)) {
					//1,根据代码片段创建所有元素
					var temp = document.createElement("div");
					temp.innerHTML = selector;
					// //2，将创建好的一级元素添加到jQuery当中
					// for(var i = 0; i <temp.children.length;i++){
					// 	this[i] = temp.children[i];
					// }
					// //3，给jQuery对象添加length属性
					// this.length = temp.children.length;
					// 替换2，3步
					[].push.apply(this,temp.children);
					//4，返回加工好的this(jQuery)
					// return this;
				}
				//2.2 选择器
				else{
					//1，根据传入的选择器找到对应的元素
					var res = document.querySelectorAll(selector);
					//2，将找到的元素添加到njQuery上
					[].push.apply(this,res);
					//3，返回加工好的this
					// return this;
				}
			}
			//3,数组
			else if(njQuery.isArray(selector)){
				//3.1真数组
				if ({}.toString.apply(selector) === "[object Array]") {
					[].push.apply(this,selector);
					// return this;
				}
				//3.2伪数组
				else {
					//为了适应低版本浏览器，将伪数组转换为真数组
					var arr = [].slice.call(selector);
					//将真数组转换为伪数组
					[].push.apply(this,arr);
					// return this;
				}
			}
			//4,除上述类型以外
			else {
				this[0] = selector;
				this.length = 1;
				// return this;
			}
			return this;
		},
		//获取当前jQuery版本号
		jquery: "1.1.0",
		//selector,实例默认的选择器取值
		selector: "",
		//length,实例默认的长度 0 
		length: 0,
		//push方法,给实例添加元素
		push: [].push,
		//sort方法，对实例中的元素进行排序
		sort: [].sort,
		//splice方法，按照下标指定数量删除元素和替换元素
		splice: [].splice,
		//toArray 转换为真数组
		toArray: function(){
			return [].slice.call(this);
		},
		//get，获取指定下标的元素，获取的为原生DOM
		get: function(num){
			//没有传递参数
			if (arguments.length === 0) {
				return this.toArray();
			}
			//传递不是负数
			else if (num >= 0) {
				return this[num];
			}
			//传递负数
			else {
				return this[num+this.length];
			}
		},
		//eq,获取指定下标的元素，获取的是jQuery类型的实例对象
		eq: function(num){
			//没有传递参数
			if (arguments.length === 0) {
				return new njQuery();
			}
			//传递参数时
			else {
				return njQuery(this.get(num));
			}
		},
		//first，获取实例中的第一个元素，是jQuery类型的实例对象
		first: function(){
			return this.eq(0);
		},
		//last,获取实例中的最后一个元素，是jQuery类型的实例对象
		last: function(){
			return this.eq(-1);
		},
		//each 遍历实例，把遍历到的数据传给回调使用
		each: function(fn){
			return njQuery.each(this,fn);

		},
		//map,遍历实例，把遍历到的数据传给回调使用，然后把回调的返回值收集起来组成一个新数组返回
		map: function(){

		}
	}
	njQuery.extend = njQuery.prototype.extend = function(obj){
		for(var key in obj){
			this[key] = obj[key];
		}
	}
	njQuery.extend({

		isString: function(str){
			return typeof str === "string";
		},
		isHtml: function(str){
			return str.charAt(0) == "<" && str.charAt(str.length-1) == ">" && str.length >= 3
		},
		trim: function(str){
			if (!njQuery.isString(str)) {
				return str;
			}
			if (str.trim) {
				return str.trim();
			} else {
				return str.replace(/^\s+|\s+$/g,"");
			}
		},
		isObject: function(str){
			return typeof str === "object";
		},
		isWindow: function(str){
			return str === window;
		},
		isArray: function(str){
			if (njQuery.isObject(str) && !njQuery.isWindow(str) && "length" in str) {
				return true;
			}
			return false;
		},
		isFunction: function(str){
			return typeof str === "function";
		},
		ready:function(fn){
			//判断DOM元素是否加载完毕
			if (document.readyState == "complete") {
				fn();
			} else if(document.addEventListener){
				document.addEventListener("DOMContentLoaded",function(){
					fn();
				});
			} else {
				document.attachEvent("onreadystatechange",function(){
					if (document.readyState == "compelte") {
						fn();
					}
				})
			}
			
		},
		each: function(obj,fn){
			//1,判断是否为数组
			if (njQuery.isArray(obj)) {
				for(var i = 0;i < obj.length;i++ ){
					// var res = fn(i, obj[i]);
					// 将回调函数的this改为但前的对象值
					var res = fn.call(obj[i],i,obj[i]);
					if (res === true) {
						continue;
					} else if (res === false) {
						break;
					}
				}
			}
			//2，判断是否为对象
			else if (njQuery.isObject(obj)) {
				for(var key in obj){
					// var res = fn(key, obj[key]);
					var res = fn.call(obj[key],key,obj[key]);
					if (res === true) {
						continue;
					} else if (res === false) {
						break;
					}
				}
			}
			return obj;
		},
		map: function(obj,fn){
			var res = [];
			//1,判断是否为数组
			if (njQuery.isArray(obj)) {
				for(var i = 0;i < obj.length;i++ ){
					var temp = fn(obj[i],i);
					if (temp) {
						res.push(temp);
					}
				}
			}
			//判断是否为对象
			else if (njQuery.isObject(obj)){
				for(var key in obj){
					var temp = fn(obj[key],key);
					if (temp) {
						res.push(temp);
					}
				
				}
			}
			return res;
		}
		
	});
	njQuery.prototype.init.prototype = njQuery.prototype;
	window.njQuery = window.$ = njQuery;
})(window);