const show = document.querySelector("#show");
const addContainer = document.querySelector("#add-container");
const hide = document.querySelector("#hide");
const addCard = document.querySelector("#add-card");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const cardsContainer = document.querySelector("#cards-container");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const current = document.querySelector("#current");
const clear = document.querySelector("#clear");
const STORAGE_KEY = "MEMORY_CARDS";

let newCardArray = loadStorage();
let currentIndex = 0;
let num = 0;
newCardArray.forEach(generateCard);
if (newCardArray.length > 0) {
  generateCard(newCardArray[0]);
  num = 1;
  current.innerText = `${num}/${newCardArray.length}`;
}

show.addEventListener("click", (e) => {
  toggleShow();
});

hide.addEventListener("click", (e) => {
  toggleShow();
});

addCard.addEventListener("click", (e) => {
  if (question.value === "" && answer.value === "") return;

  const newCard = {
    question: question.value,
    answer: answer.value,
  };

  newCardArray.push(newCard);
  generateCard(newCard);
  if (newCardArray.length > 0) {
    generateCard(newCardArray[0]);
  }
  toggleShow();
  saveToStorage();
  num = 1;
  currentIndex = 0;
  current.innerText = `${num}/${newCardArray.length}`;
  question.value = "";
  answer.value = "";
});

next.addEventListener("click", (e) => {
  if (currentIndex < newCardArray.length - 1) {
    currentIndex = (currentIndex + 1) % newCardArray.length;
    generateCard(newCardArray[currentIndex]);
    current.innerText = `${num + 1}/${newCardArray.length}`;
    num++;
  } else {
    return;
  }
});

prev.addEventListener("click", (e) => {
  if (currentIndex > 0) {
    currentIndex = (currentIndex - 1) % newCardArray.length;
    generateCard(newCardArray[currentIndex]);
    current.innerText = `${num - 1}/${newCardArray.length}`;
    num--;
  } else {
    return;
  }
});

clear.addEventListener("click", (e) => {
  newCardArray = [];
  cardsContainer.innerHTML = "";
  current.innerText = ``;
  saveToStorage();
});

function toggleShow() {
  addContainer.classList.toggle("show");
}

function generateCard(arr) {
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.classList.add("active");
  newCard.innerHTML = `<div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${arr.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${arr.answer}
            </p>
          </div>
        </div>`;
  cardsContainer.appendChild(newCard);

  newCard.addEventListener("click", (e) => {
    newCard.classList.toggle("show-answer");
  });
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCardArray));
}

function loadStorage() {
  const toString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(toString) || [];
}
