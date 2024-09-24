import React from "react";
import { Grid, Paper, Typography, CircularProgress } from "@mui/material";
import { UseApi } from "../global/slice";
import { useQuery } from "@tanstack/react-query";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title);

const AdminDashboard = () => {
  const api = UseApi();

  const fetchingData = async () => {
    const { data } = await api.get('/admin/api/dashboard');
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['dashboardDetails'],
    queryFn: () => fetchingData(),
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading data</Typography>;

  // Data for the line chart (sales over time)
  const lineChartData = {
    labels: data.salesOverTime.map(sale => sale.date),
    datasets: [
      {
        label: 'Sales',
        data: data.salesOverTime.map(sale => sale.total),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      }
    ],
  };

  // Data for the pie chart (orders vs users)
  const pieChartData = {
    labels: ['Orders', 'Users'],
    datasets: [
      {
        data: [data.totalOrders, data.totalUsers],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      }
    ]
  };

  // Data for bar chart (top products)
  const barChartData = {
    labels: data.topProducts.map(product => product.productName),
    datasets: [
      {
        label: 'Quantity Sold',
        data: data.topProducts.map(product => product.totalSold),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }
    ]
  };

  return (
    <Grid container spacing={3}>
      {/* Total Sales, Orders, Users */}
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Total Sales</Typography>
          <Typography variant="h4">${data?.totalSales.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Orders</Typography>
          <Typography variant="h4">{data?.totalOrders}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Users</Typography>
          <Typography variant="h4">{data?.totalUsers}</Typography>
        </Paper>
      </Grid>

      {/* Line chart for sales over time */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Sales Over Time</Typography>
          <Line data={lineChartData} />
        </Paper>
      </Grid>

      {/* Pie chart for Orders vs Users */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Orders vs Users</Typography>
          <Pie data={pieChartData} />
        </Paper>
      </Grid>

      {/* Bar chart for top products */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Top Products</Typography>
          <Bar data={barChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;