const form = document.querySelector("#new-item-form");
const list = document.querySelector("#list");
const input = document.querySelector("#item-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = document.createElement("div");
  item.innerText = input.value;
  item.classList.add("list-item");

  list.appendChild(item);

  input.value = "";

  item.addEventListener("click", () => {
    list.removeChild(item);
  });
});
