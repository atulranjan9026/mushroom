const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const demoMushrooms = [
  {
    name: 'Button Mushrooms',
    description: 'Fresh, white button mushrooms with a mild flavor. Perfect for salads, soups, and stir-fries.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 30,
    category: 'Mushrooms'
  },
  {
    name: 'Oyster Mushrooms',
    description: 'Delicate oyster mushrooms with a subtle seafood-like flavor. Great for Asian dishes and stir-fries.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1576045057995-568f288f82b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 25,
    category: 'Mushrooms'
  },
  {
    name: 'Shiitake Mushrooms',
    description: 'Meaty shiitake mushrooms with a rich, umami flavor. Excellent for soups and Asian cuisine.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 20,
    category: 'Mushrooms'
  },
  {
    name: 'Portobello Mushrooms',
    description: 'Large, meaty portobello mushrooms. Perfect for grilling and as a meat substitute.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 15,
    category: 'Mushrooms'
  },
  {
    name: 'Crimini Mushrooms',
    description: 'Brown crimini mushrooms with a deeper flavor than white buttons. Great for all types of cooking.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 35,
    category: 'Mushrooms'
  }
];

const seedMushrooms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing mushroom products
    await Product.deleteMany({ category: 'Mushrooms' });
    console.log('Cleared existing mushroom products');

    // Insert demo mushrooms
    await Product.insertMany(demoMushrooms);
    console.log('Successfully seeded mushroom products');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding mushrooms:', error);
    process.exit(1);
  }
};

seedMushrooms(); 