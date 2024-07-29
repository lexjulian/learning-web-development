const IMAGE_URL_PLUS = "./assets//images/icon-plus.svg";
const IMAGE_URL_MINUS = "./assets//images/icon-minus.svg";

document.addEventListener("click", (e) => {
  if (e.target.matches(".h3") || e.target.matches(".img")) {
    const card = e.target.closest(".container-card");
    const cardAnswer = card.querySelector(".container-answer");
    const imgToggle = card.querySelector(".img");

    cardAnswer.classList.toggle("invisible");

    cardAnswer.classList.contains("invisible")
      ? (imgToggle.src = IMAGE_URL_PLUS)
      : (imgToggle.src = IMAGE_URL_MINUS);
  }
});
