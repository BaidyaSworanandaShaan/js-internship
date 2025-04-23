import { deleteTodo, getTodoById, getTodos, postTodo } from "./api.js";
import { renderTodos } from "./dom.js";

const todoFormAdd = document.getElementById("todoFormAdd");
const btnAddEl = document.getElementById("btn-display");
const todoFormEl = document.querySelector(".todo-form");

export async function initApp() {
  await loadTodos();
  btnAddEl.addEventListener("click", () => {
    document.querySelector(".todo-form").style.display = "block";
  });
  todoFormAdd.addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("todoTitle").value.trim();
    const isCompleted = document.getElementById("todoOptions").value;
    const description = document.getElementById("todoDescription").value.trim();

    if (!title || !isCompleted || !description) {
      console.log("Please fill in all fields");
      return;
    }
    const newTodo = {
      title: title,
      description: description,
      isCompleted: isCompleted,
    };
    await postTodo(newTodo);
    todoFormAdd.reset();
    todoFormEl.style.display = "none";
    loadTodos();
  });
}

async function loadTodos() {
  try {
    const todos = await getTodos();

    renderTodos(todos, fetchAndLogTodo, handleDeleteTodo);
  } catch (err) {
    console.error(err.message);
  }
}
async function handleDeleteTodo(id) {
  if (confirm("Delete this todo?")) {
    await deleteTodo(id);
    loadTodos();
  }
}
async function fetchAndLogTodo(id) {
  const todo = await getTodoById(id);
  console.log("Fetched for update:", todo);
}
