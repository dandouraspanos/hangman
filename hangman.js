
let POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate",
    "obsequious", "dissonant", "toady", "imdempotent"];

let MAX_GUESSES = 6;
let guesses = "";
let word = "";
let guessCount = MAX_GUESSES;
let gameOver = true;

function newGame() {
    guesses = "";
    guessCount = MAX_GUESSES;
    gameOver = false;

    let randomIndex = parseInt(Math.random() * POSSIBLE_WORDS.length);
    word = POSSIBLE_WORDS[randomIndex];

    document.getElementById("guess").disabled = false;
    document.getElementById("guessButton").disabled = false;
    document.getElementById("guess").value = "";

    updateScreen();
}

function guess() {
    let input = document.getElementById("guess");
    let letter = input.value.toLowerCase().trim();

    input.value = "";

    if (word === "" || gameOver) {
        return;
    }

    if (!/^[a-z]$/.test(letter)) {
        return;
    }

    if (guesses.indexOf(letter) >= 0) {
        document.getElementById("guesses").textContent =
            "You already guessed that letter! Guessed Letters: " + guesses;
        return;
    }

    if (word.indexOf(letter) < 0) {
        guessCount--;
    }

    guesses += letter;
    updateScreen();
}

function updateScreen() {
    let clueString = "";
    let correctLetters = 0;

    for (let i = 0; i < word.length; i++) {
        let letter = word.charAt(i);

        if (guesses.indexOf(letter) >= 0) {
            clueString += letter + " ";
            correctLetters++;
        } else {
            clueString += "_ ";
        }
    }

    let clue = document.getElementById("clue");
    clue.textContent = clueString;

    let guessArea = document.getElementById("guesses");
    guessArea.textContent = "Guessed Letters: " + guesses.split("").join(", ");
    let image = document.getElementById("hangmanpic");
    image.src = "images/hangman" + guessCount + ".gif";

    if (correctLetters === word.length) {
        gameOver = true;
        guessArea.textContent = "You Win! The word was: " + word;
    }

    else if (guessCount === 0) {
        gameOver = true;
        guessArea.textContent = "You Lose! The word was: " + word;
    }

    if (gameOver) {
        document.getElementById("guess").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }
}


document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        guess();
    }
});
