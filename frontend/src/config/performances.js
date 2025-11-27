export const performanceColumns = [
	{ header: "Performance ID", accessor: "performanceID" },
	{ header: "Artist Name", accessor: "artistName" },
	{ header: "Stage Name", accessor: "stageName" },
	{ header: "Festival", accessor: "festivalName" },
	{ header: "Performance Date", accessor: "performanceDate", type: "date" },
	{ header: "Start Time", accessor: "startTime", type: "time" },
	{ header: "End Time", accessor: "endTime", type: "time" },
	{ header: "Setup Notes", accessor: "setupNotes" },
	{ header: "Soundcheck Time", accessor: "soundcheckTime", type: "time" },
];

export const performanceFields = (artists, stages) => [
	{
		name: "artistID",
		label: "Artist Name",
		options: artists.map((a) => ({
			value: a.artistID,
			label: a.artistName,
		})),
		required: true,
	},
	{
		name: "stageID",
		label: "Stage Name",
		options: stages.map((s) => ({
			value: s.stageID,
			label: s.stageName,
		})),
		required: true,
	},

	{
		name: "performanceDate",
		label: "Performance Date",
		type: "date",
		required: true,
	},
	{ name: "startTime", label: "Start Time", type: "time", required: true },
	{ name: "endTime", label: "End Time", type: "time", required: true },
	{
		name: "setupNotes",
		label: "Setup Notes",
		type: "textarea",
		placeholder: "Enter setup notes",
	},
	{ name: "soundcheckTime", label: "Soundcheck Time", type: "time" },
];
