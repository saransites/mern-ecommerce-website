import React, { useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  IconButton,
  useTheme
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBack, Payment } from "@mui/icons-material";

const CheckoutPage = () => {
  const theme=useTheme()
  const location = useLocation();
  const product = location.state; // Access the product data passed via state

  const navigate = useNavigate();
  useEffect(()=>{
    if(!product)return navigate('/')
  },[product,navigate])
  return (
    <Container sx={{my:4}}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <IconButton onClick={()=>window.history.back()} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" className="rounded p-2 tracking-wide" sx={{ mb: 2, fontWeight: "bold",bgcolor:`${theme?.palette?.secondary?.subHeading}`,color:`${theme.palette.primary.light}` }}>
          Checkout
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ height: 300, objectFit: "contain" }}
              />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              <Typography variant="h6" color="primary">
                ${product.price}
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body1">
                  Color: <strong>{product.color}</strong>
                </Typography>
                <Typography variant="body1">
                  Size: <strong>{product.size}</strong>
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography variant="body1">
                  Quantity: <strong>{product.quantity}</strong>
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Payment/>}
                fullWidth
                sx={{ py: 1.5,bgcolor:`${theme.palette.secondary.main}`,color:"#f7f5f2",'&:hover':{bgcolor:"#4A314D"} }}
                onClick={()=>navigate('/payment/product',{state:product})}
              >
                Proceed to Payment
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CheckoutPage;
