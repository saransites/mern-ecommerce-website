import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Star,
  StarHalf,
  StarBorder,
  AddShoppingCart,
  ShoppingBagOutlined,
  CancelOutlined,
  Search,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchProducts } from "../../global/slice";
import FilterProducts from "./FilterProducts";
import { Debouncing } from "../../utills/Debouncing";
import { useTheme } from "@mui/material/styles";

// Star Rating Component
const SelectRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <Star key={`full-${index}`} style={{ color: "#FFD700" }} />
        ))}
      {halfStar && <StarHalf style={{ color: "#FFD700" }} />}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <StarBorder key={`empty-${index}`} style={{ color: "#FFD700" }} />
        ))}
    </Box>
  );
};

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  console.log(theme.spacing(2));
  const { addCart, cart } = useCart();
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch state data from the Redux store
  const {
    user,
    products = [],
    category: categories = [],
    loadingProducts,
    loadingCategories,
    productsError,
    categoriesError,
  } = useSelector((state) => state?.data);

  // Fetch products and categories if they are not already fetched
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, products.length, categories.length]);

  // Navigate to product details page
  const handleProductDetails = (product) => {
    navigate(`/product-details`, { state: product });
  };

  // Add a product to the cart
  const handleAddToCart = async (product) => {
    await addCart(product);
  };

  // Handle input change for search
  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  // Debounced search function
  const debouncing = useCallback(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(inputVal.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [products, inputVal]);

  // Apply debouncing with a delay
  useEffect(() => {
    const debouncedFunction = Debouncing(debouncing, 1000);
    debouncedFunction();
  }, [debouncing]);

  // Check if a product is already in the cart
  const isProductInCart = (title) =>
    cart?.items?.some((item) => item.title === title);

  // Filter out the "All" category
  const filteredCategories = categories.filter(
    (category) => category !== "All"
  );

  // Handle changes in product filters
  const handleFilterChange = useCallback(
    ({ categories, rating, priceRange }) => {
      let updatedProducts = products;

      if (categories.length) {
        updatedProducts = updatedProducts.filter((product) =>
          categories.includes(product.category)
        );
      }

      if (rating > 0) {
        updatedProducts = updatedProducts.filter(
          (product) => product.rating?.rate >= rating
        );
      }

      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      setFilteredProducts(updatedProducts);
    },
    [products]
  );

  // Render loading state
  if (loadingProducts || loadingCategories) {
    return (
      <Box display="flex" justifyContent="center" m={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Render error state
  if (productsError || categoriesError) {
    return <div>Error loading data: Please Try Again...</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {/* Categories Navigation */}
        <Grid item xs={4} md={2}>
          <FilterProducts
            categories={filteredCategories}
            onFilterChange={handleFilterChange}
          />
        </Grid>

        {/* Product Grid */}
        <Grid item xs={8} md={10}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                placeholder="Search Products"
                onChange={handleChange}
                value={inputVal}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start" size="small">
                        <Search />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {inputVal && (
                        <IconButton
                          onClick={() => setInputVal("")}
                          edge="end"
                          size="small"
                          aria-label="clear input"
                        >
                          <CancelOutlined />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                  classes: {
                    notchedOutline: "ring-[#656565]", // Custom styling, if needed
                  },
                  sx: {
                    paddingRight: 0, // Adjusts padding to better fit the icon
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#656565",
                    },
                  },
                  fontFamily: "inherit",
                  transition: "duration-500",
                  background: "transparent",
                  borderRadius: "4px",
                  "& input": {
                    padding: 1, // Removes extra padding from input
                  },
                }}
              />
            </Grid>
            {inputVal && (
              <Grid item xs={12}>
                <h2 className="my-3">
                  Showing Results for :{" "}
                  <span className="font-bold">{inputVal} </span>
                </h2>
              </Grid>
            )}
            {filteredProducts?.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    position: "relative",
                    borderRadius: 2,
                    borderBottomRightRadius: 40,
                    boxShadow: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 1,
                    backgroundColor: "rgba(0,0,0,0.15)",
                    mb: 1,
                    aspectRatio: 5 / 6,
                  }}
                  className="group"
                >
                  <CardMedia
                    onClick={() => handleProductDetails(product)}
                    component="img"
                    image={product.image || "/default-image.jpg"}
                    alt={product.title}
                    sx={{
                      width: "100%",
                      height: 150,
                      objectFit: "contain",
                      cursor: "pointer",
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      filter: "brightness(90%) contrast(130%)",
                    }}
                    className="group-hover:-translate-y-2 transition-transform duration-500 mix-blend-multiply"
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexGrow: 1,
                      padding: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontSize={14}
                      fontWeight={700}
                      component="div"
                      sx={{ mb: 1 }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      ${product.price}
                    </Typography>
                    <SelectRating rating={product.rating?.rate || 0} />
                    <Box sx={{ marginTop: "auto", width: "100%" }}></Box>
                    <div className="round flex items-center justify-center">
                      <div
                        className="iconBox overflow-hidden bg-[#472a7cfd] hover:bg-[#472a7cd3] cursor-pointer relative group"
                        onClick={() => {
                          user
                            ? navigate(`/order/product`, { state: product })
                            : navigate("/login");
                        }}
                      >
                        <div className="group-hover:-translate-y-14 transition-transform duration-500">
                          <ShoppingBagOutlined sx={{ color: "#fff" }} />
                        </div>
                        <span className="absolute p-2 rounded-full px-4 left-1/2 transform -translate-x-1/2 translate-y-12 group-hover:translate-y-0 text-[1rem] text-[#fff] mt-0.5 transition-transform duration-500">
                          Buy
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  {!isProductInCart(product.title) && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        m: 1,
                      }}
                    >
                      <Tooltip title="Add to Cart">
                        <IconButton
                          onClick={() => handleAddToCart(product)}
                          color="primary"
                          sx={{
                            background: "#e5e5e5",
                            color: "#262626",
                            transition: "0.5s",
                            "&:hover": { background: "rgba(0,0,0,0.2)" },
                          }}
                        >
                          <AddShoppingCart />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Products;
