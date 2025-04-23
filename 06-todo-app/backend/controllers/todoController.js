const Todo = require("../models/Todos");
const { validateTodo } = require("../validations/todoValidation");

const createTodo = (req, res) => {
  const { title, description, isCompleted } = req.body;
  console.log(title, description, isCompleted);
  const error = validateTodo(title, description, isCompleted);
  if (error) return res.status(400).json({ message: error });
  Todo.createTodo(title, description, isCompleted, (err, result) => {
    if (err) {
      console.error("Error inserting user", err);
      return res.status(400).json({ message: "Failed To Create Todo " });
    }
    res.status(201).json({
      message: "Todo Created Succesfully",
      todo: {
        id: result.insertId,
        title: title,
        description: description,
        is_completed: isCompleted,
      },
    });
  });
};

const getTodos = (req, res) => {
  Todo.getTodos((err, results) => {
    if (err) {
      console.error("Error fetching data");
      return res.status(400).json({ message: "Failed To Fetch Todo List " });
    }
    res.status(201).json({
      message: "Todo Fetched Succesfully",
      results,
    });
  });
};

const getSingleTodo = (req, res) => {
  const todoId = req.params.id;
  Todo.getSingleTodo(todoId, (err, result) => {
    if (err) {
      console.error("Error fetching data");
      return res.status(400).json({ message: "Failed To Fetch Todo  " });
    }
    res.status(200).json({
      message: "Todo Fetched Succesfully",
      result,
    });
  });
};

const deleteTodo = (req, res) => {
  const todoId = req.params.id;

  Todo.deleteTodo(todoId, (err, result) => {
    if (err) {
      console.error("Error Deleting Todo");
      return res.status(404).json({ message: "Error Deleting Todo" });
    }
    if (result.affectedRows === 0) {
      return res.status(401).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  });
};

const updateTodo = (req, res) => {
  const todoId = req.params.id;
  const { title, description, isCompleted } = req.body;
  const error = validateTodo(title, description, isCompleted);
  if (error) return res.status(400).json({ message: error });
  Todo.updateTodo(title, description, isCompleted, todoId, (err, result) => {
    if (err) {
      console.error("Error Updating Todo");
      return res.status(404).json({ message: "Error Updating Todo" });
    }
    if (result.affectedRows === 0) {
      return res.status(401).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo updated successfully" });
  });
};
module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  deleteTodo,
  updateTodo,
};
