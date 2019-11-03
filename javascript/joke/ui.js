const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  return array[Math.floor(Math.random()*array.length)];
}

let storyText = "It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.";
let insertX = ["Willy the Goblin", "Big Daddy", "Father Christmas"];
let insertY = ["the soup kitchen", "Disneyland" ,"the White House"];
let insertZ =["spontaneously combusted", "melted into a puddle on the sidewalk" ,"turned into a slug and crawled away"];

randomize.addEventListener('click', result);

function result() {
	let newsotry = storyText;
	let xItem = randomValueFromArray(insertX);
	let yItem = randomValueFromArray(insertY);
	let zItem = randomValueFromArray(insertZ);

	newsotry = newsotry.replace(":insertx",xItem);
	newsotry = newsotry.replace(":inserty",yItem);
	newsotry = newsotry.replace(":insertz",zItem);
  if(customName.value !== '') {
    var name = customName.value;
    newstory = newsotry.replace("Bob",name);
  }

  if(document.getElementById("uk").checked) {
    var weight = Math.round(300);
    var temperature =  Math.round(94);

  }

  story.textContent = newsotry;
  story.style.visibility = 'visible';
}