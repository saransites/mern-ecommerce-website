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
import { AddShoppingCart, Dashboard, LogoutOutlined, Search } from "@mui/icons-material";
import logo from "../../assets/logo.png";

// Styled components using MUI's styled utility
const Logo = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  fontWeight: 700,
  fontFamily: theme?.typography?.fontFamily,
  letterSpacing: 0.5,
}));

const NavButton = styled(Button)(({ theme }) => ({
  marginRight: 1,
  position: "relative",
  fontFamily: theme?.typography?.fontFamily,
  letterSpacing: 0.5,
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
  const theme = useTheme();
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
    <Box
      sx={{ backgroundColor: `${theme?.palette?.secondary?.heading}` }}
      className={`backdrop-blur-2xl text-[#fff] sticky top-0 z-[9] shadow-[0_0_1rem_#262626]`}
    >
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
              {user ? (
                <IconButton onClick={handleAvatarClick}>
                  <Avatar />
                </IconButton>
              ) : (
                <Box className="hidden md:flex">
                  <Link
                    to="/login"
                    className="p-2 border-2 border-[#95aec3] hover:bg-[#272067] hover:border-transparent text-[#f6f6f6] transition duration-500 mr-1 px-6 rounded"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="p-2 bg-[#262626] hover:bg-[#3b3b3b] transition duration-500 mr-1 px-6 rounded"
                  >
                    Sign up
                  </Link>
                </Box>
              )}
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
                {user?.role === "user" ? (
                  <>
                    <MenuItem>
                      <Link
                        to={`/${user?._id}`}
                        className="flex items-center"
                      >
                        <IconButton>
                          <Avatar sx={{ width: 30, height: 30 }} />
                        </IconButton>
                        <Typography>Profile</Typography>
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={() => navigate("/cartpage")}>
                      <IconButton>
                        <AddShoppingCart />
                      </IconButton>
                      <Typography>Cart Lists</Typography>
                    </MenuItem>
                    <Divider />
                  </>
                ) : (<>
                <MenuItem onClick={() => navigate("/admin")}>
                      <IconButton>
                        <Dashboard />
                      </IconButton>
                      <Typography>Dashboard</Typography>
                    </MenuItem>
                </>)}
                <MenuItem onClick={handleLogout}>
                  <IconButton>
                    <LogoutOutlined />
                  </IconButton>
                  <Typography color="error">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}

export default Header;
