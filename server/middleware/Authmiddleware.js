const jwt = require("jsonwebtoken");
require('dotenv').config()
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("auth middleware data",req)
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

const adminMiddleware=(req,res,next)=>{
  if (req.admin && req.admin.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as admin" });
  }
}

module.exports = {authMiddleware,adminMiddleware};
