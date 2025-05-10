import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
} from '@mui/material';
import {
  People,
  ShoppingCart,
  Inventory,
  AttachMoney,
  TrendingUp,
  TrendingDown,
  MoreVert,
  Add,
  Edit,
  Delete,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import { fetchUsers } from '../../store/slices/userSlice';

const StatCard = ({ title, value, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box sx={{ color: color }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const RecentItem = ({ title, subtitle, icon, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} secondary={subtitle} />
  </ListItem>
);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.length;
  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter(product => product.stock < 10).slice(0, 5);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value={totalOrders}
            icon={<ShoppingCart sx={{ fontSize: 40 }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={totalProducts}
            icon={<Inventory sx={{ fontSize: 40 }} />}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={<People sx={{ fontSize: 40 }} />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => navigate('/admin/products/new')}
                >
                  Add New Product
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<Visibility />}
                  onClick={() => navigate('/admin/orders')}
                >
                  View All Orders
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<People />}
                  onClick={() => navigate('/admin/users')}
                >
                  Manage Users
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Orders and Low Stock Products */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Recent Orders"
              action={
                <IconButton onClick={() => navigate('/admin/orders')}>
                  <MoreVert />
                </IconButton>
              }
            />
            <Divider />
            <List>
              {recentOrders.map((order) => (
                <RecentItem
                  key={order._id}
                  title={`Order #${order._id.slice(-6)}`}
                  subtitle={`₹${order.totalAmount} - ${new Date(order.createdAt).toLocaleDateString()}`}
                  icon={<ShoppingCart />}
                  onClick={() => navigate(`/admin/orders/${order._id}`)}
                />
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              title="Low Stock Products"
              action={
                <IconButton onClick={() => navigate('/admin/products')}>
                  <MoreVert />
                </IconButton>
              }
            />
            <Divider />
            <List>
              {lowStockProducts.map((product) => (
                <RecentItem
                  key={product._id}
                  title={product.name}
                  subtitle={`Stock: ${product.stock} units`}
                  icon={<Inventory />}
                  onClick={() => navigate(`/admin/products/${product._id}`)}
                />
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 