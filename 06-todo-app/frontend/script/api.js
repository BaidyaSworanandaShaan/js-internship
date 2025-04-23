const BASE_URL = "http://localhost:3000/todos";

export async function getTodos() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`Error: ${res.status}`);
  return res.json();
}
export async function postTodo(newTodo) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!res.ok) throw new Error("Failed to post todo");
  return res.json();
}
export async function deleteTodo(id) {
  const deleteTodoID = id;

  const res = await fetch(`${BASE_URL}/${deleteTodoID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return res.json();
}
export async function getTodoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch single todo");
  return res.json();
}
