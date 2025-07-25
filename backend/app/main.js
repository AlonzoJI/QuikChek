const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'QuikChek Backend is running!' });
});

// Import routes
// app.use('/api/news', require('../routes/news'));
// app.use('/api/verify', require('../routes/verify'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
