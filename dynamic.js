
var count = 30 * 1000;
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
  timerRunning = false;
  clearInterval(timer);
  count = 30 * 1000;
  document.getElementById("timer").innerHTML = "00:30:00";
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
    
    if (pressedChar === "Shift"){return;}
    if (!timerRunning){return;}

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
  
/*
  Function to change the color of already proccesed text and the following
  character to type.

  #TODO fix that at the end of the line it shows beggining of the next line
        as next character
*/
  function updateText() {
    let textHTML = '';
    for (let i = 0; i < textContent.length; i++) {
      const char = textContent.charAt(i);
      
      if (i <= currentPosition) {
        textHTML += `<span style="color: #FF8C00">${char}</span>`;
      } else if (i === currentPosition + 1) {
        textHTML += `<span style="color: #E75480">${char}</span>`;
      } else {
        textHTML += char;
      }
    }
    textElement.innerHTML = `<pre>${textHTML}</pre>`;

    if(reset_button){
      reset_button.addEventListener('click', function(){
        textHTML = textHTML.split('#FF8C00').join('#FFFFFF');
        textHTML = textHTML.split('#E75480').join('#FFFFFF');
        textElement.innerHTML = `<pre>${textHTML}</pre>`;
      });
    }

  }

});


console.log(document.getElementById('counter').textContent);