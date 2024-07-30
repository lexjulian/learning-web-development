const form = document.querySelector("#form");
const firstNameInput = document.querySelector("#fname");
const lastNameInput = document.querySelector("#lname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const firstNameErrorImage = firstNameInput.nextElementSibling;
const firstNameErrorMessage = firstNameErrorImage.nextElementSibling;
const lastNameErrorImage = lastNameInput.nextElementSibling;
const lastNameErrorMessage = lastNameErrorImage.nextElementSibling;
const emailErrorImage = emailInput.nextElementSibling;
const emailErrorMessage = emailErrorImage.nextElementSibling;
const passwordErrorImage = passwordInput.nextElementSibling;
const passwordErrorMessage = passwordErrorImage.nextElementSibling;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (firstNameInput.value === "") {
    removeInvisible(firstNameErrorImage, firstNameErrorMessage);
  } else {
    addInvisible(firstNameErrorImage, firstNameErrorMessage);
  }

  if (lastNameInput.value === "") {
    removeInvisible(lastNameErrorImage, lastNameErrorMessage);
  } else {
    addInvisible(lastNameErrorImage, lastNameErrorMessage);
  }

  if (emailInput.value === "") {
    removeInvisible(emailErrorImage, emailErrorMessage);
  } else {
    validateEmail(emailInput.value);
    addInvisible(emailErrorImage, emailErrorMessage);
  }

  if (passwordInput.value === "") {
    removeInvisible(passwordErrorImage, passwordErrorMessage);
  } else {
    addInvisible(passwordErrorImage, passwordErrorMessage);
  }
});

function removeInvisible(errorImage, errorMessage) {
  errorImage.classList.remove("invisible");
  errorMessage.classList.remove("invisible");
}

function addInvisible(errorImage, errorMessage) {
  errorImage.classList.add("invisible");
  errorMessage.classList.add("invisible");
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
