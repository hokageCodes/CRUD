require('dotenv').config({});
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


// app.js
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
// console.log(process.env);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

