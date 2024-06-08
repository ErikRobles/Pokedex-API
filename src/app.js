const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pokemonRoutes = require('./routes/pokemonRoutes'); // Ensure the routes are imported

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Use the Pokemon routes
app.use('/api', pokemonRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Pokedex API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
