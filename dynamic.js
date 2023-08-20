
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

let characterCount = 0;
let currentPosition = 0;

function reset_count(){
  characterCount = 0;
  currentPosition = 0;

  document.getElementById("currentChar").textContent = "none";
  document.getElementById("counter").textContent = "0";  
}

function reset_text(){
  document.querySelector("text").style.color = "white";

}

document.addEventListener("keydown", startTimer);


document.addEventListener('DOMContentLoaded', function() {
  const textElement = document.getElementById('text');
  const textContent = textElement.textContent;
  const allowedKeys = /^[a-zA-Z0-9\s`~!@#$%^&*()_+\-=\[\]{}\\|;':",.<>\/\?]|Enter|Backspace|Delete$/;
  const reset_button = document.getElementById('reset_button');

  updateText();

  if(reset_button){
    reset_button.addEventListener('click', function(){
      stopTimer();
      reset_count();
      reset_text();
    });
  }
  else{
    console.error('Reset button listener not found.');
  }


  document.addEventListener('keydown', (event) => {
    if (currentPosition < textContent.length){
      const currentChar = textContent.charAt(currentPosition);
      const pressedChar = event.key;
    
    if (pressedChar === "Shift") return;

    if (pressedChar.match(allowedKeys)) {

      document.getElementById("currentChar").textContent = `${currentChar}`;

      if (currentChar == pressedChar){
        characterCount++;
      }
      updateText();
      
      if (currentChar === '\n') { // Check for newline character
        while (currentPosition < textContent.length && (textContent.charAt(currentPosition) === '\n' || textContent.charAt(currentPosition) === ' ')) {
          currentPosition++;
        }
      }
      else {
        currentPosition++;
      }
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