import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Phone, Email, LocationOn } from "@mui/icons-material";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Get in Touch
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Phone"
                type="tel"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                variant="outlined"
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#2a9d8f",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#15616d" },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body1">+1 123-456-7890</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body1">support@example.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body1">
                  123 E-commerce St, City, Country
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
