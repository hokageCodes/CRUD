
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

// Authenticate a user and generate a JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password)
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Create a JWT token
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, config.secretKey, { expiresIn: 3600 });

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
