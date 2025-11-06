const express = require("express");
const {
	getArtists,
	createArtist,
	updateArtist,
	deleteArtist,
} = require("./artists.controller.js");

const router = express.Router();

// GET all artists
router.get("/", getArtists);

// POST create a new artist
router.post("/", createArtist);

// PUT update an existing artist by ID
router.put("/:id", updateArtist);

// DELETE remove an artist by ID
router.delete("/:id", deleteArtist);

module.exports = router;
