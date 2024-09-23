import { BarChart, Dashboard, Inventory, People, ShoppingCart } from '@mui/icons-material';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ minimized }) => {
  // Sidebar items array with color and background
  const sidebarItems = [
    { label: 'Dashboard', icon: <Dashboard />, link: '/admin', bgColor: '#4caf50', color: '#fff' }, // Green
    { label: 'Products', icon: <Inventory />, link: '/admin/products', bgColor: '#2196f3', color: '#fff' }, // Blue
    { label: 'Orders', icon: <ShoppingCart />, link: '/admin/orders', bgColor: '#ff9800', color: '#fff' }, // Orange
    { label: 'Users', icon: <People />, link: '/admin/users', bgColor: '#e91e63', color: '#fff' }, // Pink
    { label: 'Analytics', icon: <BarChart />, link: '/admin/analytics', bgColor: '#9c27b0', color: '#fff' }, // Purple
  ];

  return (
    <Box
      sx={{
        width: minimized ? '60px' : '200px',
        transition: 'width 0.3s',
        ml:2,mt:1
      }}
    >

      <List>
        {sidebarItems.map((item, index) => (
          <ListItem
            component={Link}
            to={item.link}
            key={index}
            sx={{
              mb: 2,
              bgcolor: item.bgColor, // Apply background color
              borderRadius: '8px',
              color: item.color,
              '&:hover': {
                color: item.bgColor,
                opacity:0.8
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: minimized ? '#ffffff' : item.color, // Icon color
                justifyContent: minimized ? 'center' : 'flex-start', // Center icon when minimized
                transition: 'all 0.3s',
              }}
            >
              {item.icon}
            </ListItemIcon>
            {!minimized && (
              <ListItemText
                primary={item.label}
                sx={{
                  fontWeight: 'bold',
                  color: item.color,
                  transition: 'color 0.3s',
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;
