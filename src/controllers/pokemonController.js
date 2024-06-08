const axios = require('axios');
const Pokemon = require('../models/pokemon');

// Fetch and save a Pokémon by name
const fetchAndSavePokemon = async (req, res) => {
  const pokemonName = req.params.name.toLowerCase();
  const pokeApiUrl = process.env.POKEAPI_URL;

  try {
      const response = await axios.get(`${pokeApiUrl}${pokemonName}`);
      const { id, name, moves, types } = response.data;

      // Extract the first 4 moves
      const pokemonMoves = moves.slice(0, 4).map(move => move.move.name);

      // Extract types
      const pokemonTypes = types.map(type => type.type.name);

      // Create a new Pokémon instance
      const newPokemon = new Pokemon({
          id,
          name,
          moves: pokemonMoves,
          types: pokemonTypes,
      });

      // Save to the database
      await newPokemon.save();

      res.status(201).send(newPokemon);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
};

// Fetch a Pokémon by ID
const getPokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pokemon.findOne({ id });
    if (!result) {
      return res.status(404).send({ error: 'Pokemon not found' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to find Pokemon' });
  }
};

// Delete a Pokémon by ID
const deletePokemonById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Pokemon.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Pokemon not found' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete Pokemon' });
  }
};

// Delete a Pokémon by name
const deletePokemonByName = async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Pokemon.deleteOne({ name });
    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'Pokemon not found' });
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete Pokemon' });
  }
};

// List all Pokémon in the database
const listPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    if (pokemons.length === 0) {
      return res.status(404).send({ error: 'No Pokémon found' });
    }
    res.status(200).send(pokemons);
  } catch (error) {
    res.status(500).send({ error: 'Failed to list Pokemons' });
  }
};

module.exports = {
  fetchAndSavePokemon,
  deletePokemonById,
  deletePokemonByName,
  listPokemons,
  getPokemonById
};
