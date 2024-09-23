const { LoginAdmin,RegisterAdmin } = require("../../controllers/Admin/admin.controller");

const Adminrouter = require("express").Router();

Adminrouter.post("/login", LoginAdmin);
Adminrouter.post("/signup", RegisterAdmin);

module.exports = Adminrouter;
