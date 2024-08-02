const url = "https://randomuser.me/api/";
const main = document.querySelector("#main");
const addUserButton = document.querySelector("#add-user");
const double = document.querySelector("#double");
const million = document.querySelector("#show-millionaires");
const sort = document.querySelector("#sort");
const calculate = document.querySelector("#calculate-wealth");

let userArray = [];

addUserButton.addEventListener("click", (e) => {
  addUser(1);
});

double.addEventListener("click", (e) => {
  const doubleAmount = userArray.map((user) => {
    return {
      ...user,
      wealth: user.wealth * 2,
    };
  });
  userArray = doubleAmount;
  loadNames(userArray);
});

million.addEventListener("click", (e) => {
  const millions = userArray.filter((user) => user.wealth > 1000000);
  userArray = millions;
  loadNames(userArray);
});

sort.addEventListener("click", (e) => {
  const richest = userArray.sort((a, b) => b.wealth - a.wealth);
  userArray = richest;
  loadNames(userArray);
});

calculate.addEventListener("click", (e) => {
  const total = userArray
    .reduce((arr, balance) => {
      arr.push(balance.wealth);
      return arr;
    }, [])
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const totalHTML = document.createElement("div");
  totalHTML.innerHTML = `<h3>Total Wealth: <strong>${formatCurrency(
    total
  )}</strong></h3>`;
  main.appendChild(totalHTML);
});

async function generateName() {
  const res = await fetch(url);
  const data = await res.json();
  const name = data.results[0].name;
  return `${name.first} ${name.last}`;
}

async function addUser(number) {
  for (let i = 1; i <= number; i++) {
    let newUser = {
      name: await generateName(),
      wealth: Math.floor(Math.random() * 1000000),
    };
    userArray.push(newUser);
  }
  loadNames(userArray);
}

function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(amount);
}

function loadNames(users) {
  main.innerHTML = "";
  users.forEach((user) => {
    const newName = document.createElement("div");
    newName.classList.add("person");
    newName.innerHTML = `<strong>${user.name}</strong> ${formatCurrency(
      user.wealth
    )}`;
    main.appendChild(newName);
  });
}

addUser(3);
