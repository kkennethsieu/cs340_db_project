const getStaff = (req, res) => {
	res.send("Get all staff members");
};

const createStaff = (req, res) => {
	res.send("Create a new staff member");
};

const updateStaff = (req, res) => {
	const { id } = req.params;
	res.send(`Update staff member with ID: ${id}`);
};

const deleteStaff = (req, res) => {
	const { id } = req.params;
	res.send(`Delete staff member with ID: ${id}`);
};

module.exports = {
	getStaff,
	createStaff,
	updateStaff,
	deleteStaff,
};
