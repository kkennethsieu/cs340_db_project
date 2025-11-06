const express = require("express");
const {
	getStagesForFestival,
	createStage,
	updateStage,
	deleteStage,
} = require("../../controllers/stages.controller.js");

const router = express.Router({ mergeParams: true });

// GET all stages for a festival
router.get("/", getStagesForFestival);

// POST create a new stage
router.post("/", createStage);

// PUT update a stage by ID
router.put("/:stageID", updateStage);

// DELETE a stage by ID
router.delete("/:stageID", deleteStage);

module.exports = router;
