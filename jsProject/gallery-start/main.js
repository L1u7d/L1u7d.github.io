const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 遍历图片并添加至缩略图区 */
for(var i=1;i<=5;i++){
	const newImage = document.createElement("img");

	newImage.setAttribute("src","images/pic"+i+".jpg");
	thumbBar.appendChild(newImage);
	newImage.addEventListener("click",disPlay);
}
//为略缩图添加onclick事件

function disPlay(e){
	displayedImage.setAttribute("src",e.target.getAttribute("src"));
}
// const newImage = document.createElement('img');
// newImage.setAttribute('src', xxx);
// thumbBar.appendChild(newImage);

/* 编写 变亮/变暗 按钮 */
btn.addEventListener("click",al);
function al(){
	if (btn.getAttribute("class")=="dark") {
	btn.setAttribute("class","light");
	btn.textContent = "变亮";
	overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
	} else {
		btn.setAttribute("class","dark");
		btn.textContent = "变暗";
		overlay.style.backgroundColor = "rgba(0,0,0,0)";
	}
}

