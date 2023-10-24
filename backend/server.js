const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware for parsing JSON bodies
app.use(express.json());


app.post('/api/messages', (req, res) => {
  const message = req.body;
  
  res.json({ status: 'success', message });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
