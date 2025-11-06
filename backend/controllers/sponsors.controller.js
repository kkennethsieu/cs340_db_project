const getSponsors = (req, res) => {
	res.send("Get all sponsors");
};

const createSponsor = (req, res) => {
	res.send("Create a new sponsor");
};

const updateSponsor = (req, res) => {
	const { id } = req.params;
	res.send(`Update sponsor with ID: ${id}`);
};

const deleteSponsor = (req, res) => {
	const { id } = req.params;
	res.send(`Delete sponsor with ID: ${id}`);
};

module.exports = {
	getSponsors,
	createSponsor,
	updateSponsor,
	deleteSponsor,
};
