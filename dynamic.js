// Definition of variables
var count = 30 * 1000;
var timer;
var timerRunning = false;
var timer_expired = false;
let characterCount = 0;
let currentPosition = 0;
let start_time = null;
let cmp_interval = null;


/*
* Function to display the 30 seconds timer setting flags after the time is up to prevent
* any other updating of the count
*/
function startTimer(){
  if(!timerRunning){
    timerRunning = true;
    start_time = Date.now();
    timer = setInterval(function(){
      count -= 10;
      var minutes = Math.floor((count / 1000 / 60) % 60).toString().padStart(2, '0');
      var seconds = Math.floor((count / 1000) % 60).toString().padStart(2, '0');
      var milliseconds = Math.floor(count % 1000).toString().padStart(3, '0');
      document.getElementById("timer").innerHTML = `${minutes}:${seconds}:${milliseconds}`;

      if(count <= 0){
        clearInterval(timer);
        timerRunning = false;
        stop_cpm_timer();
        timer_expired = true;
      }
    }, 10);
    start_cpm_update();
  }
}

/*
* Function to reset the timer
*/
function stopTimer(){
  timerRunning = false;
  clearInterval(timer);
  count = 30 * 1000;
  document.getElementById("timer").innerHTML = "00:30:00";
  stop_cpm_timer();
  timer_expired = false;
}

/*
* Function to reset the variables used to count current position and written
*/
function reset_count(){
  characterCount = 0;
  currentPosition = 0;

  document.getElementById("counter").textContent = "0";  
  document.getElementById("cpm").textContent = "0";
}

/*
* Function to reset generated text back to white and set flag typing_started to false again
*/
function reset_text(){
  typing_started = false;
  document.querySelector("#text pre").style.color = "white";
}

/*
* Update CPM every second
*/
function start_cpm_update(){
  cmp_interval = setInterval(update_cpm, 1000); 
}

/*
* Function to stop cpm_timer and clear interval
*/
function stop_cpm_timer(){
  clearInterval(cmp_interval);
}

/*
* Function to update CPM counter in realtime and show it on the page
*/
function update_cpm(){
  if(start_time){
    const elapsed_time = (Date.now() - start_time) / 1000; // in seconds
    const cpm = (characterCount / elapsed_time) * 60;      // Character per minute
    document.getElementById("cpm").textContent = `${cpm.toFixed(2)}`;
  }
}

// Start when the first key is pressed
document.addEventListener("keydown", function(event) {
  // Prevent keyboard events when the timer is up
  if (timer_expired) {
    event.preventDefault(); 
  } 
  // Start the timer on keydown and set typing_started flag to true when first key is pressed
  else {
    startTimer(); 
    if (!typing_started) {
      typing_started = true;
    }
    handleKey(event);
    update_cpm();
  }
});

let firstNonSpaceEncountered = false;

/*
* Function to handle key presses and text highlighting
*/
function handleKey(event) {
  const textElement = document.getElementById('text');
  const reset_button = document.getElementById('reset_button');
  const allowedKeys = /^[a-zA-Z0-9\s`~!@#$%^&*()_+\-=\[\]{}\\|;':",.<>\/\?]|Enter|Backspace|Delete$/;

  const currentChar = textElement.textContent.charAt(currentPosition);
  const pressedChar = event.key;

  if (pressedChar === "Shift") { return; }
  if (!timerRunning) { return; }

  if (pressedChar.match(allowedKeys)) {
    if (currentChar == pressedChar) {
      characterCount++;
    }
    updateText();

    // Check for newline character and skip onto the next char if found
    if (currentChar === '\n') { 
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
  
}

/*
* Function to randomly choose one of the code snippets from json file
*/
function getRandomCodeSnippet(codeSnippets) {
  const randomIndex = Math.floor(Math.random() * codeSnippets.length);
  return codeSnippets[randomIndex].code;
}


/*
* Function to display code snippet with correct formatting
*/
function displayCodeSnippet(code) {
  const codeElement = document.querySelector('#text pre');                      
  codeElement.textContent = code;
  updateText();
}

/* 
*  Function to load and display a random code snippet
*/
function loadRandomCodeSnippet(){

  fetch('code-snippets.json')
  .then(response => response.json())
  .then(data => {
    // Store the code snippets in a variable
    const codeSnippets = data;

    // Randomly select a code snippet
    const randomSnippet = getRandomCodeSnippet(codeSnippets);

    // Remove leading and trailing whitespaces
    const trimmed_snippet = randomSnippet.trim();

    // Display the randomly selected code snippet
    displayCodeSnippet(trimmed_snippet);
  })
  .catch(error => console.error('Error fetching JSON:', error));
}

document.addEventListener('DOMContentLoaded', function(){
  loadRandomCodeSnippet();
});
  

// Flag to track whether typing has started
let typing_started = false;

/*
* Function to highlight already written text into orange and then reseting it back
*/
function updateText() {
  const textElement = document.getElementById('text');
  textElement.style.color = 'white';
  let textHTML = '';

  for (let i = 0; i < textElement.textContent.length; i++) {
    const char = textElement.textContent.charAt(i);

    if (typing_started && i <= currentPosition) {
      textHTML += `<span style="color: #FF8C00">${char}</span>`; //orange
    } else {
      textHTML += char;
    }
  }
  
  textElement.innerHTML = `<pre>${textHTML}</pre>`;
  
  if(reset_button){
    reset_button.addEventListener('click', function(){
      textElement.style.color = 'white';
    });
  }
}

/*
* Gets the reset button after the page is loaded or return error if the button was not found
*/
document.addEventListener('DOMContentLoaded', function(){
const reset_button = document.getElementById('reset_button');

// If the reset button was found, activates it on the click
if (reset_button) {
  reset_button.addEventListener('click', function () {
    stopTimer();
    reset_count();
    reset_text();

    // Load a random code snippet everytime the reset button is pressed
    loadRandomCodeSnippet();
    updateText();
  });

  // Prevents activating the button after pressing keys while the button is selected
  reset_button.addEventListener('keydown', function (event) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.preventDefault();
    }
  });

  // Resets everything right after page is loaded
  reset_button.click();
} else {
  console.error('Reset button listener not found.');
}
});
