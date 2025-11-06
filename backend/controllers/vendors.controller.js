const getVendors = (req, res) => {
	res.send("Get all vendors");
};

const createVendor = (req, res) => {
	res.send("Create a new vendor");
};

const updateVendor = (req, res) => {
	const { id } = req.params;
	res.send(`Update vendor with ID: ${id}`);
};

const deleteVendor = (req, res) => {
	const { id } = req.params;
	res.send(`Delete vendor with ID: ${id}`);
};

module.exports = {
	getVendors,
	createVendor,
	updateVendor,
	deleteVendor,
};
