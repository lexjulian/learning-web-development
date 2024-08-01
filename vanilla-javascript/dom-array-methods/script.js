const url = "https://randomuser.me/api/";
const main = document.querySelector("#main");
const addUserButton = document.querySelector("#add-user");
const double = document.querySelector("#double");
const millions = document.querySelector("#show-millionaires");
const sort = document.querySelector("#sort");
const calculate = document.querySelector("#calculate-wealth");

async function generateName() {
  const res = await fetch(url);
  const data = await res.json();
  const name = await data.results[0].name;
  return `${name.first} ${name.last}`;
}

let users = [];
addUser(3);

addUserButton.addEventListener("click", (e) => {
  addUser(1);
});

double.addEventListener("click", (e) => {
  const newWealth = users.map((user) => {
    return {
      ...user,
      wealth: user.wealth * 2,
    };
  });
  users = newWealth;
  renderNames(users);
});

millions.addEventListener("click", (e) => {
  const millionares = users.filter((user) => user.wealth > 1000000);
  users = millionares;
  renderNames(users);
});

sort.addEventListener("click", (e) => {
  const richest = users.sort((a, b) => b.wealth - a.wealth);
  users = richest;
  renderNames(users);
});

calculate.addEventListener("click", (e) => {
  const totalWealth = users
    .reduce((arr, user) => {
      arr.push(user.wealth);
      return arr;
    }, [])
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const total = document.createElement("div");
  total.innerHTML = `<h3>Total Wealth: <strong>${formatCurreny(
    totalWealth
  )}</strong></h3>`;
  main.appendChild(total);
});

function formatCurreny(amount) {
  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
}

async function addUser(number) {
  for (let i = 1; i <= number; i++) {
    let newUser = {
      name: await generateName(),
      wealth: Math.floor(Math.random() * 1000000),
    };
    users.push(newUser);
  }
  renderNames(users);
}

function renderNames(names) {
  main.innerHTML = "";
  names.forEach((user) => {
    const newUser = document.createElement("div");
    newUser.classList.add("person");
    newUser.innerHTML = `<strong>${user.name}</strong> ${formatCurreny(
      user.wealth
    )}`;
    main.appendChild(newUser);
  });
}
