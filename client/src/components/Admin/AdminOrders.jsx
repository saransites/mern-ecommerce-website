import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { UseApi } from "../global/slice";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AdminOrders = () => {
  const api = UseApi();
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchingData = async () => {
    const { data } = await api.get("/admin/api/orders");
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchOrders"],
    queryFn: fetchingData,
  });

  const rows =
    (data &&
      data.orders?.map((item, i) => ({
        id: i + 1,
        customer: item.shippingAddress.name,
        customerId: item.userId, // Store userId in the row
        date: item.orderDate?.slice(0, 10),
        total: `$${item.totalAmount}`,
      }))) ||
    [];

  // Function to handle customer click and navigate to the user profile
  const handleCustomerClick = (customerId) => {
    navigate(`/${customerId}`); // Adjust the path as necessary
  };

  const columns = [
    { field: "id", headerName: "Order ID", width: 90 },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      renderCell: (params) => (
        <span
          className="text-sky-500 cursor-pointer"
          onClick={() => handleCustomerClick(params.row.customerId)} // Use customerId for navigation
        >
          {params.value}
        </span>
      ),
    },
    { field: "date", headerName: "Order Date", width: 150 },
    { field: "total", headerName: "Total Amount", width: 110 },
  ];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading orders...</div>;
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
};

export default AdminOrders;
