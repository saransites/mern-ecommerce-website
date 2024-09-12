import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Container,
  useTheme,
} from "@mui/material";
import { ArrowForwardOutlined } from "@mui/icons-material";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { UseApi } from "../global/slice";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

// API endpoints
const api = UseApi();
const PRODUCTS_API = "https://fakestoreapi.com/products";
const CATEGORIES_API = "https://fakestoreapi.com/products/categories";

// Fetch categories and products
const fetchCategories = async () => {
  const res = await api.get(CATEGORIES_API);
  if (!res || !res.data) {
    console.error("Failed to fetch categories.");
    return [];
  }
  return res.data;
};

const fetchProducts = async () => {
  const res = await api.get(PRODUCTS_API);
  if (!res || !res.data) {
    console.error("Failed to fetch products.");
    return [];
  }
  return res.data;
};

// Carousel settings
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

const Dashboard = () => {
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (loadingCategories || loadingProducts)
    return (
      <Box
        height="100dvh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={24} />
      </Box>
    );

  // Organize products by category
  const productsByCategory = categories.reduce((acc, category) => {
    acc[category] = products.filter((product) => product.category === category);
    return acc;
  }, {});

  return (
    <main>
      <Container maxWidth="lg">
        {/* Image Carousel */}
        <Box mb={4}>
          <Slider {...carouselSettings}>
            <img src={banner1} alt="banner1" />
            <img src={banner2} alt="banner2" />
            <img src={banner3} alt="banner3" />
            <img src={banner4} alt="banner4" />
          </Slider>
        </Box>

        {/* Categories with Products */}
        <Box>
          {categories.map((category) => (
            <Box key={category} mb={6}>
              <Category
                title={category}
                products={productsByCategory[category] || []}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </main>
  );
};

export default Dashboard;

const Category = ({ title, products }) => {
  const navigate = useNavigate();
  const theme=useTheme()
  // Display only the first 5 products
  const visibleProducts = products.slice(0, 4);

  const handleProductDetails = (product) => {
    navigate(`/product-details`, { state: product });
  };
  return (
    <Box>
      <h3 style={{backgroundColor:`${theme?.palette?.secondary?.subHeading}`}} className="p-2 text-[#f9f5f2] rounded tracking-wide capitalize font-semibold text-[clamp(1rem,2dvw,1.4rem)]">
        {title}
      </h3>
      <Box
        display="flex"
        gap={2}
        overflow="auto"
        sx={{
          transition: "all 0.3s ease",
          "&:hover::-webkit-scrollbar": { height: "10px" },
          "&::-webkit-scrollbar": { height: "0px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "rgba(0,0,0,0.1)" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 3,
          },
        }}
      >
        {visibleProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              maxWidth: 200,
              height: 250,
              m: 1,
              flexShrink: 0,
              backgroundColor: "rgba(0,0,0,0.2)",
              color: "#272727",
            }}
            className="group"
          >
            <CardMedia
              component="img"
              image={product.image}
              alt={product.title}
              onClick={() => handleProductDetails(product)}
              sx={{
                aspectRatio: 2,
                objectFit: "contain",
                p: 1,
                mixBlendMode: "multiply",
                cursor: "pointer",
              }}
              className="group-hover:-translate-y-2 transition duration-500"
            />
            <CardContent>
              <Typography
                variant="body1"
                fontWeight={700}
                fontSize={14}
                sx={{ lineClamp: 2 }}
              >
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ${product.price.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <IconButton sx={{ "&:hover": { bgcolor: "transparent" } }}>
          <ArrowForwardOutlined
            onClick={() => navigate("/products")}
            sx={{ border: "1px solid", borderRadius: 8, p: 1, fontSize: 45 }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
