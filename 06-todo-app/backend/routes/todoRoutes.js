const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/", todoController.createTodo);

router.get("/", todoController.getTodos);
router.get("/:id", todoController.getSingleTodo);

router.delete("/:id", todoController.deleteTodo);
router.put("/:id", todoController.updateTodo);
module.exports = router;
