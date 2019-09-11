let counter = 0;
let time;
const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnReset = document.querySelector(".reset");
const p = document.querySelector(".display");

function countTime() {
	let hour = Math.floor(counter/3600);
	let minu = Math.floor((counter%3600)/60);
	let sec = Math.floor(counter%60);

	let h1 = (hour<10) ? "0"+hour : hour;
	let m1 = (minu<10) ? "0"+minu : minu;
	let s1 = (sec<10) ? "0"+sec : sec;

	p.textContent = h1+":"+m1+":"+s1;

	counter++;
}

btnStart.addEventListener("click",() => {
	time = setInterval(countTime,1000);
});
btnStop.addEventListener("click",function (){
	clearInterval(time);
});
btnReset.addEventListener("click",function(){
	clearInterval(time);
	counter = 0;
});
countTime();
