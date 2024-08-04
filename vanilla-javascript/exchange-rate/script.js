const currencyOneEl = document.querySelector("#currency-one");
const currencyTwoEl = document.querySelector("#currency-two");
const rateEl = document.querySelector("#rate");
const amountOneEl = document.querySelector("#amount-one");
const amountTwoEl = document.querySelector("#amount-two");
const swap = document.querySelector("#swap");

function calculate() {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountTwoEl.value = (amountOneEl.value * rate).toFixed(2);
    });
}

swap.addEventListener("click", (e) => {
  const temp = currencyOneEl.value;
  currencyOneEl.value = currencyTwoEl.value;
  currencyTwoEl.value = temp;
  calculate();
});

currencyOneEl.addEventListener("change", calculate);
currencyTwoEl.addEventListener("change", calculate);
amountOneEl.addEventListener("input", calculate);
amountTwoEl.addEventListener("input", calculate);

calculate();
