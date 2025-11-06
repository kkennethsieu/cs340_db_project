const express = require("express");
const {
	getPerformancesForFestival,
	createPerformance,
	updatePerformance,
	deletePerformance,
} = require("../../controllers/performances.controller.js");

const router = express.Router({ mergeParams: true });

// GET all performances for a festival
router.get("/", getPerformancesForFestival);

// POST create a new performance
router.post("/", createPerformance);

// PUT update a performance by ID
router.put("/:performanceID", updatePerformance);

// DELETE a performance by ID
router.delete("/:performanceID", deletePerformance);

module.exports = router;
