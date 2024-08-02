const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");
const formControl = Array.from(document.querySelectorAll(".form-control"));

let inputs = [username, email, password, password2];
let errors = [
  "Username must be at least 3 characters",
  "Email is not valid",
  "Password must be at least 6 characters",
  "Password2 is required",
  "Passwords do not match",
];

document.addEventListener("click", (e) => {
  if (!e.target.matches("button")) return;
  e.preventDefault();

  formControl.forEach((form) => {
    form.classList.remove("error");
    form.classList.add("success");
  });

  if (username.value === "" || username.value.length < 3) {
    setError(0, 0);
  }
  if (email.value === "" || !validateEmail(email.value)) {
    setError(1, 1);
  }
  if (password.value === "" || password.value.length < 6) {
    setError(2, 2);
  }
  if (password2.value === "") {
    setError(3, 3);
  }
  if (password2.value !== password.value) {
    setError(3, 4);
  }
});

function setError(num, num2) {
  const addError = formControl[num];
  addError.classList.add("error");
  const errorMessage = inputs[num].nextElementSibling;
  errorMessage.innerText = errors[num2];
  formControl[num].appendChild(errorMessage);
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
