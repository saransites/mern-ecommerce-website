import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Facebook, Twitter, Instagram, LocationOn } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
// Animation for subtle fading
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
// Root container with gradient background
const Root = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(6),
  background: "linear-gradient(135deg, #365657 30%, #424242 100%)",
  minHeight: "100vh",
  animation: `${fadeIn} 1s ease-out`,
}));

// Contact form styling
const StyledForm = styled(Box)(({ theme }) => ({
  maxWidth: "600px",
  width: "100%",
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  borderRadius: theme.spacing(2),
  boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
}));

// Social media icons with hover animations
const SocialIcons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  "& svg": {
    margin: theme.spacing(1),
    fontSize: "2rem",
    color: "#555",
    transition: "color 0.3s ease, transform 0.3s ease",
    "&:hover": {
      color: "#3f51b5",
      transform: "scale(1.3)",
    },
  },
}));

// Submit button styling
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5, 4),
  background: "linear-gradient(135deg, #3F51B5 0%, #2196F3 100%)",
  color: "#ffffff",
  "&:hover": {
    background: "linear-gradient(135deg, #2196F3 0%, #3F51B5 100%)",
  },
}));

const Contact = () => {
  return (
    <Root>
      <Typography
        variant="h4"
        mb={3}
        style={{ fontSize: "clamp(1.8rem, 4vw, 2rem)" }}
        color="#fefefe"
        fontWeight="bold"
      >
        Contact Us
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <StyledForm>
            <Typography variant="h6"  className="bg-[#282929] rounded p-1 text-[#e9e6e6] text-center" gutterBottom fontWeight="bold">
              Get in Touch
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              required
            />
            <StyledButton fullWidth variant="contained">
              Send Message
            </StyledButton>
          </StyledForm>
        </Grid>

        {/* Social Media Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={4} style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h6" className="bg-[#282929] rounded p-1 text-[#e9e6e6]" gutterBottom>
              Connect with Us
            </Typography>
            <SocialIcons>
              <Facebook style={{ fontSize: "clamp(1.3rem, 4vw, 2.5rem)" }} />
              <Twitter style={{ fontSize: "clamp(1.3rem, 4vw, 2.5rem)" }} />
              <Instagram style={{ fontSize: "clamp(1.3rem, 4vw, 2.5rem)" }} />
            </SocialIcons>
          </Paper>
        </Grid>
      </Grid>

      {/* Location Map Section */}
      <Box mt={5} width="100%">
        <Paper elevation={4} style={{ padding: "10px", textAlign: "center" }}>
          <Typography variant="h6" gutterBottom  className="bg-[#282929] rounded p-1 text-[#e9e6e6]">
            Our Location
          </Typography>
          <Box display="flex" justifyContent="center" my={2}>
            <LocationOn
              color="primary"
              style={{ fontSize: "clamp(1.3rem, 4vw, 2.5rem)" }}
            />
          </Box>
          <iframe
            title="Paramakudi Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.562713320003!2d78.58528351461952!3d9.542228992506448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00e55a04000001%3A0x707f81665f4bbf0b!2sParamakudi%2C%20Tamil%20Nadu%20623307%2C%20India!5e0!3m2!1sen!2sus!4v1695142895734!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </Paper>
      </Box>
    </Root>
  );
};

export default Contact;
