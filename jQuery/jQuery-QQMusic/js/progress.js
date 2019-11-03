(function(window){
	function Progress($progressBar,$progressLine,$progressDot){
		return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
	}
	Progress.prototype = {
		constructor:Progress,
		isMove:false,
		init:function($progressBar,$progressLine,$progressDot){
			this.$progressBar=$progressBar;
			this.$progressLine=$progressLine;
			this.$progressDot=$progressDot;
		},
		progressClick:function(callBack){
			var $this = this;
			//监听progress背景的点击
			this.$progressBar.click(function(){
				//获取背景距离窗口默认的位置
				var normalLeft = $(this).offset().left;
				//获取点击的位置距离窗口的位置
				var eventLeft = event.pageX;
				//设置前景的宽度
				$this.$progressLine.css("width",(eventLeft-normalLeft));
				//设置点的位置
				$this.$progressDot.css("left",(eventLeft-normalLeft));
				//计算进度条的比例
				var value = (eventLeft-normalLeft) / $(this).width();
				callBack(value);
			});

		},
		//监听拖动事件
		progressMove:function(callBack){
			var $this = this;
			//获取背景距离窗口默认的位置
			var normalLeft = this.$progressBar.offset().left;
			var barWidth = this.$progressBar.width();
			var eventLeft;
			//监听鼠标按下事件
			this.$progressBar.mousedown(function(){
				$this.isMove = true;
				//监听鼠标移动事件
				$(document).mousemove(function() {
					//获取点击的位置距离窗口的位置
					eventLeft = event.pageX;
					//判断progressBar的范围
					if ((eventLeft-normalLeft)>=0 && (eventLeft-normalLeft)<= barWidth) {
						//设置前景的宽度
						$this.$progressLine.css("width",(eventLeft-normalLeft));
						//设置点的位置
						$this.$progressDot.css("left",(eventLeft-normalLeft));
					}
				});
			});
			//监听鼠标抬起事件
			$(document).mouseup(function(){
				$(document).off("mousemove");
				$this.isMove = false;
				//计算进度条的比例
				//var eventLeft = event.pageX;
				var value = (eventLeft-normalLeft) / $this.$progressBar.width();
				callBack(value);
			});
		},
		//设置进度条，与播放时间同步
		setProgress:function(value){
			if (this.isMove) return;
			if (value < 0 || value > 100) {
				return;
			}
			this.$progressLine.css({
				width: value+"%"
			});
			this.$progressDot.css({
				left: value+"%"
			});
		}
		
		
	}
	Progress.prototype.init.prototype = Progress.prototype;
	window.Progress = Progress;
})(window);