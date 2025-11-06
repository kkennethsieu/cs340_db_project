const express = require("express");
const {
	getFestivals,
	getFestivalById,
} = require("../../controllers/festivals.controller");

const stagesRouter = require("./stages.router.js");
const performancesRouter = require("./performances.router.js");
const vendorsRouter = require("./vendors.router.js");
const sponsorsRouter = require("./sponsors.router.js");
const staffRouter = require("./staff.router.js");

const router = express.Router();

//Route to get all festivals
router.get("/", getFestivals);

// Route to get festival by ID
router.get("/:id", getFestivalById);

// Route to get stages for a festival
//Nested Routes for specific ID
router.use("/:id/stages", stagesRouter);
router.use("/:id/performances", performancesRouter);
router.use("/:id/vendor-assignments", vendorsRouter);
router.use("/:id/sponsorships", sponsorsRouter);
router.use("/:id/staff-assignments", staffRouter);

module.exports = router;
