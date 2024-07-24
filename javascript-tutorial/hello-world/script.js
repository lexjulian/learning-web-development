const btn = document.querySelector("[data-btn]");
const input = document.querySelector("[data-input-text]");
const form = document.querySelector("[data-form]");
const link = document.querySelector("a");

link.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked link");
});

form.addEventListener("submit", (e) => {
  e.preventDefault;
  console.log("Submitted form");
});
