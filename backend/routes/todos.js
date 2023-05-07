const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

// @route    GET api/todos
// @desc     Get all to-do items for the logged in user
// @access   Private
router.get("/", authMiddleware, todoController.getAllTodos);

// @route    GET api/todos/:id
// @desc     Get a single to-do item by ID
// @access   Private
router.get("/:id", authMiddleware, todoController.getTodoById);

// @route    POST api/todos
// @desc     Create a new to-do item
// @access   Private
router.post(
    "/",
    [
        [
            check("title", "Title is required").not().isEmpty(),
            check("description", "Description is required").not().isEmpty(),
            check("user", "User id is required").not().isEmpty(),
        ]
    ],
    authMiddleware,
    todoController.createTodo
);

// @route    PUT api/todos/:id
// @desc     Update a to-do item by ID
// @access   Private
router.put(
    "/:id",
    [
        [
            check("title", "Title is required").not().isEmpty(),
            check("description", "Description is required").not().isEmpty()
        ]
    ],
    authMiddleware,
    todoController.updateTodo
);

// @route    DELETE api/todos/:id
// @desc     Delete a to-do item by ID
// @access   Private
router.delete("/:id", authMiddleware, todoController.deleteTodo);

module.exports = router;
