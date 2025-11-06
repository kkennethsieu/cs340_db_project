const express = require("express");
const {
	getStaffAssignmentsForFestival,
	createStaffAssignment,
	updateStaffAssignment,
	deleteStaffAssignment,
} = require("../../controllers/staff.controller.js");

const router = express.Router({ mergeParams: true });

// GET all staff assignments for a festival
router.get("/", getStaffAssignmentsForFestival);

// POST create a new staff assignment
router.post("/", createStaffAssignment);

// PUT update a staff assignment by ID
router.put("/:staffID", updateStaffAssignment);

// DELETE a staff assignment by ID
router.delete("/:staffID", deleteStaffAssignment);

module.exports = router;
