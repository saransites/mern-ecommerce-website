const {dashboardData,OrdersData,addProducts} = require("../../controllers/Admin/data.controller");

const adminDataRouter = require("express").Router();

adminDataRouter.get("/dashboard", dashboardData);
adminDataRouter.post("/products", addProducts);
adminDataRouter.get("/orders", OrdersData);
module.exports = adminDataRouter;
