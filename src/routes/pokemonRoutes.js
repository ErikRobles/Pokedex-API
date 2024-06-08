const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

// Define routes
router.get('/pokemon/:name', pokemonController.getPokemon);
router.get('/pokemon/id/:id', pokemonController.getPokemonById);
router.delete('/pokemon/id/:id', pokemonController.deletePokemonById);
router.delete('/pokemon/name/:name', pokemonController.deletePokemonByName);
router.get('/pokemons', pokemonController.listPokemons);

module.exports = router;
