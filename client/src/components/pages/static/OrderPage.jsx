import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  TextField,
  Button,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  useTheme,
} from "@mui/material";
import { ArrowBack, Add, Remove, CheckOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const availableColors = ["Red", "Blue", "Green", "Black"];
const availableSizes = ["S", "M", "L", "XL"];

const OrderPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const locate = useLocation();
  const selectedProduct = locate.state;
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    zipCode: "",
    quantity: 1,
  });
  useEffect(()=>{
    if(!selectedProduct)return navigate('/')
  },[selectedProduct,navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleQuantityChange = (amount) => {
    setFormData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/checkout/product`, {
      state: { ...selectedProduct, ...formData },
    });
  };

  return (
    <Container sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <IconButton onClick={() => window.history.back()} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography
          variant="h5"
          className="rounded p-2 tracking-wide"
          sx={{
            mb: 2,
            fontWeight: "bold",
            bgcolor: `${theme?.palette?.secondary?.subHeading}`,
            color: `${theme.palette.primary.light}`,
          }}
        >
          Order Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card sx={{ display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                image={selectedProduct?.image}
                alt={selectedProduct?.title}
                sx={{ height: 200, objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight={700}>
                  {selectedProduct?.title}
                </Typography>
                <Typography variant="h6" color="primary">
                  ${selectedProduct?.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Shipping Details
              </Typography>
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                fullWidth
                margin="normal"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="city"
                name="city"
                type="text"
                fullWidth
                margin="normal"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="state"
                name="state"
                type="text"
                fullWidth
                margin="normal"
                value={formData.state}
                onChange={handleInputChange}
                required
              />
              <TextField
                label="zipCode"
                name="zipCode"
                type="text"
                fullWidth
                margin="normal"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />

              {/* Product Options */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Color</InputLabel>
                <Select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                >
                  {availableColors.map((color) => (
                    <MenuItem key={color} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel>Size</InputLabel>
                <Select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                >
                  {availableSizes.map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box display="flex" alignItems="center" marginTop={2}>
                <Typography variant="subtitle1" sx={{ mr: 2 }}>
                  Quantity:
                </Typography>
                <IconButton onClick={() => handleQuantityChange(-1)}>
                  <Remove />
                </IconButton>
                <Typography variant="body1">{formData.quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange(1)}>
                  <Add />
                </IconButton>
              </Box>

              <Divider sx={{ my: 2 }} />
              <Button
                type="submit"
                variant="contained"
                startIcon={<CheckOutlined />}
                fullWidth
                sx={{
                  py: 1.5,
                  bgcolor: `${theme.palette.secondary.main}`,
                  color: "#f7f5f4",
                  "&:hover": { bgcolor: "#4A314D" },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default OrderPage;
