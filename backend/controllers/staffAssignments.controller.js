const getStaffAssignmentsForFestival = (req, res) => {
	const { id } = req.params;
	res.send(`Get all staff assignments for festival ID: ${id}`);
};

const createStaffAssignment = (req, res) => {
	const { id } = req.params;
	res.send(`Create a new staff assignment for festival ID: ${id}`);
};

const updateStaffAssignment = (req, res) => {
	const { festivalId, staffId } = req.params;
	res.send(`Update staff assignment ${staffId} for festival ${festivalId}`);
};

const deleteStaffAssignment = (req, res) => {
	const { festivalId, staffId } = req.params;
	res.send(`Delete staff assignment ${staffId} for festival ${festivalId}`);
};

module.exports = {
	getStaffAssignmentsForFestival,
	createStaffAssignment,
	updateStaffAssignment,
	deleteStaffAssignment,
};
