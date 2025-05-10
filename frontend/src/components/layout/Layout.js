import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { useUserData } from '../../hooks/useUserData';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
  Dashboard,
  Logout,
  AdminPanelSettings,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isAdmin } = useUserData();
  const { items } = useSelector((state) => state.cart);
  const [adminMenuAnchor, setAdminMenuAnchor] = React.useState(null);
  
  console.log("user",user);

  const handleAdminMenuOpen = (event) => {
    setAdminMenuAnchor(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchor(null);
  };

  const handleAdminNavigation = (path) => {
    navigate(path);
    handleAdminMenuClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            GGI Hi-Tech Farm
          </Typography>

          <Button color="inherit" onClick={() => navigate('/products')}>
            Products
          </Button>

          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ ml: 2 }}
          >
            <Badge badgeContent={items.length} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <Typography variant="body1" sx={{ mx: 2 }}>
                Welcome, {user?.name}
              </Typography>
              {!isAdmin && (
              <Button
                color="inherit"
                startIcon={<Person />}
                onClick={() => navigate('/orders')}
              >
                My Orders
              </Button>
              )}
              {isAdmin && (
                <>
                  <Button
                    color="inherit"
                    startIcon={<AdminPanelSettings />}
                    onClick={handleAdminMenuOpen}
                  >
                    Admin
                  </Button>
                  <Menu
                    anchorEl={adminMenuAnchor}
                    open={Boolean(adminMenuAnchor)}
                    onClose={handleAdminMenuClose}
                  >
                    <MenuItem onClick={() => handleAdminNavigation('/admin')}>
                      Dashboard
                    </MenuItem>
                    <MenuItem onClick={() => handleAdminNavigation('/admin/products')}>
                      Products
                    </MenuItem>
                    <MenuItem onClick={() => handleAdminNavigation('/admin/orders')}>
                      Orders
                    </MenuItem>
                    <MenuItem onClick={() => handleAdminNavigation('/admin/users')}>
                      Users
                    </MenuItem>
                  </Menu>
                </>
              )}
              
              <Button
                color="inherit"
                startIcon={<Logout />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} GGI Hi-Tech Farm. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 