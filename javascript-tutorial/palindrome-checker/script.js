const input = document.querySelector("#input");
const button = document.querySelector(".btn");
const palindrome = document.querySelector(".palindrome");
const notPalindrome = document.querySelector(".not-palindrome");

button.addEventListener("click", (e) => {
  if (input.value === "") return;
  let rev = input.value.split("").reverse().join("");

  if (rev === input.value) {
    palindrome.classList.remove("hide");
    notPalindrome.classList.add("hide");
  } else {
    notPalindrome.classList.remove("hide");
    palindrome.classList.add("hide");
  }
});
