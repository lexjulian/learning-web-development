const button = document.querySelector("#generate");
const quotes = document.querySelector(".quote");
const URL = "https://api.breakingbadquotes.xyz/v1/quotes";

async function generateQuote() {
  const response = await fetch(URL);
  if (response.status === 404) return;
  const data = await response.json();
  quotes.innerText = data[0].quote;
}

button.addEventListener("click", (e) => {
  generateQuote();
  setTimeout(() => {
    button.disabled = true;
    button.style.opacity = 0.5;
  }, 1);
  setTimeout(() => {
    button.disabled = false;
    button.style.opacity = 1;
  }, 2000);
});

generateQuote();
