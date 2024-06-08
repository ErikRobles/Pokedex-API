# Pokedex API

This is a Node.js application that interacts with the PokeAPI and a MongoDB database to create a Pokedex.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd node-pokedex
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory with the following content:
   ```bash
   MONGODB_URI=mongodb://localhost:27017/pokedex

### Running the Application

Start the server
```bash
npm start
```
The server will be running on http://localhost:3000.

### API Endpoints
 GET Pokémon by Name: Fetch and save a Pokémon by its name.

```http
GET http://localhost:3000/api/pokemon/:name
```
Example:
```http
GET http://localhost:3000/api/pokemon/pikachu
```
GET Pokémon by ID: Fetch a Pokémon by its ID.
```http
GET http://localhost:3000/api/pokemon/id/:id
```
Example:
```http
GET http://localhost:3000/api/pokemon/id/25
```
DELETE Pokémon by ID: Delete a Pokémon by its ID.

```http
DELETE http://localhost:3000/api/pokemon/id/:id
```
Example: 
```http
DELETE http://localhost:3000/api/pokemon/id/25
```
DELETE Pokémon by Name: Delete a Pokémon by its name.
```http
DELETE http://localhost:3000/api/pokemon/name/:name
```
Example:
```http
DELETE http://localhost:3000/api/pokemon/name/pikachu
```
GET All Pokémon: List all saved Pokémon.
```http
GET http://localhost:3000/api/pokemons
```
### Testing

You can use Postman to test the API endpoints.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

