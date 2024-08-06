const word = document.querySelector("#word");
const notification = document.querySelector("#notification-container");
const wrongLettersEl = document.querySelector("#wrong-letters");
const figure = Array.from(document.querySelectorAll(".figure-part"));
const popup = document.querySelector("#popup-container");
const finalMessage = document.querySelector("#final-message");
const play = document.querySelector("#play-button");

const data = [
  "programming",
  "database",
  "html",
  "javascript",
  "function",
  "selector",
];
let selectedData = data[Math.floor(Math.random() * data.length)];
let selectedDataSplit = selectedData.split("");
let correctLetters = [];
let wrongLetters = [];
let allLetters = [];
let letterArray = [];
let wordLetters = [];
let isPlaying = true;

function populateUI() {
  const num = selectedData.length - 1;
  for (let i = 0; i <= num; i++) {
    const newLetter = document.createElement("span");
    newLetter.classList.add("letter");
    word.appendChild(newLetter);
    letterArray.push(newLetter);
  }
}

function isCorrect(e) {
  if (selectedData.includes(e)) {
    correctLetters.push(e);
    const indices = [];
    for (let i = 0; i < selectedData.length; i++) {
      if (selectedData[i] === e) {
        indices.push(i);
      }
    }
    indices.forEach((index) => {
      letterArray[index].innerHTML = e;
    });
    combineCorrectLetters();
  } else {
    wrongLetters.push(e);
    showWrongLetters(wrongLetters);
    figure[wrongLetters.length - 1].classList.remove("figure-part");
    if (wrongLetters.length > 5) {
      popup.style.display = "flex";
      finalMessage.innerHTML = "Unfortunately you lost. 😕";
      isPlaying = false;
    }
  }
}

function combineCorrectLetters() {
  const newWord = document.querySelectorAll(".letter");
  let newWordArray = [...newWord].map((element) => element.innerHTML).join("");
  console.log(newWordArray);
  if (newWordArray === selectedData) {
    popup.style.display = "flex";
    finalMessage.innerHTML = "Congratulations! You won! 😃";
    isPlaying = false;
  }
}

function showWrongLetters(letters) {
  wrongLettersEl.innerHTML = `<p>Wrong</p><span>${wrongLetters}</span`;
}

function resetGame() {
  selectedData = data[Math.floor(Math.random() * data.length)];
  correctLetters = [];
  wrongLetters = [];
  allLetters = [];
  letterArray = [];
  figure.forEach((el) => {
    el.classList.add("figure-part");
  });
  word.innerHTML = "";
  wrongLettersEl.innerHTML = "";
  popup.style.display = "none";
  populateUI();
  isPlaying = true;
}

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase().length <= 1 && isPlaying) {
    if (allLetters.includes(e.key.toLowerCase())) {
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
      }, 2000);
    } else {
      const letter = e.key.toLowerCase();
      allLetters.push(letter);
      isCorrect(letter);
    }
  }
});

play.addEventListener("click", () => {
  resetGame();
});

populateUI();
