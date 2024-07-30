const add = document.querySelector("#add");
const input = document.querySelector("#input");
const list = document.querySelector(".list");
const template = document.querySelector("#template");
const STORAGE_KEY = "TODOLIST";

let todos = loadItem();
todos.forEach(addItem);

list.addEventListener("click", (e) => {
  if (!e.target.matches(".delete")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todos = todos.filter((t) => t.id !== todoId);
  saveItem();
  if (todos.length === 0) {
    list.classList.add("hide");
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.matches("#add") || input.value === "") return;

  const newTodo = {
    name: input.value,
    id: new Date().valueOf().toString(),
  };

  addItem(newTodo);
  todos.push(newTodo);
  saveItem();

  input.value = "";
});

function addItem(todo) {
  const templateClone = template.content.cloneNode(true);
  const textElement = templateClone.querySelector(".list-item-text");
  textElement.innerText = todo.name;

  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;

  list.appendChild(templateClone);
  list.classList.remove("hide");
}

function saveItem() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadItem() {
  const todoString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(todoString) || [];
}
