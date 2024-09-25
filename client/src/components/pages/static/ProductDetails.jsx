import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Add, ArrowBackOutlined, Remove } from "@mui/icons-material";
import useCart from "../../hooks/useCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const product = locate.state;
  const { user } = useSelector((state) => state.data);
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const theme=useTheme()

  useEffect(() => {
    if (!product) return navigate("/");
  }, [product, navigate]);

  // Check if the product is already in the cart
  const isProductInCart = cart?.items?.some(
    (item) => item.title === product.title
  );
  return (
    <Container maxWidth="lg">
      <Box className="shadow-[0_0_10px_#424242] rounded-lg overflow-hidden m-6 p-4 relative">
        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <IconButton onClick={()=>window.history.back()} sx={{bgcolor:"#262626",'&:hover':{bgcolor:"#26262699"}}}>
              <ArrowBackOutlined sx={{ color: "#fff",cursor:"pointer" }} />
            </IconButton>
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              sx={{
                aspectRatio: 6 / 3,
                objectFit: "contain",
                mixBlendMode: "multiply",
              }}
            />
          </Grid>
  
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 1, boxShadow: 2,bgcolor:"#DAE3E5" }}>
              <CardContent>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ mb: 2, fontSize: "clamp(1rem,1.104rem + 2.5vw,1.4rem)" }}
                  fontWeight={600}
                >
                  {product?.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                  ${product?.price}
                </Typography>
                <Typography
                  sx={{ mb: 2 }}
                  className="text-[clamp(0.8rem, 20vw, 1.5rem)]"
                >
                  {product?.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Category: {product?.category}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Rating: {product?.rating?.rate} ({product?.rating?.count}{" "}
                  reviews)
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {/* Conditionally render "Add to Cart" button if product is not in the cart */}
                  {!isProductInCart && user?.role === 'user' && (
                    <Button
                      onClick={() => {
                        if (!user) {
                          toast.warning("Please login and continue...");
                          return
                        }
                        setOpen(true);
                      }}
                      variant="contained"
                      color="primary"
                      sx={{ mr: 2,bgcolor:`${theme.palette.secondary.subHeading}`, "&:hover": { bgcolor: "#4A314D" }, }}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <Button
                    onClick={() =>
                      user && user?.role === 'user'
                        ? navigate(`/order/product`, { state: product })
                        : navigate("/login")
                    }
                    variant="outlined"
                    color="info"
                  >
                    Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      {user && <ProductModal open={open} setOpen={setOpen} product={product} />}
    </Container>
  );
};

export default ProductDetails;

const ProductModal = ({ open, setOpen, product }) => {
  const theme=useTheme()
  const [formData, setFormData] = useState({
    color: "",
    size: "",
    quantity: 1,
  });
  const { addCart } = useCart();
  const availableColors = ["Red", "Blue", "Green", "Black"];
  const availableSizes = ["S", "M", "L", "XL"];

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

  const handleAddCart = async () => {
    try {
      await addCart({
        ...formData,
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating,
        description: product.description,
        category: product.category,
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Paper sx={{ maxWidth: 400, p: 4, m: "auto", mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          Select Options
        </Typography>

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

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" sx={{bgcolor:`${theme.palette.secondary.subHeading}`, "&:hover": { bgcolor: "#4A314D" },}} onClick={handleAddCart}>
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};
