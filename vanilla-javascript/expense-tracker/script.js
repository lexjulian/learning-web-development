const form = document.querySelector("#form");
const amount = document.querySelector("#amount");
const text = document.querySelector("#text");
const balance = document.querySelector("#balance");
const income = document.querySelector("#money-plus");
const expense = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const STORAGE_KEY = "EXPENSE_TRACKER-list";

let totalBalance = loadStorage();
totalBalance.forEach(addListItem);
updateBalance(totalBalance);

list.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-btn")) return;

  const parent = e.target.closest(".list-item");
  const listId = parent.dataset.listId;
  parent.remove();
  totalBalance = totalBalance.filter((t) => t.id !== listId);
  updateBalance(totalBalance);
  saveToStorage();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (text.value === "" || amount.value === "") {
    alert("Please enter text and amount");
    return;
  }

  const newBalance = {
    name: text.value,
    amount: parseInt(amount.value),
    id: new Date().valueOf().toString(),
  };

  totalBalance.push(newBalance);
  computeBalance(totalBalance);
  computeIncome(totalBalance);
  computeExpense(totalBalance);

  updateBalance(totalBalance);
  addListItem(newBalance);
  saveToStorage(totalBalance);
  text.value = "";
  amount.value = "";
});

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
}

function computeBalance(totalBalance) {
  const sum = totalBalance
    .reduce((arr, balance) => {
      arr.push(balance.amount);
      return arr;
    }, [])
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return sum;
}

function computeIncome(totalBalance) {
  const income = totalBalance
    .reduce((arr, balance) => {
      arr.push(balance.amount);
      return arr;
    }, [])
    .filter((balance) => balance > 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return income;
}

function computeExpense(totalBalance) {
  const expense = totalBalance
    .reduce((arr, balance) => {
      arr.push(balance.amount);
      return arr;
    }, [])
    .filter((balance) => balance < 0)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return expense;
}

function updateBalance(totalBalance) {
  balance.innerText = formatCurrency(computeBalance(totalBalance));
  income.innerText = formatCurrency(computeIncome(totalBalance));
  expense.innerText = formatCurrency(computeExpense(totalBalance));
}

function addListItem(totalBalance) {
  const newItem = document.createElement("li");
  newItem.className = totalBalance.amount > 0 ? "plus" : "minus";
  newItem.classList.add("list-item");
  newItem.dataset.listId = totalBalance.id;
  newItem.innerHTML = `${totalBalance.name}<span>${totalBalance.amount}</span><button class="delete-btn">x</button>`;

  list.appendChild(newItem);
}

function saveToStorage(totalBalance) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(totalBalance));
}

function loadStorage() {
  const toString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(toString) || [];
}
