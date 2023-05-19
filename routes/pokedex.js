const express = require("express");
const router = express.Router();

// Require controller modules.
const pokemon_controller = require("../controllers/pokemonController");
const region_controller = require("../controllers/regionController");
const type_controller = require("../controllers/typeController");

/// POKEMON ROUTES ///

// GET catalog home page.
router.get("/", pokemon_controller.index);

// GET request for creating a Pokemon. NOTE This must come before routes that display Pokemon (uses id).
router.get("/pokemon/create", pokemon_controller.pokemon_create_get);

// POST request for creating Pokemon.
router.post("/pokemon/create", pokemon_controller.pokemon_create_post);

// GET request to delete Pokemon.
router.get("/pokemon/:id/delete", pokemon_controller.pokemon_delete_get);

// POST request to delete Pokemon.
router.post("/pokemon/:id/delete", pokemon_controller.pokemon_delete_post);

// GET request to update Pokemon.
router.get("/pokemon/:id/update", pokemon_controller.pokemon_update_get);

// POST request to update Pokemon.
router.post("/pokemon/:id/update", pokemon_controller.pokemon_update_post);

// GET request for one Pokemon.
router.get("/pokemon/:id", pokemon_controller.pokemon_detail);

// GET request for list of all Pokemon items.
router.get("/pokemon", pokemon_controller.pokemon_list);

/// REGION ROUTES ///

// GET request for creating Region. NOTE This must come before route for id (i.e. display region).
router.get("/region/create", region_controller.region_create_get);

// POST request for creating Region.
router.post("/region/create", region_controller.region_create_post);

// GET request to delete Region.
router.get("/region/:id/delete", region_controller.region_delete_get);

// POST request to delete Region.
router.post("/region/:id/delete", region_controller.region_delete_post);

// GET request to update Region.
router.get("/region/:id/update", region_controller.region_update_get);

// POST request to update Region.
router.post("/region/:id/update", region_controller.region_update_post);

// GET request for one Region.
router.get("/region/:id", region_controller.region_detail);

// GET request for list of all Regions.
router.get("/regions", region_controller.region_list);

/// TYPE ROUTES ///

// GET request for creating Type. NOTE This must come before route for id (i.e. display type).
router.get("/type/create", type_controller.type_create_get);

// POST request for creating Type.
router.post("/type/create", type_controller.type_create_post);

// GET request to delete Type.
router.get("/type/:id/delete", type_controller.type_delete_get);

// POST request to delete Type.
router.post("/type/:id/delete", type_controller.type_delete_post);

// GET request to update Type.
router.get("/type/:id/update", type_controller.type_update_get);

// POST request to update Type.
router.post("/type/:id/update", type_controller.type_update_post);

// GET request for one Type.
router.get("/type/:id", type_controller.type_detail);

// GET request for list of all Types.
router.get("/types", type_controller.type_list);

module.exports = router;
