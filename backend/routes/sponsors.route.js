const express = require("express");
const {
	getSponsors,
	createSponsor,
	updateSponsor,
	deleteSponsor,
} = require("./sponsors.controller.js");

const router = express.Router();

// get all sponsors
router.get("/", getSponsors);

// created new sponsors
router.post("/", createSponsor);

// update an exisitng sponsor
router.put("/:id", updateSponsor);

// delete existing sponsor
router.delete("/:id", deleteSponsor);

module.exports = router;
