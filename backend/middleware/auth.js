// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ✅ Ensure we are using the actual MongoDB user ID (not a string like "admin")
    req.user = decoded.user; // should be { id: ObjectId }
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};
