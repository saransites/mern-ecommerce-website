import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../global/slice";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "Avatar",
    width: 90,
    renderCell: (params) => (
      <Avatar
        src={params.value}
        sx={{ width: 50, height: 50,objectFit:"contain" }}
        alt="product image"
      />
    ),
  },
  { field: "name", headerName: "Product Name", width: 150 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "stock", headerName: "Stock", width: 110 },
  { field: "rating", headerName: "Rating", width: 110 },
];

const AdminProducts = () => {
  const { products, loading, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
  }

  if (error) {
    return <Typography>Error loading products</Typography>;
  }

  // Prepare rows based on fetched products
  const rows =
    products?.map((product) => ({
      id: product.id,
      image: product?.image,  // Correctly mapping the image field
      name: product?.title,
      price: `$${product?.price}`,
      stock: product?.rating?.count,
      rating: product?.rating?.rate,
    })) || [];

  return (
    <Box sx={{ height: '100%', width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
};

export default AdminProducts;
