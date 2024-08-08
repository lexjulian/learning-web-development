const word = document.querySelector("#word");
const text = document.querySelector("#text");
const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const endGame = document.querySelector("#end-game-container");
const settingsBtn = document.querySelector("#settings-btn");
const settings = document.querySelector("#settings");
const difficulty = document.querySelector("#difficulty");

let randomWord = "";
let score = 0;
let sec = 10;
let setDifficulty = "easy";

const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

function populateWord() {
  let random = words[Math.floor(Math.random() * words.length)];
  word.innerText = random;
  randomWord = random;
}

function addScore() {
  score++;
  scoreEl.innerText = score;
}

function time() {
  const timer = setInterval(() => {
    if (sec <= 0) {
      clearInterval(timer);
      timeOut();
    }
    timeEl.innerHTML = `${sec}s`;
    sec -= 1;
  }, 1000);
}

function timeOut() {
  endGame.style.display = "flex";
  endGame.innerHTML = `<h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
}

text.addEventListener("input", () => {
  if (text.value === randomWord) {
    text.value = "";
    addScore();
    populateWord();
    if (setDifficulty === "easy") {
      sec += 5;
    } else if (setDifficulty === "medium") {
      sec += 3;
    } else {
      sec += 1;
    }
  }
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
difficulty.addEventListener("change", () => {
  setDifficulty = difficulty.value;
});

populateWord();
time();
