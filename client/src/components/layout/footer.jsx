import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { GitHub, LinkedIn, YouTube } from "@mui/icons-material";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ color: "#ffffff", py: 4 }}
      className="bg-[#262626]"
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box className="flex items-center">
              <img src={logo} className="w-14 rounded-full" />
              <Typography variant="h4" className="pt-4 pl-2" gutterBottom>
                Store
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Made with{" "}
              <span role="img" aria-label="heart">
                ❤️
              </span>{" "}
              by Store
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                sx={{ color: "#ffffff", background: "rgba(255,255,255,0.1)" }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                sx={{ color: "#ffffff", background: "rgba(255,255,255,0.1)" }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                sx={{ color: "#ffffff", background: "rgba(255,255,255,0.1)" }}
              >
                <YouTube />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              2024 © All Rights Reserved
            </Typography>
          </Grid>

          <Grid item xs={6} md={3}>
            <Box className="backdrop-blur-xl bg-[rgba(255,255,255,0.1)] space-y-1 p-6 rounded-xl ml-2 sm:ml-0">
              <Typography color="inherit" underline="hover">
                About
              </Typography>
              <Typography color="inherit" underline="hover">
                Our mission
              </Typography>
              <Typography color="inherit" underline="hover">
                Privacy Policy
              </Typography>
              <Typography color="inherit" underline="hover">
                Terms of service
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} md={3} justifySelf="end">
            <Box className="backdrop-blur-xl bg-[rgba(255,255,255,0.1)] space-y-1 p-6 rounded-xl">
              <Typography color="inherit" underline="hover">
                Services
              </Typography>
              <Link to="/products" color="inherit" underline="hover">
                Products
              </Link>
              <Typography color="inherit" underline="hover">
                Join our team
              </Typography>
              <Typography color="inherit" underline="hover">
                Partner with us
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
