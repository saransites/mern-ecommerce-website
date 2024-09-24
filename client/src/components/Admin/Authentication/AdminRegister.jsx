import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UseApi } from "../../global/slice";
import { Popup } from "../../utills/Popup";

const AdminSignup = () => {
  const api = UseApi();
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange=(e)=>{
    setFormData((prev)=>({
      ...prev,[e.target.name]:e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/signup", FormData);
      if (res.status === 201) {
        navigate("/admin/login");
        Popup('success',res.data.message)
      }
    } catch (error) {
      if(error.response.status === 400){
        Popup('error',error.response.data.message)
        return
      }
      setError("Invalid email or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom>
          Admin Signup
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
          name="name"
            label="name"
            fullWidth
            margin="normal"
            variant="outlined"
            value={FormData.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={FormData.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={FormData.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AdminSignup;
