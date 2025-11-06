const express = require("express");
const {
	getSponsorshipsForFestival,
	createSponsorship,
	updateSponsorship,
	deleteSponsorship,
} = require("../../controllers/sponsorships.controller");

const router = express.Router({ mergeParams: true });

// GET all sponsorships for a festival
router.get("/", getSponsorshipsForFestival);

// POST create a new sponsorship
router.post("/", createSponsorship);

// PUT update a sponsorship by ID
router.put("/:sponsorshipID", updateSponsorship);

// DELETE a sponsorship by ID
router.delete("/:sponsorshipID", deleteSponsorship);

module.exports = router;
