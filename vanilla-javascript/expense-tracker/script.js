const form = document.querySelector("#form");
const balance = document.querySelector("#balance");
const amount = document.querySelector("#amount");
const text = document.querySelector("#text");
const income = document.querySelector("#money-plus");
const expense = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const STORAGE_KEY = "EXPENSE_TRACKER-list";

let totalBalance = loadStorage();
totalBalance.forEach(addToList);

list.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-btn")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  totalBalance = totalBalance.filter((t) => t.id !== todoId);

  updateBalance();
  saveToStorage();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (text.value === "" || amount.value === "") {
    alert("Please enter a text and amount.");
    return;
  }

  const newBalance = {
    id: new Date().valueOf().toString(),
    name: text.value,
    amount: parseInt(amount.value),
  };

  totalBalance.push(newBalance);
  computeBalance(totalBalance);
  updateBalance();

  addToList(newBalance);
  saveToStorage();
  amount.value = "";
  text.value = "";
});

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("en-US", {
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

function incomeBalance(totalBalance) {
  const income = totalBalance
    .reduce((arr, balance) => {
      arr.push(balance.amount);
      return arr;
    }, [])
    .filter((balance) => balance > 0);
  const incomeTotal = income.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return incomeTotal;
}

function expenseBalance(totalBalance) {
  const expense = totalBalance
    .reduce((arr, balance) => {
      arr.push(balance.amount);
      return arr;
    }, [])
    .filter((balance) => balance < 0);
  const expenseTotal = expense.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return expenseTotal;
}

function addToList(balance) {
  updateBalance();
  const newList = document.createElement("li");
  newList.className = balance.amount < 0 ? "minus" : "plus";
  newList.classList.add("list-item");
  newList.dataset.todoId = balance.id;
  newList.innerHTML = `${balance.name}<span>${balance.amount}</span><button class="delete-btn">x</button>`;

  list.appendChild(newList);
}

function updateBalance() {
  balance.innerText = formatCurrency(computeBalance(totalBalance));
  income.innerText = formatCurrency(incomeBalance(totalBalance));
  expense.innerText = formatCurrency(expenseBalance(totalBalance));
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(totalBalance));
}

function loadStorage() {
  const toString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(toString) || [];
}
