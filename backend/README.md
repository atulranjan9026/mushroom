# RK Hi-Tech Farm Backend

<!-- 
  This is the main backend server for RK Hi-Tech Farm e-commerce application.
  Start here to understand the API structure and setup the development environment.
  
  Quick Start: Run 'npm run start:all' in the backend directory to start both frontend and backend servers
-->

This is the backend server for RK Hi-Tech Farm e-commerce application, built with Node.js, Express, and MongoDB.

## Dependencies

### Authentication & Security
- `bcryptjs`: Password hashing and verification
- `jsonwebtoken`: JWT authentication implementation

### Core Dependencies
- `cors`: Cross-origin resource sharing middleware
- `dotenv`: Environment variables management
- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling tool
- `morgan`: HTTP request logger middleware
- `razorpay`: Payment gateway integration
- `validator`: Input validation and sanitization

### Development Dependencies
- `nodemon`: Development server with auto-reload

## Available Scripts

- `npm start`: Runs the server in production mode
- `npm run dev`: Runs the server in development mode with auto-reload
- `npm run seed`: Seeds the database with initial data

## Requirements

- Node.js >= 14.0.0
- MongoDB database

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