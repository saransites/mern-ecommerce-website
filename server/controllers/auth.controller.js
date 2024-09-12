const users = require("../models/userModal");
const { hashedPassword, ComparePassword, createJWT } = require("../services/utilities.service");

const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try{
    // Check if the user already exists
  const userExists = await users.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const hashPassword = await hashedPassword(password);
  const newUser = new users({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });
  await newUser.save()
  res.status(201).json({ message: "User registered successfully" });
  }catch(err){
    console.error(err)
    res.status(500).json({ message: "Server error", err });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  try{
  const user = await users.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "user not found...please signup" });
  }
  const isMatch = await ComparePassword(password, user.password);
  if (!isMatch) {
    return res
      .status(404)
      .json({ message: "email and password does not match" });
  }
  const token = await createJWT(user);
  return res.status(200).json({ token, user });
  }catch(err){
    console.error(err)
    res.status(500).json({ message: "Server error", err });
  }
};

module.exports = {
  signup,
  login
};
