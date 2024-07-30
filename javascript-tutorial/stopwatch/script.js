const secondsTwo = document.querySelector("#seconds-two");
const secondsOne = document.querySelector("#seconds-one");
const minuteTwo = document.querySelector("#minute-two");
const minuteOne = document.querySelector("#minute-one");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const reset = document.querySelector("#reset");
const list = document.querySelector(".list");
const template = document.querySelector("#template");

let myInterval;
let minute = [];
let seconds = [];

start.addEventListener("click", (e) => {
  myInterval = setInterval(() => {
    secondsTwo.innerText = parseInt(secondsTwo.innerText) + 1;
    if (parseInt(secondsTwo.innerText) > 9) {
      secondsTwo.innerText = 0;
      secondsOne.innerText = parseInt(secondsOne.innerText) + 1;
      if (secondsOne.innerText > 5) {
        secondsOne.innerText = 0;
        minuteTwo.innerText = parseInt(minuteTwo.innerText) + 1;
        if (minuteTwo.innerText > 9) {
          minuteTwo.innerText = 0;
          minuteOne.innerText = parseInt(minuteOne.innerText) + 1;
        }
      }
    }
  }, 1000);
  hideButton();
});

pause.addEventListener("click", (e) => {
  clearInterval(myInterval);
  hideButton();
});

reset.addEventListener("click", (e) => {
  test();
  clearTimer();
  hideButton();
});

stop.addEventListener("click", (e) => {
  test();
  const templateClone = template.content.cloneNode(true);
  textElement = templateClone.querySelector(".item");
  textElement.innerText = saveTime();

  list.appendChild(templateClone);

  minute = [];
  seconds = [];
  clearTimer();
  hideButton();
});

function hideButton() {
  pause.classList.toggle("hide");
  start.classList.toggle("hide");
}

function clearTimer() {
  secondsTwo.innerText = 0;
  secondsOne.innerText = 0;
  minuteTwo.innerText = 0;
  minuteOne.innerTExt = 0;
  clearInterval(myInterval);
}

function saveTime() {
  minute.push(minuteOne.innerText, minuteTwo.innerText);
  seconds.push(secondsOne.innerText, secondsTwo.innerText);

  const m = minute.join("");
  const s = seconds.join("");
  return `${m}:${s}`;
}

function test() {
  if (
    parseInt(secondsTwo.innerText) === 0 &&
    parsenInt(secondsOne.innerText) === 0 &&
    parseInt(minuteTwo.innerText) === 0 &&
    parseInt(minuteOne.innerText) === 0
  )
    return;
}
