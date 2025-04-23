export function renderTodos(todos, onUpdate, onDelete) {
  const todosListContainer = document.querySelector(".todos-lists");
  todosListContainer.innerHTML = "";

  todos.results.reverse().forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
      <div class="flex">
        <div>
          <h2 class="todo-title">${todo.title}</h2>
          <span class="todo-date">${todo.updated_at.split("T")[0]}</span>
        </div>
        <h2 class="todo-status">${todo.is_completed ? "✓" : "X"}</h2>
      </div>
      <p class="todo-description">${todo.description}</p>
      <button class="btn btn-update"  data-id="${todo.id}">Update</button>
      <button  class="btn btn-delete" data-id="${todo.id}">Delete</button>
    `;

    todosListContainer.appendChild(todoItem);
    todoItem
      .querySelector(".btn-update")
      .addEventListener("click", () => onUpdate(todo.id));
    todoItem
      .querySelector(".btn-delete")
      .addEventListener("click", () => onDelete(todo.id));
  });
}
