const getStagesForFestival = (req, res) => {
	const { id } = req.params;
	res.send(`Get all stages for festival ID: ${id}`);
};

const createStage = (req, res) => {
	const { id } = req.params;
	res.send(`Create a new stage for festival ID: ${id}`);
};

const updateStage = (req, res) => {
	const { festivalId, stageId } = req.params;
	res.send(`Update stage ${stageId} for festival ${festivalId}`);
};

const deleteStage = (req, res) => {
	const { festivalId, stageId } = req.params;
	res.send(`Delete stage ${stageId} for festival ${festivalId}`);
};

module.exports = {
	getStagesForFestival,
	createStage,
	updateStage,
	deleteStage,
};
