// controllers/todoController.js

const Todo = require("../models/Todo");

// Get all to-do items for a user
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({error: "Server error"});
    }
};

// Get a single to-do item by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            user: req.body.id
        });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(todo);
    } catch (err) {
        console.log(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(500).send("Server error");
    }
};

// Create a new to-do item
exports.createTodo = async (req, res) => {
  try {
        const { title, description, user } = req.body;
    
        // Create a new to-do item
        const todo = new Todo({
            title,
            description,
            user: req.user.id
        });

        // Save the to-do item to the database
        await todo.save();

        res.json(todo);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};

// Update a to-do item by ID
exports.updateTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        // Find the to-do item by ID and user ID
        let todo = await Todo.findOne({
            _id: req.params.id,
            user: req.user.id
        });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        // Update the to-do item
        todo.title = title;
        todo.description = description;

        // Save the updated to-do item to the database
        await todo.save();

        res.json(todo);
    } catch (err) {
        console.log(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(500).send("Server error");
    }
};

// Delete a to-do item by ID
exports.deleteTodo = async (req, res) => {
    try {
        // Find the to-do item by ID and user ID
        const todo = await Todo.findOneAndRemove({
            _id: req.params.id,
            user: req.user.id
        });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ msg: "Todo deleted" });
    } catch (err) {
        console.log(err.message);
        if (err.kind === "ObjectId") {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(500).send("Server error");
    }
};
