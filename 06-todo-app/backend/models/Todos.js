const db = require("../db/db");

const createTodo = (title, description, isCompleted, callback) => {
  const sql =
    "Insert INTO todos (title,description,is_completed) VALUES (?,?,?)";

  db.query(sql, [title, description, isCompleted], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const getTodos = (callback) => {
  const sql = "Select * from todos";

  db.query(sql, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getSingleTodo = (todoId, callback) => {
  const sql = "Select * from todos Where id = ?";
  db.query(sql, [todoId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const deleteTodo = (todoId, callback) => {
  const sql = "Delete FROM todos where id = ?";

  db.query(sql, [todoId], (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const updateTodo = (title, description, isCompleted, todoId, callback) => {
  const sql = `
    UPDATE todos 
    SET title = ?, description = ?, is_completed = ? 
    WHERE id = ?
  `;

  db.query(sql, [title, description, isCompleted, todoId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};

module.exports = {
  createTodo,
  getTodos,
  getSingleTodo,
  deleteTodo,
  updateTodo,
};
