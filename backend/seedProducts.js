const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const demoProducts = [
  {
    name: 'Organic Tomatoes',
    description: 'Fresh, juicy organic tomatoes grown in our farm. Perfect for salads and cooking.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 50,
    category: 'Vegetables'
  },
  {
    name: 'Fresh Spinach',
    description: 'Nutrient-rich spinach leaves, hand-picked and packed fresh.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1576045057995-568f288f82b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 30,
    category: 'Leafy Greens'
  },
  {
    name: 'Organic Carrots',
    description: 'Sweet and crunchy organic carrots, rich in beta-carotene.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1447175008436-054170c2e979?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 40,
    category: 'Root Vegetables'
  },
  {
    name: 'Fresh Strawberries',
    description: 'Sweet and juicy strawberries, perfect for desserts and smoothies.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 25,
    category: 'Fruits'
  },
  {
    name: 'Organic Potatoes',
    description: 'Fresh organic potatoes, great for all types of cooking.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 60,
    category: 'Root Vegetables'
  },
  {
    name: 'Fresh Basil',
    description: 'Aromatic fresh basil leaves, perfect for Italian dishes.',
    price: 30,
    image: 'https://images.unsplash.com/photo-1576045057995-568f288f82b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    stock: 20,
    category: 'Herbs'
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert demo products
    await Product.insertMany(demoProducts);
    console.log('Successfully seeded products');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 