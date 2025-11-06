const express = require("express");
const {
	getVendors,
	createVendor,
	updateVendor,
	deleteVendor,
} = require("./vendors.controller.js");

const router = express.Router();

// get all vendors
router.get("/", getVendors);

// created a new vendor
router.post("/", createVendor);

// update an existing vendor
router.put("/:id", updateVendor);

// delete exisiting vendor
router.delete("/:id", deleteVendor);

module.exports = router;
