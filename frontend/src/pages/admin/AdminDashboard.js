import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalShipping as LocalShippingIcon,
  AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import { fetchOrders } from '../../store/slices/orderSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchProducts } from '../../store/slices/productSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading: ordersLoading } = useSelector((state) => state.orders);
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  const { products, loading: productsLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const loading = ordersLoading || usersLoading || productsLoading;

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: <PeopleIcon fontSize="large" />,
      color: '#1976d2',
    },
    {
      title: 'Total Products',
      value: products.length,
      icon: <ShoppingCartIcon fontSize="large" />,
      color: '#2e7d32',
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: <LocalShippingIcon fontSize="large" />,
      color: '#ed6c02',
    },
    {
      title: 'Total Revenue',
      value: `₹${orders.reduce((sum, order) => sum + order.totalAmount, 0)}`,
      icon: <AttachMoneyIcon fontSize="large" />,
      color: '#9c27b0',
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {React.cloneElement(stat.icon, { sx: { color: stat.color } })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              {orders.slice(0, 5).map((order) => (
                <Box
                  key={order._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Typography>Order #{order._id.slice(-6).toUpperCase()}</Typography>
                  <Typography>₹{order.totalAmount}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Users
              </Typography>
              {users.slice(0, 5).map((user) => (
                <Box
                  key={user._id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <Typography>{user.name}</Typography>
                  <Typography color="text.secondary">{user.email}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 