import React from "react";
import Header from "./components/layout/Header";
import MainRoutes from "./components/Routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/layout/footer";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <MainRoutes />
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
