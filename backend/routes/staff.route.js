const express = require("express");
const {
	getStaff,
	createStaff,
	updateStaff,
	deleteStaff,
} = require("./staff.controller.js");

const router = express.Router();

// GET all staff
router.get("/", getStaff);

// POST create a new staff member
router.post("/", createStaff);

// PUT update an existing staff member by ID
router.put("/:id", updateStaff);

// DELETE remove a staff member by ID
router.delete("/:id", deleteStaff);

module.exports = router;
