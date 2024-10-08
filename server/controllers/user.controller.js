const User=require('../models/userModal')

const getAllUsers=async(req,res)=>{
  try{
    const users=await User.find()
    return res.status(200).json(users)
  }catch(err){
    res.status(500).json({ message: "Server error" });
  }
}

const UserProfile = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user by ID
    const user = await User.findById(id); // Corrected line

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data in response
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = {
  UserProfile,
  getAllUsers,
};