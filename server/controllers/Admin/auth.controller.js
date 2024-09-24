const Admin = require("../../models/admin");
const {
  ComparePassword,
  hashedPassword,
  createJWT,
} = require("../../services/utilities.service");
// Admin Login
const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await ComparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token=createJWT(admin)

    delete admin.password

    // If password matches, return success response (you can generate a token here)
    return res.status(200).json({ token,user:admin });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register Admin
const RegisterAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const hashPassword = await hashedPassword(password);

    // Create a new admin with hashed password
    const role = "admin";
    await Admin.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "Account Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  RegisterAdmin,
  LoginAdmin,
};
