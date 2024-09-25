const {dashboardData,OrdersData,addProducts, analyticsData} = require("../../controllers/Admin/data.controller");

const adminDataRouter = require("express").Router();

adminDataRouter.get("/dashboard", dashboardData);
adminDataRouter.post("/products", addProducts);
adminDataRouter.get("/orders", OrdersData);
adminDataRouter.get("/analytics", analyticsData);
module.exports = adminDataRouter;
