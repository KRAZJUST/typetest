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
  document.querySelector("#text pre").style.color = "white";
}

document.addEventListener("keydown", function(event) {
  startTimer(); // Start the timer on keydown
  handleKey(event);
});

function handleKey(event) {
  const textElement = document.getElementById('text');
  const reset_button = document.getElementById('reset_button');
  const allowedKeys = /^[a-zA-Z0-9\s`~!@#$%^&*()_+\-=\[\]{}\\|;':",.<>\/\?]|Enter|Backspace|Delete$/;

  // Skip whitespace and newline characters until a non-whitespace character is found
  while (currentPosition < textElement.textContent.length && (
    textElement.textContent.charAt(currentPosition) === '\n' ||
    textElement.textContent.charAt(currentPosition) === ' '
  )) {
    currentPosition++;
  }

  const currentChar = textElement.textContent.charAt(currentPosition);
  const pressedChar = event.key;

  if (pressedChar === "Shift") { return; }
  if (!timerRunning) { return; }

  if (pressedChar.match(allowedKeys)) {
    document.getElementById("currentChar").textContent = `${currentChar}`;

    if (currentChar == pressedChar) {
      characterCount++;
    }
    updateText();

    if (currentChar === '\n') { // Check for newline character
      while (currentPosition < textElement.textContent.length && (textElement.textContent.charAt(currentPosition) === '\n' || textElement.textContent.charAt(currentPosition) === ' ')) {
        currentPosition++;
      }
    } else {
      currentPosition++;
    }
  }

  const counter = document.getElementById('counter');
  if (counter) {
    counter.textContent = characterCount;
  } else {
    console.error('counter element not found');
  }
  
  if (reset_button) {
    reset_button.addEventListener('click', function () {
      stopTimer();
      reset_count();
      reset_text();
    });
  } else {
    console.error('Reset button listener not found.');
  }
}


// Function to randomly choose one of the code snippets from json file
function getRandomCodeSnippet(codeSnippets) {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  return codeSnippets[randomIndex].code;
}

// Fetch the JSON file containing code snippets
fetch('code-snippets.json')
  .then(response => response.json())
  .then(data => {
    // Store the code snippets in a variable
    const codeSnippets = data;

    // Randomly select a code snippet
    const randomSnippet = getRandomCodeSnippet(codeSnippets);

    // Display the randomly selected code snippet
    displayCodeSnippet(randomSnippet);
  })
  .catch(error => console.error('Error fetching JSON:', error));


// Function to display code snippet with correct formatting
function displayCodeSnippet(code) {
  const codeElement = document.querySelector('#text pre');
  codeElement.textContent = code; // Set the text content to the formatted code
  updateText(); // Update the text highlighting after setting the new code
}

  
// Function to update text highlighting
function updateText() {
  const textElement = document.getElementById('text');
  let textHTML = '';

  for (let i = 0; i < textElement.textContent.length; i++) {
    const char = textElement.textContent.charAt(i);

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
    })
  }
}


const textElement = document.getElementById('text');

document.addEventListener('DOMContentLoaded', function(){
const reset_button = document.getElementById('reset_button');

if (reset_button) {
  reset_button.addEventListener('click', function () {
    stopTimer();
    reset_count();
    reset_text();
  });
} else {
  console.error('Reset button listener not found.');
}
});
