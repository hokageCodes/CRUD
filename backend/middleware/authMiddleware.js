const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const config = require('../config');

// Middleware function to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Split the Authorization header into "Bearer <token>"
    const [bearer, token] = authHeader.split(' ');

    if (!token || bearer !== 'Bearer') {
      return res.status(401).json({ error: 'Invalid Authorization header format' });
    }

    // Verify the token and get the user ID
    const decoded = await promisify(jwt.verify)(token, process.env.secretKey);
    const userId = decoded;

    // Set the user ID on the request object
    req.user = { id: userId.user.id };

    // Call the next middleware
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
