function validateTodo(title, description, isCompleted) {
  if (!title || !description || !isCompleted) {
    return "Title, Description and Status are required";
  }
  return null;
}
module.exports = {
  validateTodo,
};
