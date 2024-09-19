import React, { useCallback, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { ConfirmDeleteModal } from "../../hooks/DeleteModal";

const CartItem = ({ product, onQuantityChange, onRemoveItem, onNavigate }) => {
  return (
    <Grid item xs={12} key={product._id}>
      <Card sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ width: 100, height: 100, objectFit: "contain" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <h6 onClick={onNavigate} className="cursor-pointer text-[#526728]">
            {product.title}
          </h6>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            ${product.price.toFixed(2)} x {product.quantity}
          </Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => onQuantityChange(product, -1)}>
              <Remove />
            </IconButton>
            <TextField
              size="small"
              value={product.quantity}
              sx={{ width: 50, mx: 1, textAlign: "center" }}
              inputProps={{ readOnly: true }}
            />
            <IconButton onClick={() => onQuantityChange(product, 1)}>
              <Add />
            </IconButton>
          </Box>
        </CardContent>
        <IconButton onClick={() => onRemoveItem(product._id)}>
          <Delete color="error" />
        </IconButton>
      </Card>
    </Grid>
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, isLoading, error, updateQuantity, removeItem } = useCart();

  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Handle opening the Confirm Delete Modal
  const handleOpenDeleteModal = (id) => {
    setSelectedProductId(id);
    setOpen(true);
  };

  // Handle closing the Confirm Delete Modal
  const handleCloseDeleteModal = () => {
    setOpen(false);
    setSelectedProductId(null);
  };

  // Handle quantity change
  const handleQuantityChange = (product, amount) => {
    updateQuantity({
      id: product._id,
      quantity: Math.max(1, product.quantity + amount),
    });
  };

  // Handle removing an item from the cart
  const handleConfirmDelete = () => {
    removeItem(selectedProductId);
    handleCloseDeleteModal();
  };

  // Navigate to product details
  const handleProductDetails = (product) => {
    navigate(`/product-details`, { state: product });
  };

  // Loading and error states
  if (isLoading) {
    return (
      <Container
        maxWidth="md"
        sx={{ my: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error">
          Failed to load cart items. Please try again later.
        </Typography>
      </Container>
    );
  }

  if (!cart?.items?.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="text.secondary">
          Cart is empty...please add a product.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4, background: "hsl(219,29%,62%)" }}>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Shopping Cart Items
        </Typography>
        <Grid container spacing={3}>
          {cart?.items?.map((product) => (
            <CartItem
              key={product._id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleOpenDeleteModal}
              onNavigate={() => handleProductDetails(product)}
            />
          ))}
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Total: ${cart?.totalAmount?.toFixed(2)}
          </Typography>
        </Box>
      </Paper>

      <ConfirmDeleteModal
        open={open}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default CartPage;
