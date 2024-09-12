import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { CheckCircle, LocalShipping, CreditCard, ShoppingCart } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Chip } from '@mui/material';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state || {}; // Safely get order data from location state

  // Calculate delivery date (10 days from today)
  const calculateDeliveryDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 10);
    return today.toLocaleDateString(); // Adjust format as needed
  };

  // Navigate to the home page
  const handleBackToHome = () => {
    navigate("/");
  };

  // Render Shipping Information
  const renderShippingInfo = () => (
    <Box sx={{ textAlign: "left", mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center' }}>
        <LocalShipping sx={{ mr: 1 }} /> Shipping Information
      </Typography>
      <Typography variant="body1">{order.address || "N/A"}</Typography>
      <Typography variant="body1">
        {order.city || "N/A"}, {order.state || "N/A"} - {order.zipCode || "N/A"}
      </Typography>
      <Typography variant="body1">Phone: {order.phone || "N/A"}</Typography>
      <Typography variant="body1">Email: {order.email || "N/A"}</Typography>
    </Box>
  );

  // Render Payment Method
  const renderPaymentMethod = () => (
    <Box sx={{ textAlign: "left", mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center' }}>
        <CreditCard sx={{ mr: 1 }} /> Payment Method
      </Typography>
      <Chip variant="soft" color="primary" label={order.paymentMethod || "N/A"} />
    </Box>
  );

  // Render Ordered Item
  const renderOrderedItem = () => (
    <Box sx={{ textAlign: "left", mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", display: 'flex', alignItems: 'center' }}>
        <ShoppingCart sx={{ mr: 1 }} /> Items Ordered
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={order.image} alt={order.title} style={{ width: 100, height: 'auto', marginRight: 16 }} />
        <Box>
          <Typography variant="body1">{order.title}</Typography>
          <Typography variant="body2">Color: {order.color}</Typography>
          <Typography variant="body2">Size: {order.size}</Typography>
          <Typography variant="body2">Quantity: {order.quantity}</Typography>
          <Typography variant="body2">Price: ${order.price.toFixed(2)}</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign:"center" }}>
        <CheckCircle sx={{ fontSize: 60, color: "green" }} />
        <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
          Order Confirmed!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Thank you for your purchase. Your order has been placed successfully.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {renderShippingInfo()}
        {renderPaymentMethod()}
        {renderOrderedItem()}
        <Box sx={{ mt: 2,textAlign:"start" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            <LocalShipping sx={{ mr: 1 }} /> Estimated Delivery Date
          </Typography>
          <Typography variant="body1">{calculateDeliveryDate()}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBackToHome}
          sx={{ mt: 3, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default OrderConfirmationPage;
