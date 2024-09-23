import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Divider,
  Grid,
  CircularProgress,
  useTheme,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { UseApi } from '../../global/slice';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setToken } from '../../global/slice';
import { useDispatch } from 'react-redux';
import { Popup } from '../../utills/Popup';
import bg from '../../../assets/teddy with snow.jpg'; // Ensure this path is correct

const Login = () => {
  const theme=useTheme()
  const api = UseApi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const mutation = useMutation({
    mutationFn: (formData) => api.post('/auth/login', formData),
    onSuccess: (data) => {
      dispatch(setUser(data?.data?.user));
      dispatch(setToken(data?.data?.token));
      navigate('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      Popup('error', 'Something went wrong... please try again later');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1A1A2E',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          height:500,
          display: 'flex',
          bgcolor: '#f5f5f5',
          borderRadius: 6,
          boxShadow: 3,
        }}
      >
        {/* Left Image Section */}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            backgroundImage: `url(${bg})`, // Correctly set the background image
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            pointerEvents: 'none',
            borderRadius: "20px 0 0 20px", // Applies to top-left and bottom-left corners
          }}
        />
        {/* Right Form Section */}
        <Box
          sx={{
            flex: 1,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Typography variant="h5" letterSpacing={1} fontWeight="700" mx={1}>SIGN IN</Typography>
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2,bgcolor:`${theme.palette.secondary.main}`, "&:hover": { bgcolor: "#4A314D" }, }}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? <CircularProgress size={24} /> : 'Sign in'}
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end', mt: 1 }}>
              <Typography variant="body2" component={Link} to="/signup" sx={{ textDecoration: 'none' }} className='text-[#10657e]'>
                Do not have an account? Signup
              </Typography>
            </Grid>
          </Grid>
              <Link to='/admin/login' className='text-end text-sm'>Login As Admin</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
