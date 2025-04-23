// const btnAddEl = document.getElementById("btn-display");
// const todoFormEl = document.querySelector(".todo-form");
// const todoFormAdd = document.getElementById("todoFormAdd");

// document.addEventListener("DOMContentLoaded", () => {
//   fetchTodos();
// });

// // Get
// async function fetchTodos() {
//   try {
//     const res = await fetch("http://localhost:3000/todos");
//     if (!res.ok) throw new Error(`Error: ${res.status}`);
//     const todos = await res.json();
//     console.log("Fetched Todos:", todos);
//     displayTodos(todos);
//     attachDeleteListeners();
//     attachUpdateListeners();
//   } catch (err) {
//     console.error("Error fetching todos:", err);
//   }
// }
// function formDisplay(e) {
//   todoFormEl.style.display = "block";
// }

// btnAddEl.addEventListener("click", formDisplay);

// // Post
// todoFormAdd.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const title = document.getElementById("todoTitle").value.trim();
//   const isCompleted = document.getElementById("todoOptions").value;
//   const description = document.getElementById("todoDescription").value.trim();

//   if (!title || !isCompleted || !description) {
//     console.log("Please fill in all fields");
//     return;
//   }
//   const newTodo = {
//     title: title,
//     description: description,
//     isCompleted: isCompleted,
//   };
//   await postTodo(newTodo);
// });

// async function postTodo(newTodo) {
//   console.log(newTodo);
//   try {
//     const res = await fetch("http://localhost:3000/todos", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newTodo),
//     });
//     console.log(res);
//     if (res.status === 201) {
//       const result = await res.json();
//       console.log("Todo added:", result);
//       fetchTodos();
//       todoFormAdd.reset();
//       todoFormEl.style.display = "none";
//     } else {
//       console.warn(" Failed to add todo. Status:", res.status);
//     }
//   } catch (err) {
//     console.error("Error adding todo:", err);
//   }
// }

// // Display
// function displayTodos(todos) {
//   console.log(todos);
//   const todosListContainer = document.querySelector(".todos-lists");
//   todosListContainer.innerHTML = "";

//   todos.results.reverse().forEach((todo) => {
//     const todoItem = document.createElement("div");
//     todoItem.classList.add("todo-item");
//     todoItem.innerHTML = `
//     <div class="flex">
//       <div>
//         <h2 class="todo-title">${todo.title}</h2>
//         <span class="todo-date">${todo.updated_at.split("T")[0]}</span>
//       </div>
//       <h2 class="todo-status">${todo.is_completed ? "✓" : "X"}</h2>
//     </div>
//     <p class="todo-description">${todo.description}</p>
//     <button class="btn btn-update"  data-id="${todo.id}">Update</button>
//     <button  class="btn btn-delete" data-id="${todo.id}">Delete</button>
//   `;

//     todosListContainer.appendChild(todoItem);
//   });
// }

// // Delete

// function attachDeleteListeners() {
//   document.querySelectorAll(".btn-delete").forEach((btn) => {
//     btn.addEventListener("click", async (e) => {
//       const id = e.target.dataset.id;
//       console.log(id);
//       if (confirm("Are you sure you want to delete this todo?")) {
//         await deleteTodo(id);
//       }
//     });
//   });
// }

// async function deleteTodo(id) {
//   const deleteTodoID = id;
//   try {
//     const res = await fetch(`http://localhost:3000/todos/${deleteTodoID}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     console.log(res);
//     if (res.status === 200) {
//       await res.json();
//       console.log("Todo deleted");
//       fetchTodos();
//     } else {
//       console.warn(" Failed to delete todo. Status:", res.status);
//     }
//   } catch (err) {
//     console.error("Error deleting todo:", err);
//   }
// }

// // Attach
// async function attachUpdateListeners() {
//   document.querySelectorAll(".btn-update").forEach((btn) => {
//     console.log("Update");
//     btn.addEventListener("click", async (e) => {
//       const id = e.target.dataset.id;
//       await fetchSingleTodo(id);
//     });
//   });
// }

// async function fetchSingleTodo(id) {
//   const singleTodoId = id;
//   try {
//     const res = await fetch(`http://localhost:3000/todos/${singleTodoId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (res.status === 200) {
//       const result = await res.json();
//       console.log(result);
//     } else {
//       console.warn(" Failed to fetch todo. Status:", res.status);
//     }
//   } catch (err) {}
// }
