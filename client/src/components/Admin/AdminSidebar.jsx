import {
  BarChart,
  Dashboard,
  Inventory,
  ShoppingCart,
  People,
  MenuOpen,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Sidebar items array with color and background
const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    link: "/admin",
    bgColor: "#0C7C59", // Green
    color: "#fff",
  },
  {
    label: "Products",
    icon: <Inventory />,
    link: "/admin/products",
    bgColor: "#2196f3", // Blue
    color: "#fefefe",
  },
  {
    label: "Orders",
    icon: <ShoppingCart />,
    link: "/admin/orders",
    bgColor: "#ff9800", // Orange
    color: "#fff",
  },
  {
    label: "Users",
    icon: <People />,
    link: "/admin/users",
    bgColor: "#e91e63", // Pink
    color: "#fff",
  },
  {
    label: "Analytics",
    icon: <BarChart />,
    link: "/admin/analytics",
    bgColor: "#9c27b0", // Purple
    color: "#fff",
  },
];

const AdminSidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: open ? "0px" : "180px", // Adjust width based on 'open' state
        transition: "width 0.3s",
        overflow:"hidden",
        backgroundColor: "#696773", // Sidebar background
        backdropFilter:"blur(30px)",
        position:"sticky",
        top:56,
      }}
    >
      {/* Sidebar List Items */}
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            component={Link}
            to={item.link}
            key={index}
            sx={{
              m:1.2,
              width:"fit-content",
              bgcolor: pathname === item.link ? item.bgColor : "transparent", // Active background
              color: pathname === item.link ? item.color : "#fff", // Active text color
              borderRadius: "8px",
              "&:hover": {
                bgcolor: item.bgColor,
                opacity: 0.8,
              },
              transition: "background-color 0.3s",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "40px",
                color: pathname === item.link ? item.color : "#fefefe", // Icon color
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open ? null : (
              <ListItemText
                primary={item.label}
                sx={{ color: pathname === item.link ? item.color : "#fefefe" }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;