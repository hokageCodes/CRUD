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
    .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

