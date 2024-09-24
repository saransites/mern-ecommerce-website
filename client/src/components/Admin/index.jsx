import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const AdminIndex = () => {
  return (
    <Box display="flex" gap={3}>
      {/* Sidebar section */}
      <Box>
        <AdminSidebar />
      </Box>

      {/* Main content section */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          bgcolor: "#dad7d7",
          m: 2,
          borderRadius: "8px",
          overflowX:"auto"
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminIndex;
