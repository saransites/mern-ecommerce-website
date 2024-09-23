const express = require("express");
const app = express();
const cors = require("cors");
const Authrouter = require("./routes/authRoutes");
const cartRouter = require("./routes/cartRoutes");
const Adminrouter = require("./routes/Admin/adminRoutes");
require("dotenv").config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "HEAD", "PUT", "DELETE", "POST"],
    credentials: true,
  })
);
app.use(express.json());
require('./model/db')()
app.use('/auth',Authrouter)
app.use('/cart',cartRouter)
app.use('/admin',Adminrouter)
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server is started in ${PORT}`);
});