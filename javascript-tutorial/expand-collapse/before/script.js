document.addEventListener("click", (e) => {
  if (!e.target.matches(".expand-button")) return;

  const card = e.target.closest(".card");
  const cardBody = card.querySelector(".card-body");
  const buttonText = card.querySelector(".expand-button");

  cardBody.classList.toggle("show");
  e.target.innerText = e.target.innerText === "Expand" ? "Collapse" : "Expand";
});
