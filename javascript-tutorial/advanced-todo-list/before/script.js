const form = document.querySelector("#new-todo-form");
const todoInput = document.querySelector("#todo-input");
const template = document.querySelector("#list-item-template");
const list = document.querySelector("#list");
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST";
const STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;

let todos = loadTodos();
todos.forEach(renderTodos);

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;

  saveTodos();
});

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove();
  todos = todos.filter((t) => t.id !== todoId);
  saveTodos();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoInput.value === "") return;
  const newTodo = {
    name: todoInput.value,
    complete: false,
    id: new Date().valueOf().toString(),
  };

  todos.push(newTodo);
  renderTodos(newTodo);
  saveTodos();

  todoInput.value = "";
});

function renderTodos(todo) {
  const templateClone = template.content.cloneNode(true);

  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todo.name;

  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;

  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.complete;

  list.appendChild(templateClone);
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const todoString = localStorage.getItem(STORAGE_KEY);
  return JSON.parse(todoString) || [];
}
