import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const AdminIndex = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box display="flex">
      {/* Sidebar section */}
      <Box position="relative">
        <IconButton
          onClick={() => setOpen(!open)}
          sx={{
            position: "absolute",
            top: 8,
            right: -33,
            zIndex: 1,
            bgcolor: "#232313",
            "&:hover": { bgcolor: "#23231399" },
          }}
        >
          {open ? (
            <MenuIcon sx={{ color: "#fefefe", fontSize: 15 }} />
          ) : (
            <Cancel sx={{ color: "#fefefe", fontSize: 15 }} />
          )}
        </IconButton>
        <AdminSidebar open={open} setOpen={setOpen} />
      </Box>

      {/* Main content section */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: "#dad7d7",
          m: 1,
          borderRadius: "8px",
          overflowX: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminIndex;
