import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  CardMedia,
  useTheme,
} from "@mui/material";
import bg1 from "../../../assets/10.jpeg";
import bg2 from "../../../assets/11.jpeg";
import bg3 from "../../../assets/13.jpeg";
import bg4 from "../../../assets/19.jpeg";
import bg5 from "../../../assets/9.jpeg";
import visa from "../../../assets/visa.png";
import chip from "../../../assets/chip.png";
import { toast } from "react-toastify";
import { UseApi } from "../../global/slice";
import { useSelector } from "react-redux";

const CreditCardForm = () => {
  const { user } = useSelector((state) => state.data);
  const [bgImage, setBgImage] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    paymentMethod: "Credit Card", // Default to Credit Card
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state;
  const cardRef = useRef(null);
  const theme = useTheme();
  const api = UseApi();

  useEffect(() => {
    if (!product) navigate("/");
  }, [product, navigate]);

  useEffect(() => {
    const images = [bg1, bg2, bg3, bg4, bg5];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    setBgImage(randomImage);
  }, []);

  const formatCardNumber = (number) => {
    return number
      .replace(/\D/g, "") // Remove non-digit characters
      .replace(/(.{4})/g, "$1 ") // Add space every 4 digits
      .trim(); // Remove trailing space
  };

  const handleCvvFocus = () => setIsFlipped(true);
  const handleCvvBlur = () => setIsFlipped(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/cart/orders/${user?._id}`, {
        ...formData,
        ...product,
      });
      if (res.status === 201 || res.status === 200) {
        toast.success("Payment added successfully");
        navigate("/order-confirmation/product", {
          state: { ...formData, ...product },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('something went wrong')
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} className="p-2" sx={{ perspective: "1000px" }}>
          <div
            ref={cardRef}
            style={{
              background: `url(${bgImage}) no-repeat center/cover`,
              transformStyle: "preserve-3d",
              transition: "transform 0.6s",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
            className="p-4 rounded-2xl aspect-[2/1] relative"
          >
            <div
              style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <CardMedia
                  component="img"
                  src={chip}
                  sx={{
                    objectFit: "cover",
                    width: 28,
                    position: "absolute",
                    top: 16,
                    left: 16,
                  }}
                />
                <div className="text-[#fff] absolute top-[40%] left-4">
                  {formatCardNumber(formData.cardNumber) ||
                    "#### #### #### ####"}
                </div>
                <CardMedia
                  component="img"
                  src={visa}
                  sx={{
                    objectFit: "cover",
                    width: 100,
                    position: "absolute",
                    right: 24,
                    top: "10%",
                  }}
                />
              </div>
              <div className="text-[#fff] absolute bottom-4 left-4">
                <span className="text-[#ffffff82] text-[0.7rem]">
                  Card holder
                </span>
                <p className="text-[1rem]">
                  {formData.cardHolder || "YOUR NAME"}
                </p>
              </div>
              <div className="text-[#fff] absolute bottom-4 right-4">
                <span className="text-[#ffffff82] text-[0.7rem]">Expires</span>
                <p className="text-[1rem]">
                  {formData.expiryMonth || "MM"}/{formData.expiryYear || "YY"}
                </p>
              </div>
            </div>
            <div
              style={{
                backfaceVisibility: "hidden",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                color: "#fff",
                transform: "rotateY(180deg)",
                textAlign: "center",
                borderRadius: "16px",
              }}
            >
              <div className="w-full h-8 rounded mt-4 bg-black"></div>
              <p className="text-end p-0.5">CVV</p>
              <input
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className="w-[95%] p-1 rounded outline-none text-[#262626] font-bold"
                maxLength={3}
              />
              <img
                src={visa}
                className="w-20 absolute right-0 bottom-0"
                alt="Visa Logo"
              />
            </div>
          </div>
          <form className="mt-3" onSubmit={handleSubmit}>
            <TextField
              label="Card Number"
              variant="outlined"
              fullWidth
              name="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleChange(e)}
              inputProps={{ maxLength: 19 }}
              sx={{ marginBottom: 2 }}
              required
            />
            <TextField
              label="Card Holder"
              variant="outlined"
              fullWidth
              name="cardHolder"
              value={formData.cardHolder}
              onChange={(e) => handleChange(e)}
              sx={{ marginBottom: 2 }}
              required
            />
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Month"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  required
                >
                  <MenuItem value="" disabled>
                    Select Month
                  </MenuItem>
                  {[...Array(12).keys()].map((month) => (
                    <MenuItem
                      key={month + 1}
                      value={String(month + 1).padStart(2, "0")}
                    >
                      {String(month + 1).padStart(2, "0")}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="Year"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={(e) => handleChange(e)}
                  fullWidth
                  sx={{ marginBottom: 2 }}
                  required
                >
                  <MenuItem value="" disabled>
                    Select Year
                  </MenuItem>
                  {[...Array(10).keys()].map((year) => (
                    <MenuItem key={2024 + year} value={2024 + year}>
                      {2024 + year}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <TextField
              label="CVV"
              variant="outlined"
              fullWidth
              type="text"
              name="cvv"
              value={formData.cvv}
              onFocus={handleCvvFocus}
              onBlur={handleCvvBlur}
              onChange={handleChange}
              inputProps={{ maxLength: 3 }}
              sx={{ marginBottom: 2 }}
              required
            />
            <TextField
              select
              label="Payment Method"
              variant="outlined"
              fullWidth
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              required
            >
              <MenuItem value="Credit Card">Credit Card</MenuItem>
              <MenuItem value="Debit Card">Debit Card</MenuItem>
              <MenuItem value="COD">Cash On Delivery</MenuItem>
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ background: theme.palette.secondary.main }}
            >
              Pay
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CreditCardForm;
