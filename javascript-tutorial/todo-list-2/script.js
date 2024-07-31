const input = document.querySelector("#input");
const list = document.querySelector(".list");
const template = document.querySelector("#template");

const STORAGE_KEY = "TODOLIST-todos";

let todos = loadTodos();
todos.forEach(renderTodos);

list.addEventListener("click", (e) => {
  if (!e.target.matches(".delete")) return;
  if (todos.length === 0) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todos = todos.filter((t) => t.id !== todoId);
  saveTodos();
});

document.addEventListener("click", (e) => {
  if (!e.target.matches("#add") || input.value === "") return;

  const newTodo = {
    name: input.value,
    id: new Date().valueOf().toString(),
  };

  todos.push(newTodo);
  renderTodos(newTodo);
  saveTodos();

  input.value = "";
});

function renderTodos(todo) {
  const templateClone = template.content.cloneNode(true);

  const textElement = templateClone.querySelector(".list-item-text");
  textElement.innerText = todo.name;

  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;

  list.appendChild(templateClone);
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  list.classList.remove("hide");
  const toString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(toString) || [];
}
