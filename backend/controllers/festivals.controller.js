const getFestivals = (req, res) => {
	res.send("All festivals");
};

const getFestivalById = (req, res) => {
	const { id } = req.params;
	res.send(`Festival with ID: ${id}`);
};

module.exports = {
	getFestivals,
	getFestivalById,
};
