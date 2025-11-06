const getArtists = (req, res) => {
	res.send("Get all artists");
};

const createArtist = (req, res) => {
	res.send("Create a new artist");
};

const updateArtist = (req, res) => {
	const { id } = req.params;
	res.send(`Update artist with ID: ${id}`);
};

const deleteArtist = (req, res) => {
	const { id } = req.params;
	res.send(`Delete artist with ID: ${id}`);
};

module.exports = {
	getArtists,
	createArtist,
	updateArtist,
	deleteArtist,
};
