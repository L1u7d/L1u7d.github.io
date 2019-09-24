$(function(){

	//设置滚动条
	$(".content_list").mCustomScrollbar();

	var $audio = $("audio");
	var player = new Player($audio);
	var lyric;

	//定义一个progress
	var $progressBar = $(".music_progress_bar");
	var $progressLine = $(".music_progress_line");
	var $progressDot = $(".music_progress_dot");
	var progress = Progress($progressBar,$progressLine,$progressDot);
	progress.progressClick(function(value){
		player.musicSeekTo(value);
	});
	progress.progressMove(function(value){
		player.musicSeekTo(value);
	});

	//音量条
	var $voiceBar = $(".music_voice_bar");
	var $voiceLine = $(".music_voice_line");
	var $voiceDot = $(".music_voice_dot");
	var voiceprogress = Progress($voiceBar,$voiceLine,$voiceDot);
	voiceprogress.progressClick(function(value){
		player.musicVoiceSeekTo(value);
	});
	voiceprogress.progressMove(function(value){
		player.musicVoiceSeekTo(value);
	});
	//加载歌曲列表
	getPlayerList();
	function getPlayerList(){
		$.ajax({
			url:"./source/musiclist.json",
			dataType:"json",
			success: function(data){
				player.musicList = data;
				//遍历获取到的数组，创建每一条音乐
				var $musicList = $(".content_list ul");
				$.each(data,function(index,ele){
					var $item = createMusicItem(index,ele);
					$musicList.append($item);
				});
				initMusicInfo(data[0]);
				initMusicLyric(data[0]);
			},
			error:function(e){
				console.log(e);
			}
		});
	}
	//初始化歌曲信息
	function initMusicInfo(music){
		//歌曲图片
		var $musicImg = $(".song_info_pic img");
		//歌曲名称
		var $musicName = $(".song_info_name a");
		//歌手名
		var $musicSinger = $(".song_info_singer a");
		//专辑名
		var $musicAlbum = $(".song_info_album a");
		//进度条上的歌曲信息
		var $musicProgressName = $(".music_progress_name");
		//进度条上的时间信息
		var $musicProgressTime = $(".music_progress_time");
		//界面背景
		var $musicBackground = $(".mask_bg");

		//给获取的元素赋值
		$musicImg.attr("src",music.cover);
		$musicName.text(music.name);
		$musicSinger.text(music.singer);
		$musicAlbum.text(music.album);
		$musicProgressName.text(music.name+" / "+music.singer);
		$musicProgressTime.text("00:00 / "+music.time);
		$musicBackground.css("background","url('"+music.cover+"')");
	}
	//初始化歌词信息
	function initMusicLyric(music){
		lyric = new Lyric(music.link_lrc);
		var $lryContainer = $(".song_lyric");
		//清空上一首歌曲的歌词信息
		$lryContainer.html("");
		lyric.loadLyric(function(){
			//创建歌词列表
			$.each(lyric.lyrics,function(index,ele){
				var $item = $("<li>"+ele+"</li>");
				$lryContainer.append($item);
			})
			
		});
	}
	//初始化事件监听
	initEvents();
	function initEvents(){
		//监听歌曲的移入移出事件
		//因后面改的歌曲信息是自动添加的，所以事件要进行委托
		$(".content_list").delegate('.music', 'mouseenter', function(event) {
			//显示子菜单
			$(this).find('.list_menu').stop().fadeIn(100);
			$(this).find('.list_time a').stop().fadeIn(100);
			//隐藏时长
			$(this).find(".list_time span").stop().fadeOut(100);
		});
		$(".content_list").delegate('.music', 'mouseleave', function(event) {
			//隐藏子菜单
			$(this).find('.list_menu').stop().fadeOut(100);
			$(this).find('.list_time a').stop().fadeOut(100);
			//显示时长
			$(this).find(".list_time span").stop().fadeIn(100);
		});
		//监听复选框的点击事件
		$(".content_list").delegate(".list_check","click",function(){
			$(this).toggleClass('list_checked');
		});
		//找到下方播放按钮
		$musicPlay = $(".music_play");
		//添加子菜单播放按钮的监听
		$(".content_list").delegate(".list_menu_play","click",function(){
			var $item = $(this).parents(".music");
			// console.log($item.get(0).index);
			// console.log($item.get(0).music);
			//切换播放的图标
			$(this).toggleClass('list_menu_play2');
			//关闭其他歌曲的暂停图标
			$item.siblings().find('.list_menu_play').removeClass('list_menu_play2');
			//切换下方播放图标
			//判断列表歌曲的图标状况
			if($(this).attr("class").indexOf("list_menu_play2")!=-1){
				//当前子菜单是播放状态
				$musicPlay.addClass('music_play2');
				//歌曲信息文字高亮
				$item.find("div").css("color","#fff");
				//让其他歌曲的信息不高亮
				$item.siblings().find('div').css("color","rgba(255,255,255,0.5)");
			} else {
				//当前子菜单不是播放状态
				$musicPlay.removeClass('music_play2');
				//歌曲信息文字不高亮
				$item.find("div").css("color","rgba(255,255,255,0.5)");
				//切换序号状态
				//$(this).parents(".music").find(".list_number").removeClass('list_number2');
			}
			//切换序号的状态
			$item.find(".list_number").toggleClass('list_number2');
			//移除其他歌曲的序号状态
			$item.siblings().find('.list_number').removeClass('list_number2');

			//播放音乐
			player.playMusic($item.get(0).index,$item.get(0).music);

			//切换歌曲信息
			initMusicInfo($item.get(0).music);
			//切换歌词信息
			initMusicLyric($item.get(0).music);

		});
			//控制下方播放按钮
			//前一首
			$(".music_pre").click(function(){
				$(".music").eq(player.preIndex()).find(".list_menu_play").trigger("click");
			});
			//播放中
			$musicPlay.click(function(){
				//判断是否播放过音乐
				if (player.currentIndex == -1) {
					//没有播放过音乐
					$(".music").eq(0).find(".list_menu_play").trigger("click");
				}else{
					//播放过音乐
					$(".music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
				}
			});
			//后一首
			$(".music_next").click(function(){
				$(".music").eq(player.nextIndex()).find(".list_menu_play").trigger("click");
			});
			//删除按钮监听事件
			$(".content_list").delegate(".list_menu_del","click",function(){
				//找到要删除的歌曲
				var $item = $(this).parents(".music");
				//判断当前要删除的歌曲是否正在播放
				if ($item.get(0).index == player.currentIndex) {
					//正在播放,播放下一首
					$(".music_next").trigger("click");
					
				}
				//删除歌曲
				$item.remove();
				//删除后台的信息
				player.changeMusic($item.get(0).index);
				//重新排序
				$(".music").each(function(index,ele){
					ele.index = index;
					$(ele).find(".list_number").text(index+1);
				});
			});
			//监听播放进度
			player.musicTimeUpdate(function(currentTime,duration,timeStr){
				//同步时间
				$(".music_progress_time").text(timeStr);
				//同步进度条
				//计算播放比例
				var value = currentTime / duration *100;
				progress.setProgress(value);
				//实现歌词的同步
				var index = lyric.currentIndex(currentTime);
				var $item = $(".song_lyric li").eq(index);
				$item.addClass("cur");
				$item.siblings().removeClass("cur");
				if(index <= 2) return;
				$(".song_lyric").css({
					marginTop: (-index +2)*30
					
				});
			});
			//监听声音按钮的点击
			$(".music_voice_icon").click(function(event) {
				//切换图标
				$(this).toggleClass('music_voice_icon2');
				//关闭声音
				if ($(this).attr("class").indexOf("music_voice_icon2") != -1) {
					//当前为声音关闭图标
					//关闭声音
					player.musicVoiceSeekTo(0);
				}else{
					//变为有声音
					player.musicVoiceSeekTo(1);
				}
			});
			
	}
	
	
	//定义一个方法创建一条音乐
	function createMusicItem(index,music){
		var $item = $(`<li class="music">
							<div class="list_check"><i></i></div>
							<div class="list_number">`+(index+1)+`</div>
							<div class="list_song">`+music.name+`
								<div class="list_menu">
									<a class="list_menu_play" href="javascript:;" title="暂停"></a>
									<a href="javascript:;" title="添加到歌单"></a>
									<a href="javascript:;" title="分享"></a>
								</div>
							</div>
							<div class="list_singer">`+music.singer+`</div>
							<div class="list_time">
								<span>`+music.time+`</span>
								<a href="javascript:;" title="删除" class="list_menu_del"></a>
							</div>
						</li>`);
		$item.get(0).index = index;
		$item.get(0).music = music;
		return $item;
	}
});