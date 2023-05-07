
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");


// Register a new user and generate a JWT token
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
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

    res.json({ token ,id: user.id });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
