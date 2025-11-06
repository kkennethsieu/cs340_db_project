const express = require("express");
const {
	getVendorAssignmentsForFestival,
	createVendorAssignment,
	updateVendorAssignment,
	deleteVendorAssignment,
} = require("../../controllers/vendors.controller.js");

const router = express.Router({ mergeParams: true });

// GET all vendor assignments for a festival
router.get("/", getVendorAssignmentsForFestival);

// POST create a new vendor assignment
router.post("/", createVendorAssignment);

// PUT update a vendor assignment by ID
router.put("/:vendorID", updateVendorAssignment);

// DELETE a vendor assignment by ID
router.delete("/:vendorID", deleteVendorAssignment);

module.exports = router;
