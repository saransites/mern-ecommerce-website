import React from "react";
import { Box, Container, Grid, Typography, Paper, Avatar } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        About Us
      </Typography>
      <Grid container spacing={4}>
        {/* Company Story */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Our Story
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Founded in 2024, we started as a small online store with a big vision:
              to make quality products accessible to everyone. Over the years, we have grown into
              a trusted e-commerce platform, serving thousands of customers worldwide.
              Our journey has been driven by a passion for excellence and a commitment to
              customer satisfaction.
            </Typography>
          </Paper>
        </Grid>

        {/* Mission and Vision */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
              To provide high-quality products at competitive prices while delivering
              exceptional customer service.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              To be the go-to online destination for quality and convenience, setting
              the standard for e-commerce excellence.
            </Typography>
          </Paper>
        </Grid>

        {/* Values Section */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" align="center" gutterBottom>
              Our Core Values
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor: "#2a9d8f",
                      marginInline: "auto",
                    }}
                  >
                    C
                  </Avatar>
                  <Typography variant="h6">Customer First</Typography>
                  <Typography variant="body2" color="text.secondary">
                    We put our customers at the heart of everything we do. Your satisfaction
                    is our priority.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor: "#2a9d8f",
                      marginInline: "auto",
                    }}
                  >
                    I
                  </Avatar>
                  <Typography variant="h6">Integrity</Typography>
                  <Typography variant="body2" color="text.secondary">
                    We conduct our business with honesty and transparency, building trust with
                    our customers and partners.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: "center", p: 2 }}>
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mb: 2,
                      bgcolor: "#2a9d8f",
                      marginInline: "auto",
                    }}
                  >
                    E
                  </Avatar>
                  <Typography variant="h6">Excellence</Typography>
                  <Typography variant="body2" color="text.secondary">
                    We strive for excellence in every aspect of our business, from product
                    quality to customer service.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
