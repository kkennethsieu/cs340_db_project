const getVendorAssignmentsForFestival = (req, res) => {
	const { id } = req.params;
	res.send(`Get all vendor assignments for festival ID: ${id}`);
};

const createVendorAssignment = (req, res) => {
	const { id } = req.params;
	res.send(`Create a new vendor assignment for festival ID: ${id}`);
};

const updateVendorAssignment = (req, res) => {
	const { festivalId, vendorId } = req.params;
	res.send(`Update vendor assignment ${vendorId} for festival ${festivalId}`);
};

const deleteVendorAssignment = (req, res) => {
	const { festivalId, vendorId } = req.params;
	res.send(`Delete vendor assignment ${vendorId} for festival ${festivalId}`);
};

module.exports = {
	getVendorAssignmentsForFestival,
	createVendorAssignment,
	updateVendorAssignment,
	deleteVendorAssignment,
};
