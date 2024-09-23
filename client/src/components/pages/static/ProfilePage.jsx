import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../../../assets/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";
import { setUser, UseApi } from "../../global/slice";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

// Styled components
const Root = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 1000,
  width: "100%",
  padding: "2rem",
  borderRadius: "20px",
  backgroundColor: "#fff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  marginBottom: "1rem",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: "1rem",
  color: theme.palette.primary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1976d2",
  color: "#fff",
  marginTop: "1.5rem",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
}));

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();
  const { user } = useSelector((state) => state.data);
  const api = UseApi();
  const [modalOpen,setModalOpen]=useState(false)

  const fetchOrderDetails = async (userId) => {
    const { data } = await api.get(`/cart/orders/${userId}`);
    return data;
  };

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [navigate]);

  const { data, error, isLoading } = useQuery({
    queryKey: ["orderDetails", user?._id],
    queryFn: () => fetchOrderDetails(user?._id),
    enabled: !!user?._id,
  });

  const handleSave = (updatedUser) => {
    dispatch(setUser(updatedUser));
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Root>
      <ProfileCard>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            {/* Profile Section */}
            <Grid item xs={12} md={4}>
              <Box display="flex" flexDirection='column' alignItems='center'>
                  <ProfileAvatar alt="User Avatar" src={profile} />
                  <Typography variant="h5">{username}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user?.email}
                  </Typography>
                  <StyledButton
                    variant="contained"
                    onClick={() => setModalOpen(true)}
                  >
                    Edit Profile
                  </StyledButton>
              </Box>
            </Grid>

            {/* Account Information Section */}
            <Grid item xs={12} md={8}>
              <SectionTitle variant="h6">Account Information</SectionTitle>
              <Typography variant="body1" gutterBottom>
                <strong>Member since:</strong>{" "}
                {moment(user?.createdAt).format("MMMM Do, YYYY")}
              </Typography>
              {data && (
                <>
                  <Typography variant="body1" gutterBottom>
                    <strong>Last Order Date:</strong>{" "}
                    {moment(data?.orderDate).format("MMMM Do, YYYY")}
                  </Typography>
                </>
              )}

              {/* Shipping Address */}
              <SectionTitle variant="h6">Address</SectionTitle>
              <List>
                <ListItem>
                  <ListItemText
                    primary={`${data?.shippingAddress?.name}`}
                    secondary={`${data?.shippingAddress?.addressLine1}, ${data?.shippingAddress?.city}, ${data?.shippingAddress?.state}, ${data?.shippingAddress?.zipCode}, ${data?.shippingAddress?.country}`}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          {/* Order History Section */}
          <Grid container spacing={3} marginTop={4}>
            {data ? (
              <Grid item xs={12}>
                <SectionTitle variant="h6">Order History</SectionTitle>
                <List>
                  {data.items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={item.title}
                        secondary={`Quantity: ${item.quantity} - $${item.price}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography>No Orders Found</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </ProfileCard>
      <EditProfileModal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        user={user}
        handleSave={handleSave}
      />
    </Root>
  );
};

export default ProfilePage;

const EditProfileModal = ({ open, handleClose, user, handleSave }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // Consolidated state for form data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address || "",
  });

  // Handle input changes dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field
    });
  };

  const handleSubmit = () => {
    // Merge the updated form data with the existing user data
    const updatedData = {
      ...user, // Keep old data intact
      ...formData, // Merge with updated fields
    };

    handleSave(updatedData); // Call the save function with merged data
    handleClose(); // Close the modal after saving
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Profile
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Address"
          name="address"
          fullWidth
          margin="normal"
          value={formData.address}
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};
