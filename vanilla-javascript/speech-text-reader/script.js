const main = document.querySelector("main");
const synth = window.speechSynthesis;
const toggle = document.querySelector("#toggle");
const textBox = document.querySelector("#text-box");
const close = document.querySelector("#close");
const voiceSelect = document.querySelector("#voices");
const text = document.querySelector("#text");
const read = document.querySelector("#read");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);
populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function createBox(item) {
  const boxItem = document.createElement("div");
  boxItem.classList.add("box");
  boxItem.innerHTML = `<img src="${item.image}" alt="${item.text}">
    <p class="info">${item.text}</p>`;
  main.appendChild(boxItem);
}

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voices").appendChild(option);
  }
}

function speak(text) {
  const voices = synth.getVoices();
  const utterThis = new SpeechSynthesisUtterance(text);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
}

toggle.addEventListener("click", () => textBox.classList.toggle("show"));
close.addEventListener("click", () => textBox.classList.toggle("show"));
document.addEventListener("click", (e) => {
  speak(e.target.alt);
});
read.addEventListener("click", () => speak(text.value));
