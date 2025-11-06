const getPerformancesForFestival = (req, res) => {
	const { id } = req.params;
	res.send(`Get all performances for festival ID: ${id}`);
};

const createPerformance = (req, res) => {
	const { id } = req.params;
	res.send(`Create a new performance for festival ID: ${id}`);
};

const updatePerformance = (req, res) => {
	const { festivalId, performanceId } = req.params;
	res.send(`Update performance ${performanceId} for festival ${festivalId}`);
};

const deletePerformance = (req, res) => {
	const { festivalId, performanceId } = req.params;
	res.send(`Delete performance ${performanceId} for festival ${festivalId}`);
};

module.exports = {
	getPerformancesForFestival,
	createPerformance,
	updatePerformance,
	deletePerformance,
};
