import { useTheme } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagOutlined, Star } from "@mui/icons-material";
import girl from "../../assets/surprised-happy-girl-pointing-left-recommend-product-advertisement.png";

const HomePage = () => {
  const theme = useTheme();
  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      rating: 4.2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 3,
      name: "Laptop",
      price: 999.99,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: 4,
      name: "Smartphone",
      price: 699.99,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-200">
        <main className="m-4 px-4 p-4">
          <div className="sm:text-center lg:text-left">
            <h1 className="animation text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline text-green-400">
                Discover Amazing
              </span>{" "}
              <span className="block xl:inline product">Products</span>
            </h1>
            <p className="animation mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-lg sm:mx-auto md:mt-5 md:text-md lg:mx-0">
              Explore our wide range of high-quality products at unbeatable
              prices. Start shopping now and elevate your lifestyle!
            </p>
            <div className="animation mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <Link
                to="/products"
                className="px-10 py-2 md:py-4 block text-center text-gray-100 rounded-full
               hover:shadow-[0_0_15px_rgba(0,0,0,0.6)] hover:bg-opacity-80 
               active:scale-95 transition-all duration-300 ease-in-out
               backdrop-blur-xl shadow-[1px_1px_10px_rgba(24,32,23,0.9)] 
               bg-gradient-to-r from-green-400 font-semibold to-green-600"
              >
               <ShoppingBagOutlined  className="mr-1 w-5 h-5 text-black"/>
                Shop Now
              </Link>
            </div>
          </div>
        </main>
        <div className="imgAnimate lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="max-w-full h-auto object-cover"
            src={girl}
            alt="girl"
          />
        </div>
      </div>

      {/* Category Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 animate-slideUp`}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationTimeline: "view(block 50% 20%)",
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-[#262626] bg-opacity-60 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 grid place-content-center animate-slideUp"
          style={{
            animationTimeline: "view()",
          }}
        >
          <Link
            to="/products"
            className="ring-2 ring-[#282929] p-2 px-6 rounded hover:ring-4 transition duration-300"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-slideUp bg-white p-2 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationTimeline: "view(block 50% 20%)",
              }}
            >
              <img
                src={product.image}
                className="w-full h-48 object-cover rounded"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="m-4 grid place-content-center animate-slideUp"
          style={{
            animationTimeline: "view()",
          }}
        >
          <Link
            to="/products"
            className="ring-2 ring-[#282929] p-2 px-6 rounded hover:ring-4 transition duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
