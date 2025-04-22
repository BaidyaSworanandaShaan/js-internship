const express = require("express");

const db = require("./db/db");
const app = express();
const cors = require("cors");
const todoRoutes = require("../backend/routes/todoRoutes");
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);
// app.post("/todos", (req, res) => {
//   const { title, description, isCompleted } = req.body;
//   if (!title || !description || !isCompleted) {
//     return res
//       .status(400)
//       .json({ message: "Title, Description and Status is Required" });
//   }
//   const sql =
//     "Insert INTO todos (title,description,is_completed) VALUES (?,?,?)";

//   db.query(sql, [title, description, isCompleted], (err, result) => {
//     if (err) {
//       console.error("Error inserting user", err);
//       return res.status(400).json({ message: "Failed To Create Todo " });
//     }
//     res.status(201).json({
//       message: "Todo Created Succesfully",
//       todo: {
//         id: result.insertId,
//         title: title,
//         description: description,
//         is_completed: isCompleted,
//       },
//     });
//   });
// });

// // Get all todo
// app.get("/todos", (req, res) => {
//   const sql = "Select * from todos";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("Error fetching data");
//       return res.status(400).json({ message: "Failed To Fetch Todo List " });
//     }
//     res.status(201).json({
//       message: "Todo Fetched Succesfully",
//       results,
//     });
//   });
// });

// // Get one todo

// app.get("/todos/:id", (req, res) => {
//   const todoId = req.params.id;

//   const sql = "Select * from todos Where id = ?";
//   db.query(sql, [todoId], (err, result) => {
//     if (err) {
//       console.error("Error fetching data");
//       return res.status(400).json({ message: "Failed To Fetch Todo  " });
//     }
//     res.status(201).json({
//       message: "Todo Fetched Succesfully",
//       result,
//     });
//   });
// });

// app.delete("/todos/:id", (req, res) => {
//   const todoId = req.params.id;
//   const sql = "Delete FROM todos where id = ?";

//   db.query(sql, [todoId], (err, result) => {
//     if (err) {
//       console.error("Error Deleting Todo");
//       return res.status(404).json({ message: "Error Deleting Todo" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(401).json({ message: "Todo not found" });
//     }
//     res.status(200).json({ message: "Todo deleted successfully" });
//   });
// });

// app.put("/todos/:id", (req, res) => {
//   const todoId = req.params.id;
//   const { title, description, isCompleted } = req.body;
//   if (!title || !description || !isCompleted) {
//     return res
//       .status(400)
//       .json({ message: "Title, Description and Status is Required" });
//   }
//   const sql =
//     "Update todos Set title = ? , description= ?,is_completed = ? Where id = ? ";

//   db.query(sql, [todoId, description, isCompleted, todoId], (err, result) => {
//     if (err) {
//       console.error("Error Updating Todo");
//       return res.status(404).json({ message: "Error Updating Todo" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(401).json({ message: "Todo not found" });
//     }
//     res.status(200).json({ message: "Todo updated successfully" });
//   });
// });
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
