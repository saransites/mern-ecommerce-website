import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  InputBase,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { logout, setProducts } from "../global/slice";
import { AddShoppingCart, LogoutOutlined, Search } from "@mui/icons-material";
import logo from '../../assets/logo.png'

// Styled components using MUI's styled utility
const Logo = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  fontWeight: 700,
  fontFamily: theme?.typography?.fontFamily,
  letterSpacing:0.5
}));

const NavButton = styled(Button)(({ theme }) => ({
  marginRight: 1,
  position: "relative",
  fontFamily: theme?.typography?.fontFamily,
  "&:hover": {
    background: "none", // Ensuring no background color on hover
  },
  "&::before": {
    content: '""', // Ensure content is properly set as an empty string
    position: "absolute",
    width: "100%",
    height: "5px",
    borderBottom: "2px solid #3C3D37",
    bottom: 0,
    transform: "scaleX(0)",
    transformOrigin: "100% 0%",
    transition: "transform 0.5s ease-in-out",
  },
  "&:hover::before": {
    transform: "scaleX(1)",
    transformOrigin: "0% 100%",
  },
}));

const NavLink = ({ to, label, onClick }) => (
  <NavButton component={Link} to={to} color="inherit" onClick={onClick}>
    {label}
  </NavButton>
);

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarEl, setAvatarEl] = useState(null); // State for avatar menu
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.data);
  const theme=useTheme()
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarClick = (event) => {
    setAvatarEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <Box sx={{backgroundColor:`${theme?.palette?.secondary?.heading}`}} className={`backdrop-blur-2xl text-[#fff]`}>
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {/* Logo or Brand Name */}
          <Box className="flex items-center">
            <img src={logo} className="w-14 mix-blend-multiply rounded-full" />
            <Logo onClick={() => navigate("/")} variant="h6" component="div">
              Store
            </Logo>
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              gap: 2,
            }}
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} to={link.to} label={link.label} />
            ))}
          </Box>

          {/* Avatar and Mobile Menu */}
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            {/* Mobile Menu Icon */}
            <Box sx={{ display: { xs: "flex", md: "none" }, marginRight: 1 }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {navLinks.map((link, index) => (
                  <MenuItem key={index} onClick={handleClose}>
                    <NavLink
                      to={link.to}
                      label={link.label}
                      onClick={handleClose}
                    />
                  </MenuItem>
                ))}
                {user ? (
                  <Button onClick={handleLogout}>Logout</Button>
                ) : (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Button color="info" variant="outlined">
                        <Link to="/login">Sign in</Link>
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button color="info" variant="contained">
                        <Link to="/signup">Sign up</Link>
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            {/* Avatar Menu */}
            <Box sx={{ display: { xs: "flex" }, justifyContent: "flex-end" }}>
              <IconButton onClick={handleAvatarClick}>
                <Avatar />
              </IconButton>
              <Menu
                anchorEl={avatarEl}
                open={Boolean(avatarEl)}
                onClose={handleAvatarClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {user ? (
                  <>
                    <MenuItem onClick={handleAvatarClose}>
                      <Typography variant="body1">
                        Signed in as{" "}
                        <strong>
                          {user?.firstName + " " + user?.lastName}
                        </strong>
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => navigate("/cartpage")}>
                      <IconButton>
                        <AddShoppingCart />
                      </IconButton>
                      <Typography>Cart Lists</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <IconButton>
                        <LogoutOutlined />
                      </IconButton>
                      <Typography color="error">Logout</Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleAvatarClose}>
                      <Button color="info" variant="outlined">
                        <Link to="/login">Sign in</Link>
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleAvatarClose}>
                      <Button color="info" variant="contained">
                        <Link to="/signup">Sign up</Link>
                      </Button>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}

export default Header;
