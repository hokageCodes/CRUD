// controllers/userController.js

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
        return res.status(400).json({ error: "User already exists" });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Create a JWT token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, config.secretKey, { expiresIn: 3600 });

        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error");
    }
};
