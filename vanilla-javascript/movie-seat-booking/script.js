const container = document.querySelector(".container");
const count = document.querySelector("#count");
const total = document.querySelector("#total");
const movie = document.querySelector("#movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

populateUI();
let ticketPrice = +movie.value;

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

movie.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovie(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("seatIndex", JSON.stringify(seatIndex));

  let selectedCount = selectedSeats.length;

  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

function setMovie(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const movieIndex = localStorage.getItem("selectedMovieIndex");
  if (movieIndex !== null) {
    movie.selectedIndex = movieIndex;
  }
}

updateSelectedCount();
