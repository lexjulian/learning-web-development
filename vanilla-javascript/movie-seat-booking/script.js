const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movie = document.querySelector("#movie");
const seats = document.querySelectorAll(".seat");
const STORAGE_KEY = "MOVIE_SEAT_BOOKING";

let defaultCountNumber = 0;
let defaultCurrentPrice = 0;
let defaultMoviePrice = 0;
let defaultSeatsIndex = [];

let storedData = localStorage.getItem(STORAGE_KEY);
let data = storedData
  ? JSON.parse(storedData)
  : {
      countNumber: defaultCountNumber,
      currentPrice: defaultCurrentPrice,
      moviePrice: defaultMoviePrice,
      seatsIndex: defaultSeatsIndex,
    };

let countNumber = data.countNumber;
let currentPrice = data.currentPrice;
let moviePrice = data.moviePrice;
let seatsIndex = data.seatsIndex;

initialize();

document.addEventListener("click", (e) => {
  if (!e.target.matches(".seat")) return;

  const select = e.target;
  computeCount(select);
  saveSeats();
  saveData();
});

movie.addEventListener("change", (e) => {
  moviePrice = parseInt(movie.value);
  const newTotal = moviePrice * countNumber;
  total.innerText = newTotal;
  currentPrice = newTotal;
  saveData();
});

function computeCount(input) {
  const isSelected = input.classList.contains("selected");
  if (isSelected) {
    count.innerText = countNumber - 1;
    input.classList.remove("selected");
    countNumber--;
    currentPrice = currentPrice - moviePrice;
    total.innerText = currentPrice;
  } else {
    count.innerText = countNumber + 1;
    input.classList.add("selected");
    countNumber++;
    currentPrice = currentPrice + moviePrice;
    total.innerText = currentPrice;
  }
}

function saveSeats() {
  const tempSeat = [];
  seats.forEach((seat, index) => {
    if (seat.classList.contains("selected")) {
      tempSeat.push(index);
    }
  });
  return (seatsIndex = tempSeat);
}

function loadSeats() {
  seatsIndex.forEach((index) => {
    if (index >= 0 && index < seats.length) {
      seats[index].classList.add("selected");
    }
  });
}

function saveToStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function saveData() {
  let data = {
    countNumber: countNumber,
    currentPrice: currentPrice,
    moviePrice: moviePrice,
    seatsIndex: seatsIndex,
  };
  saveToStorage(data);
}

function initialize() {
  loadSeats();
  count.innerText = countNumber;
  total.innerText = currentPrice;
  movie.value = movie.value === 0 ? 10 : moviePrice;

  moviePrice = parseInt(movie.value);
}
