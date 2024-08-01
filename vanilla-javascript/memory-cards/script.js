const show = document.querySelector("#show");
const addContainer = document.querySelector("#add-container");
const cardsContainer = document.querySelector("#cards-container");
const addCard = document.querySelector("#add-card");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const current = document.querySelector("#current");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const clear = document.querySelector("#clear");
const STORAGE_KEY = "MEMORYGAME-cards";

let arrCards = loadStorage();
arrCards.forEach(generateCard);
let num = 0;
if (arrCards.length > 0) {
  generateCard(arrCards[0]);
  num = 1;
  current.innerText = `${num}/${arrCards.length}`;
}

let currentIndex = 0;

show.addEventListener("click", (e) => {
  addContainer.classList.toggle("show");
});

addCard.addEventListener("click", (e) => {
  if (question.value === "" && answer.value === "") {
    return;
  }
  const newArr = {
    question: question.value,
    answer: answer.value,
    id: new Date().valueOf().toString(),
  };

  arrCards.push(newArr);

  generateCard(newArr);
  saveToStorage();

  addContainer.classList.toggle("show");
  if (arrCards.length > 0) {
    generateCard(arrCards[0]);
  }
  question.value = "";
  answer.value = "";
  currentIndex = 0;
  num = 1;
  current.innerText = `${currentIndex + 1}/${arrCards.length}`;
});

next.addEventListener("click", (e) => {
  if (currentIndex < arrCards.length - 1) {
    cardsContainer.innerHTML = "";

    currentIndex = (currentIndex + 1) % arrCards.length;
    generateCard(arrCards[currentIndex]);

    current.innerText = `${num + 1}/${arrCards.length}`;
    num++;
  } else return;
});

prev.addEventListener("click", (e) => {
  if (currentIndex > 0) {
    cardsContainer.innerHTML = "";
    currentIndex = (currentIndex - 1) % arrCards.length;
    generateCard(arrCards[currentIndex]);
    current.innerText = `${num - 1}/${arrCards.length}`;
    num--;
  } else return;
});

clear.addEventListener("click", (e) => {
  arrCards = [];
  cardsContainer.innerHTML = "";
  current.innerText = "";
  saveToStorage();
});

function generateCard(arr) {
  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.classList.add("active");
  newCard.dataset.itemId = arr.id;
  newCard.innerHTML = `<div class="inner-card">
          <div class="inner-card-front ">
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
  newCard.addEventListener("click", () => {
    newCard.classList.toggle("show-answer");
  });

  cardsContainer.appendChild(newCard);
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arrCards));
}

function loadStorage() {
  const toString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(toString) || [];
}
