
var count = 60 * 1000;
var timer;
var timerRunning = false;

function startTimer(){
  if(!timerRunning){
    timerRunning = true;
    timer = setInterval(function(){
      count -= 10;
      var minutes = Math.floor((count / 1000 / 60) % 60).toString().padStart(2, '0');
      var seconds = Math.floor((count / 1000) % 60).toString().padStart(2, '0');
      var milliseconds = Math.floor(count % 1000).toString().padStart(3, '0');
      document.getElementById("timer").innerHTML = `${minutes}:${seconds}:${milliseconds}`;

      if(count <= 0){
        clearInterval(timer);
        alert("Time's up!");
        timerRunning = false;
      }
    }, 10);
  }
}

function stopTimer(){
  clearInterval(timer);
  count = 60 * 1000;
  document.getElementById("timer").innerHTML = "01:00:00";
  timerRunning = false;
}

document.addEventListener("keydown", startTimer);


const text = document.getElementById('text').textContent;
let characterCount = 0;
let currentPosition = 0;

document.addEventListener('keydown', (event) => {
  if (currentPosition < text.length){
    const currentChar = text.charAt(currentPosition);
    const pressedChar = event.key;

    if (currentChar == pressedChar){
      characterCount++; 
    }
    currentPosition++;
    document.getElementById('counter').textContent = '${currentPosition}';
  }
})

console.log(text)