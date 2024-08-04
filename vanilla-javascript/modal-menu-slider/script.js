const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
const modal = document.querySelector("#modal");

toggle.addEventListener("click", (e) => {
  body.classList.toggle("show-nav");
});

open.addEventListener("click", (e) => {
  modal.classList.toggle("show-modal");
});

close.addEventListener("click", (e) => {
  modal.classList.toggle("show-modal");
});
