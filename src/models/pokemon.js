const mongoose = require('mongoose');

const PokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  moves: {
    type: [String],
    required: true
  },
  types: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
