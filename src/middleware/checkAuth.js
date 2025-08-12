const jwt = require("jsonwebtoken");
const User = require("../models/user");

const checkAuth= async(req, res, next)=>{
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // remove "Bearer"

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECURITY);
      const user = await User.findOne({_id:decoded});
      req.user = user; // attach user to request
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Authorization header missing" });
  }
};

module.exports = checkAuth;