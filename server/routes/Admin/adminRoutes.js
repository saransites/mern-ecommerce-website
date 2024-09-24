const { LoginAdmin,RegisterAdmin } = require("../../controllers/Admin/auth.controller");
const adminDatarouter = require("./adminDataRouter");

const Adminrouter = require("express").Router();

Adminrouter.post("/login", LoginAdmin);
Adminrouter.post("/signup", RegisterAdmin);
Adminrouter.use('/api',adminDatarouter)

module.exports = Adminrouter;