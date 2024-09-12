const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createJWT = (data) => {
  return jwt.sign({ data: data }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 20,
  });
};
const hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const ComparePassword = async (password, secret) => {
  try {
    const isMatch = await bcrypt.compare(password, secret);
    return isMatch;
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  hashedPassword,
  ComparePassword,
  createJWT,
};
