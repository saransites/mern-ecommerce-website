const Order = require("../../models/ordersModal");
const User = require("../../models/userModal");

//fetching dashbaord data
const dashboardData = async (req, res) => {
  try {
    // Get total sales
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    // Get total orders
    const totalOrders = await Order.countDocuments();

    // Get total users
    const totalUsers = await User.countDocuments();

    // Get sales data grouped by date for the line chart
    const salesOverTime = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by date
          total: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date in ascending order
    ]);

    // Calculate average order value (AOV)
    const avgOrderValue = totalOrders
      ? (totalSales[0]?.total || 0) / totalOrders
      : 0;

    // Get top products by sales (optional)
    const topProducts = await Order.aggregate([
      { $unwind: "$items" }, // Unwind items array to count each product
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        },
      },
      { $sort: { totalSold: -1 } }, // Sort by total sold
      { $limit: 5 }, // Get top 5 products
      {
        $lookup: {
          // Populate product details
          from: "cart",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
    ]);

    res.json({
      totalSales: totalSales[0]?.total || 0,
      totalOrders,
      totalUsers,
      avgOrderValue,
      salesOverTime: salesOverTime.map((sale) => ({
        date: sale._id,
        total: sale.total,
      })),
      topProducts: topProducts.map((p) => ({
        productId: p._id,
        productName: p.productDetails[0]?.name || "Unknown",
        totalSold: p.totalSold,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//fetching products data
const addProducts = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
//fetching products data
const OrdersData = async (req, res) => {
  try {
    // Assuming you have an Order model defined
    const orders = await Order.find(); // Fetch all orders from the database

    // If you want to aggregate data, for example, total sales:
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    res.status(200).json({
      orders,
      totalSales: totalSales.length > 0 ? totalSales[0].total : 0,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
};
const analyticsData = async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.countDocuments();

    // Get total orders
    const totalOrders = await Order.countDocuments();

    // Get total revenue
    const totalRevenueData = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue =
      totalRevenueData.length > 0 ? totalRevenueData[0].totalRevenue : 0;

    // Monthly user growth (assuming createdAt is available in User schema)
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: "$_id.month" },
              "-",
              { $toString: "$_id.year" },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    // Monthly order stats (assuming createdAt is available in Order schema)
    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: "$_id.month" },
              "-",
              { $toString: "$_id.year" },
            ],
          },
          count: 1,
          _id: 0,
        },
      },
    ]).sort({ "_id.year": 1, "_id.month": 1 });

    res.json({
      totalUsers,
      totalOrders,
      totalRevenue,
      userGrowth,
      orderStats,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch analytics data", error: err.message });
  }
};

module.exports = { dashboardData, addProducts, OrdersData, analyticsData };
