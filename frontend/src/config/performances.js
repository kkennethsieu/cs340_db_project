export const performanceColumns = [
	{ header: "Performance ID", accessor: "performanceID" },
	{ header: "Artist Name", accessor: "artistName" },
	{ header: "Stage Name", accessor: "stageName" },
	{ header: "Festival", accessor: "festivalName" },
	{ header: "Performance Date", accessor: "performanceDate" },
	{ header: "Start Time", accessor: "startTime" },
	{ header: "End Time", accessor: "endTime" },
	{ header: "Setup Notes", accessor: "setupNotes" },
	{ header: "Soundcheck Time", accessor: "soundcheckTime" },
];

export const performanceFields = (artists, stages) => [
	{
		name: "artistID",
		label: "Artist Name",
		options: artists.map((a) => ({
			value: a.artistID,
			label: a.artistName,
		})),
	},
	{
		name: "stageID",
		label: "Stage Name",
		options: stages.map((s) => ({
			value: s.stageID,
			label: s.stageName,
		})),
	},

	{ name: "performanceDate", label: "Performance Date", type: "date" },
	{ name: "startTime", label: "Start Time", type: "time" },
	{ name: "endTime", label: "End Time", type: "time" },
	{
		name: "setupNotes",
		label: "Setup Notes",
		type: "textarea",
		placeholder: "Enter setup notes",
	},
	{ name: "soundcheckTime", label: "Soundcheck Time", type: "time" },
];
