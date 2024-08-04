const toggle = document.querySelector("#toggle");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
const modal = document.querySelector("#modal");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

open.addEventListener("click", () => modal.classList.add("show-modal"));
close.addEventListener("click", () => modal.classList.remove("show-modal"));

window.addEventListener("click", (e) => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
});
