import {
  BarChart,
  Dashboard,
  Inventory,
  MenuOpen,
  People,
  ShoppingCart,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Sidebar items array with color and background
const sidebarItems = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    link: "/admin",
    bgColor: "#4caf50",
    color: "#fff",
  }, // Green
  {
    label: "Products",
    icon: <Inventory />,
    link: "/admin/products",
    bgColor: "#2196f3",
    color: "#fff",
  }, // Blue
  {
    label: "Orders",
    icon: <ShoppingCart />,
    link: "/admin/orders",
    bgColor: "#ff9800",
    color: "#fff",
  }, // Orange
  {
    label: "Users",
    icon: <People />,
    link: "/admin/users",
    bgColor: "#e91e63",
    color: "#fff",
  }, // Pink
  {
    label: "Analytics",
    icon: <BarChart />,
    link: "/admin/analytics",
    bgColor: "#9c27b0",
    color: "#fff",
  }, // Purple
];
const AdminSidebar = () => {
  const [open,setOpen]=useState(false)

  return (
    <Box
      sx={{
        width: open ? "60px" : "200px",
        transition: "width 0.3s",
        ml: 2,
        position:"relative"
      }}
    >
      <IconButton onClick={()=>setOpen(!open)} sx={{position:"absolute",top:'47.6%',translate:"-0% -50%",right:-38.3,zIndex:1,bgcolor:"#232313",'&:hover':{bgcolor:"#23231399"}}}>
        <MenuIcon sx={{color:"#fefefe",fontSize:20}}/>
      </IconButton>
      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            component={Link}
            to={item.link}
            key={index}
            sx={{
              mb: 2,
              bgcolor: item.bgColor, // Apply background color
              borderRadius: "8px",
              color: item.color,
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: open ? "#ffffff" : item.color, // Icon color
                transition: "all 0.3s",
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!open && <ListItemText primary={item.label} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;
