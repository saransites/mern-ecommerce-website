import React from 'react';
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Bar, Line } from 'react-chartjs-2';
import { UseApi } from '../global/slice';

const AdminAnalytics = () => {
  const api = UseApi();

  const fetchAnalyticsData = async () => {
    const { data } = await api.get('/admin/api/analytics');
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminAnalytics'],
    queryFn: fetchAnalyticsData,
  });
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error loading analytics data</div>;
  }

  const userChartData = {
    labels: data.userGrowth.map(entry => entry.month),
    datasets: [
      {
        label: 'User Growth',
        data: data.userGrowth.map(entry => entry.count),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const orderChartData = {
    labels: data.orderStats.map(entry => entry.month),
    datasets: [
      {
        label: 'Orders',
        data: data.orderStats.map(entry => entry.count),
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{data.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Orders</Typography>
              <Typography variant="h4">{data.totalOrders}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Revenue</Typography>
              <Typography variant="h4">${data.totalRevenue}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">User Growth</Typography>
          <Bar data={userChartData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Order Stats</Typography>
          <Line data={orderChartData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminAnalytics;