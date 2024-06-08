const axios = require('axios');
const Pokemon = require('../models/pokemon');

// Fetch and save a Pokémon by name
const getPokemon = async (req, res) => {
  try {
    const { name } = req.params;

    // Check if the Pokémon already exists in the database by name
    const existingPokemon = await Pokemon.findOne({ name });
    if (existingPokemon) {
      return res.status(200).send(existingPokemon);
    }

    // Fetch Pokémon data from PokeAPI
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const { id, moves, types } = response.data;

    // Additional check to see if Pokémon with this ID already exists
    const existingPokemonById = await Pokemon.findOne({ id });
    if (existingPokemonById) {
      return res.status(200).send(existingPokemonById);
    }

    // Create a new Pokémon document
    const pokemon = new Pokemon({
      id,
      name: response.data.name,
      moves: moves.slice(0, 4).map(move => move.move.name),
      types: types.map(type => type.type.name)
    });

    // Save the Pokémon to the database
    await pokemon.save();
    res.status(201).send(pokemon);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch and save Pokemon data', details: error.message });
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
  getPokemon,
  deletePokemonById,
  deletePokemonByName,
  listPokemons,
  getPokemonById
};
