import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { UseApi } from "../global/slice";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import profile from '../../assets/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg'

const columns = [
  { field: "id", headerName: "", width: 90 },
  {
    field: "",
    headerName: "Avatar",
    width: 90,
    renderCell: (params) => (
      <img
      src={profile}
        className="mix-blend-multiply rounded-full w-10 h-10 mt-1.5"
      >
        {params.value}
      </img>
    ),
  },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 150 },
  { field: "createdAt", headerName: "createdAt", width: 110 },
];

const AdminUsers = () => {
  const api = UseApi();
  const navigate = useNavigate();

  const fetchingData = async () => {
    const { data } = await api.get("/auth/user");
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchUsers"],
    queryFn: fetchingData,
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center h-screen">
        <CircularProgress />{" "}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Map the fetched user data to the format expected by DataGrid rows
  const rows =
    data?.map((user, index) => ({
      id: index + 1,
      name: user?.firstName + " " + user?.lastName,
      email: user?.email,
      createdAt: user?.createdAt?.slice(0, 10),
    })) || [];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
  );
};

export default AdminUsers;
