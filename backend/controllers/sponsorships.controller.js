const getSponsorshipsForFestival = (req, res) => {
	const { id } = req.params;
	res.send(`Get all sponsorships for festival ID: ${id}`);
};

const createSponsorship = (req, res) => {
	const { id } = req.params;
	res.send(`Create a new sponsorship for festival ID: ${id}`);
};

const updateSponsorship = (req, res) => {
	const { festivalId, sponsorId } = req.params;
	res.send(`Update sponsorship ${sponsorId} for festival ${festivalId}`);
};

const deleteSponsorship = (req, res) => {
	const { festivalId, sponsorId } = req.params;
	res.send(`Delete sponsorship ${sponsorId} for festival ${festivalId}`);
};

module.exports = {
	getSponsorshipsForFestival,
	createSponsorship,
	updateSponsorship,
	deleteSponsorship,
};
