import React from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { keyframes } from '@emotion/react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router-dom';

// Animation for subtle fading
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Root container with a vibrant gradient background
const Root = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, #365657 30%, #424242 100%)',
  minHeight: '100vh',
  color: '#ffffff',
  animation: `${fadeIn} 1s ease-out`,
}));

// Styled Avatar with shadow and border
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(20),
  height: theme.spacing(20),
  marginBottom: theme.spacing(3),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
  border: '4px solid #242424',
}));

// Centered content with more modern typography
const Content = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: '800px',
  '& h4': {
    fontWeight: '700',
    marginBottom: theme.spacing(2),
    color: '#FFF',
  },
  '& p': {
    fontSize: 'clamp(0.7rem, 1.5vw, 1.2rem)',
    marginBottom: theme.spacing(2),
  },
}));

// Paper element with soft shadow and padding
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: '#fdfdfd',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  animation: `${fadeIn} 1.5s ease-out`,
}));

// Social Icons with hover effects
const SocialIcons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  '& svg': {
    fontSize: '2rem',
    color: '#6D83F2',
    margin: theme.spacing(1),
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.3)',
      color: '#8DDBE0',
    },
  },
}));

// Styled button with gradient and hover effect
const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  background: 'linear-gradient(135deg, #FF6F61 0%, #D35D9E 100%)',
  color: '#ffffff',
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #D35D9E 0%, #FF6F61 100%)',
  },
}));

const About = () => {
  return (
    <Root>
      <StyledAvatar
        alt="Company Logo"
        src={logo}
      />
      <Content>
        <Typography variant="h4">
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our e-commerce store! We are dedicated to providing you with the best products and services. Our team works tirelessly to ensure customer satisfaction and to bring you the latest and greatest in our industry.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to make your shopping experience as enjoyable and seamless as possible. Thank you for choosing us!
        </Typography>
      </Content>
      <StyledPaper elevation={3}>
        <Typography  className="bg-[#282929] text-center rounded p-1 text-[#e9e6e6]" variant="h6" gutterBottom>
          Our Values
        </Typography>
        <Typography variant="body2" paragraph>
          We believe in quality, integrity, and customer satisfaction. Our values drive us to deliver the best products and services to our customers.
        </Typography>
        <Typography variant="body2" paragraph>
          Join us on our journey and stay connected through our social media channels.
        </Typography>
        <SocialIcons>
          <Facebook />
          <Twitter />
          <Instagram />
        </SocialIcons>
      </StyledPaper>
      <StyledButton variant="contained">
        <Link to='/contact'>Contact Us</Link>
      </StyledButton>
    </Root>
  );
};

export default About;
