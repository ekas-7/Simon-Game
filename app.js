let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let plevel=0;
let head = document.querySelector("#level-counter");
let highscore=0;

document.addEventListener("keypress", function () {
  if (!started) {
    let box=document.querySelector(".box");
    head.style.color="#8FFF49";
    box.classList.remove("red-box");
    head.style.fontSize = '3vw';
    started = true;
    nextSequence();
  }
});

function nextSequence() {
  // Increment the level
  level++;
  
  // Update the level display
  let head = document.querySelector("#level-counter");
  head.innerHTML = `Level ${level}`;
  
  // Generate a random color and add it to the game pattern
  let index = randomIndex();
  let randomColor = buttonColours[index];
  gamePattern.push(randomColor);
  playSound(randomColor);
  // Flash the selected color
  flashColor(randomColor);
}

function randomIndex() {
  // Generate a random index from 0 to 3
  return Math.floor(Math.random() * 4);
}

function flashColor(color) {
  // Flash the selected color
  let colorTag = document.querySelector(`.${color}`);
  colorTag.classList.add("flash");
  setTimeout(function () {
    colorTag.classList.remove("flash");
  }, 200);
}

let btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Handle user click on a button
    let clickedColor = btn.classList[1];
    userClickedPattern.push(clickedColor);
    
    // Flash the clicked color
    flashColor(clickedColor);
    
    // Check the user's answer
    checkAnswer(userClickedPattern.length - 1);
  });
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      // User completed the sequence, proceed to the next level
      setTimeout(function () {
        userClickedPattern = []; // Reset user's input
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    highscore=Math.max(highscore,level);
    plevel=level;
    head.innerHTML = `Game Over!<br>High-Score:${highscore-1}<br> Current Score:${plevel-1}`;
    head.style.fontSize = '2rem';
    head.style.color="red";
    let box=document.querySelector(".box");
    box.classList.add("red-box");
    let body=document.querySelector("body");
    body.classList.add("wrong");
    setTimeout(function () {
      body.classList.remove("wrong");
    }, 100);
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }
}

function playSound(color) {
  var sound = new Audio("Resources/" + color + ".mp3");
  sound.play();
}
