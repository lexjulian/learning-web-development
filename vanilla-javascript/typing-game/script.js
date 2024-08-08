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
let time = 10;
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
  const random = words[Math.floor(Math.random() * words.length)];
  word.innerText = random;
  randomWord = random;
}

function addScore() {
  score++;
  scoreEl.innerText = score;
}

function setTime() {
  const timer = setInterval(() => {
    if (time <= 0) {
      clearInterval(timer);
      timeOut();
    }
    timeEl.innerHTML = `${time}s`;
    time--;
  }, 1000);
}

function timeOut() {
  endGame.innerHTML = `<h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>`;
  endGame.style.display = "flex";
}

text.addEventListener("input", () => {
  if (text.value === randomWord) {
    addScore();
    populateWord();
    text.value = "";
    if (setDifficulty === "easy") {
      time += 5;
    } else if (setDifficulty === "medium") {
      time += 3;
    } else {
      time += 1;
    }
  }
});

settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));
difficulty.addEventListener("change", () => (setDifficulty = difficulty.value));

populateWord();
setTime();
