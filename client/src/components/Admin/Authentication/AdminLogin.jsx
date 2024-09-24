import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser, UseApi } from "../../global/slice";
import { Popup } from "../../utills/Popup";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const api = UseApi();
  const dispatch=useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/admin/login", { email, password });
      dispatch(setUser(data?.user));
      dispatch(setToken(data?.token));
      navigate("/admin");
      Popup("success", res.data.message);
    } catch (error) {
      console.log(error)
      if (error?.response?.status === 404) {
        Popup("error", error?.response?.data?.message);
        return;
      }
      
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
          <Link to="/admin/signup">Do not have an account? Signup</Link>
        </form>
      </Box>
    </Container>
  );
};

export default AdminLogin;
