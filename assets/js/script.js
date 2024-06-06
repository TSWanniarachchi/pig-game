"use strict";

/////////////////////////////////////////////////
// DOM Elements

const secPlayer0 = document.querySelector(".player--0");
const secPlayer1 = document.querySelector(".player--1");

const lblScore0 = document.getElementById("score--0");
const lblScore1 = document.getElementById("score--1");
const lblCurrent0 = document.getElementById("current--0");
const lblCurrent1 = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const imgDice = document.querySelector(".dice");

/////////////////////////////////////////////////
// Constants

const WINNING_SCORE = 100;

/////////////////////////////////////////////////
// State Variables

let scores;
let currentScore;
let activePlayer;
let isPlaying;

/////////////////////////////////////////////////
// Functions

// Switch to the next player
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  secPlayer0.classList.toggle("player--active");
  secPlayer1.classList.toggle("player--active");
};

///////////////////////////////////////
// Event Handlers

// Initialize the game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  lblScore0.textContent = 0;
  lblScore1.textContent = 0;
  lblCurrent0.textContent = 0;
  lblCurrent1.textContent = 0;

  imgDice.classList.add("hidden");
  secPlayer0.classList.remove("player--winner");
  secPlayer0.classList.add("player--active");
  secPlayer1.classList.remove("player--winner");
  secPlayer1.classList.remove("player--active");
};

// Roll the dice
const rollDice = function () {
  if (isPlaying) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    imgDice.classList.remove("hidden");
    imgDice.src = `assets/images/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
};

// Hold the current score and check for a winner
const holdScore = function () {
  if (isPlaying) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= WINNING_SCORE) {
      // Finish the game
      isPlaying = false;
      imgDice.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
};

///////////////////////////////////////
// Event Listeners

// Initialize the game when the page loads
window.addEventListener("load", init);

// Start a new game when the New Game button is clicked
btnNew.addEventListener("click", init);

// Roll the dice when the Roll Dice button is clicked
btnRoll.addEventListener("click", rollDice);

// Hold the score when the Hold button is clicked
btnHold.addEventListener("click", holdScore);
