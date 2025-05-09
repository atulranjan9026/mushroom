# GGI Hi-Tech Farm Backend

This is the backend server for the GGI Hi-Tech Farm e-commerce application.

## Features

- User authentication and authorization
- Product management
- Order management
- User management
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rk-hi-tech-farm
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (admin only)
- PUT /api/products/:id - Update product (admin only)
- DELETE /api/products/:id - Delete product (admin only)

### Orders
- GET /api/orders - Get all orders (admin only)
- GET /api/orders/myorders - Get user's orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create order
- PUT /api/orders/:id/status - Update order status (admin only)

### Users
- GET /api/users - Get all users (admin only)
- GET /api/users/:id - Get single user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user (admin only)

## Error Handling

The API uses a consistent error handling format:
```json
{
  "message": "Error message",
  "stack": "Error stack trace (in development only)"
}
```

## License

MIT 