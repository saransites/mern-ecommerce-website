import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  CircularProgress,
  Divider,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UseApi } from "../../global/slice";
import { Popup } from "../../utills/Popup";
import bg from "../../../assets/teddy with snow.jpg";

const Signup = () => {
  const api = UseApi();
  const theme=useTheme()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Define the signup mutation
  const mutation = useMutation({
    mutationFn: (formData) => api.post("/auth/signup", formData),
    onSuccess: (data) => {
      Popup("success", "Account created successfully");
      navigate("/login");
    },
    onError: (error) => {
      Popup(
        "error",
        error.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      Popup("error", "password must be 6 characters");
      return;
    }
    mutation.mutate(formData);
  };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#1A1A2E",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 900,
          height: 450,
          display: "flex",
          gap: 1,
          bgcolor: "#f5f5f5",
          borderRadius: 6,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
            backgroundImage: `url(${bg})`, // Correctly set the background image
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px 0 0 20px", // Applies to top-left and bottom-left corners
          }}
        />
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ flex: 1, p: 1, alignSelf: "center" }}
        >
          <Divider sx={{mb:4}}>
            <Typography fontWeight="bold" letterSpacing={1}>
              SIGNUP
            </Typography>
          </Divider>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,bgcolor:`${theme.palette.secondary.main}`, "&:hover": { bgcolor: "#4A314D" }, }}
            disabled={mutation.isLoading} // Disable button when loading
          >
            {mutation.isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Signup"
            )}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                to="/login"
                className="text-[clamp(0.7rem,2vw,1rem)] text-[#2d4b7d]"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
