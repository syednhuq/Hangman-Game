// Color Bank
var colorbank = ["red", "orange", "yellow", "lime", "green", "blue",
  "indigo", "purple", "violet", "pink", "white", "black"];

// Random Selection
var selected = "";

// Letter Split
var letter = [];

// Blank Words
var blanks = 0;

// Crossover
var swap = [];

// Graveyard
var wrongs = [];

// Guessed
var guessed = "";

// Scores
var wins = 0;
var losses = 0;
var guesses = 10;

// Start & Reset
function startGame() {

  // Reset to 0
  guesses = 10;

  // Correct Guess
  selected = colorbank[Math.floor(Math.random() * colorbank.length)];

  // Letter Split
  letter = selected.split("");

  // Word Length
  blanks = letter.length;

  // Reset Correct 
  swap = [];

  // Reset Incorrect
  wrongs = [];

  // Populate Blanks based on length
  for (var i = 0; i < blanks; i++) {
    swap.push("_");
  }

  // Reprints lives to 10.
  document.getElementById("remaining").innerHTML = guesses;

  // Prints blanks to index.html
  document.getElementById("blanks").innerHTML = swap.join(" ");

  // Clears wrong guesses
  document.getElementById("wrongs").innerHTML = wrongs.join(" ");
}

// Function to compare
function checkLetters(letter) {

  // Checks guess correctness
  var locate = false;

  // Check existence within array
  for (var i = 0; i < blanks; i++) {

    if (selected[i] === letter) {

      // If exists then true
      locate = true;
    }
  }

  // Locate letter on spaces
  if (locate) {

    // Loop word
    for (var x = 0; x < blanks; x++) {

      // Populate blank to letter
      if (selected[x] === letter) {

        // Match blanks to blanks and correct to correct
        swap[x] = letter;
      }
    }

  }

  // Does not exist
  else {

    // Add to graveyard
    wrongs.push(letter);

    // Loss of Lives
    guesses--;

  }

}

// Complete function
function roundComplete() {


  // index.html data population
  // Populate number of guesses
  document.getElementById("remaining").innerHTML = guesses;

  // Populate guesses and blanks
  document.getElementById("blanks").innerHTML = swap.join(" ");

  // Populate wrong guesses
  document.getElementById("wrongs").innerHTML = wrongs.join(" ");

  // Best match!
  if (letter.toString() === swap.toString()) {

    // Correct guesses
    wins++;

    // Winning message
    alert("Yay! You won!");

    // Populate win
    document.getElementById("wins").innerHTML = wins;

    // Reset Game
    startGame();
  }

  // Out of guesses
  else if (guesses === 0) {

    // Incorrect guesses
    losses++;

    // Game Over message
    alert("Derp! You lost!");

    // Populate loss
    document.getElementById("losses").innerHTML = losses;

    // Reset Gametart the game
    startGame();

  }

}

// Start Game
startGame();

// Keyboard Input
document.onkeyup = function(event) {

  // Recognize lowercase input only
  guessed = String.fromCharCode(event.keyCode).toLowerCase();

  // Check correct guesses
  checkLetters(guessed);

  // Game End
  roundComplete();
};
