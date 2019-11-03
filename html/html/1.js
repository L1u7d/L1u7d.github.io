function funAge3() {
			var x,age;
			age=Number(document.getElementById("age").value);
			//if (isNaN(age)) {
			//	x="输入的不是数字，请重新输入："；
			//} else {
			//	x=(x>=18) ? "你已经长大了" : "你还要再吃几年饭呢"；
			//}
			document.getElementById("demo").innerHTML=age;
		}