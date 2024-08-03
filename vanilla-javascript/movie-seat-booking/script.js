const container = document.querySelector(".container");
const movie = document.querySelector("#movie");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.querySelector("#count");
const total = document.querySelector("#total");

let ticketPrice = +movie.value;
populateUi();

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

movie.addEventListener("click", (e) => {
  ticketPrice = +e.target.value;
  setMovieIndex(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeatIndex", JSON.stringify(seatIndex));

  let numberOfSeats = selectedSeats.length;

  count.innerHTML = numberOfSeats;
  total.innerHTML = numberOfSeats * ticketPrice;
}

function setMovieIndex(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUi() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatIndex"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movie.selectedIndex = selectedMovieIndex;
  }
}

updateSelectedCount();
