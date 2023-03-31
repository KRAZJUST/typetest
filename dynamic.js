
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


document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.getElementById('text');
  const textContent = textElement.textContent;
  let characterCount = 0;
  let currentPosition = 0;
  const allowedKeys = /^[a-z0-9\s`~!@#$%^&*()_+\-=\[\]{}\\|;':",.<>\/\?]|Enter|Backspace|Delete$/;
  
  updateText();

  document.addEventListener('keydown', (event) => {
    if (currentPosition < textContent.length){
      const currentChar = textContent.charAt(currentPosition);
      const pressedChar = event.key;
      if (pressedChar.match(allowedKeys)) {

      document.getElementById("currentChar").textContent = `${currentChar}`;

      if (currentChar == pressedChar){
        characterCount++;
      }
      updateText();
      currentPosition++;

    }
    const counter = document.getElementById('counter');
    if (counter) {
      counter.textContent = characterCount;
    } else {
      console.error('counter element not found');
    }
  } 
})
  
  function updateText() {
    let textHTML = '';
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent.charAt(i);
      if (i <= currentPosition) {
        textHTML += `<span style="color: green">${char}</span>`;
      } else {
        textHTML += char;
      }
    }
    textElement.innerHTML = `<pre>${textHTML}</pre>`;
  }

});


console.log(document.getElementById('counter').textContent);