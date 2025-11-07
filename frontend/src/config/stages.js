export const stageColumns = [
	{ header: "Stage ID", accessor: "stageID" },
	{ header: "Festival Name", accessor: "festivalName" },
	{ header: "Stage Name", accessor: "stageName" },
	{ header: "Capacity", accessor: "capacity" },
	{ header: "Stage Type", accessor: "stageType" },
	{ header: "Location Description", accessor: "locationDescription" },
	{ header: "Has Cover", accessor: "hasCover" },
];

export const stageFields = (festivals) => [
	{
		name: "festivalID",
		label: "Festival",
		options: festivals.map((f) => ({
			value: f.festivalID,
			label: f.festivalName,
		})),
	},
	{ name: "stageName", label: "Stage Name", placeholder: "Enter stage name" },
	{
		name: "capacity",
		label: "Capacity",
		type: "number",
		placeholder: "Enter capacity",
	},
	{ name: "stageType", label: "Stage Type", placeholder: "Enter stage type" },
	{
		name: "locationDescription",
		label: "Location Description",
		placeholder: "Describe location",
	},
	{ name: "hasCover", label: "Has Cover", type: "checkbox" },
];
