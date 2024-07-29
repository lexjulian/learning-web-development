const form = document.querySelector("#form");
const thankyou = document.querySelector(".container-thankyou");
const ratingContainer = document.querySelector(".container");
const ratingNumber = document.querySelector(".rating");
let rating = 0;

document.addEventListener("click", (e) => {
  if (!e.target.matches(".btn")) return;
  rating = e.target.innerText;
});

form.addEventListener("click", (e) => {
  e.preventDefault();
  if (rating === 0) return;

  thankyou.classList.toggle("invisible");
  ratingContainer.classList.toggle("invisible");
  console.log(rating);
  ratingNumber.innerText = rating;
});
