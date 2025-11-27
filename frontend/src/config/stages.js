export const stageColumns = [
	{ header: "Stage ID", accessor: "stageID" },
	{ header: "Festival Name", accessor: "festivalName" },
	{ header: "Stage Name", accessor: "stageName" },
	{ header: "Capacity", accessor: "capacity", type: "number" },
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
		required: true,
	},
	{
		name: "stageName",
		label: "Stage Name",
		placeholder: "Enter stage name",
		required: true,
	},
	{
		name: "capacity",
		label: "Capacity",
		type: "number",
		placeholder: "Enter capacity",
		required: true,
	},
	{
		name: "stageType",
		label: "Stage Type",
		placeholder: "Enter stage type",
		required: true,
	},
	{
		name: "locationDescription",
		label: "Location Description",
		placeholder: "Describe location",
		required: true,
	},
	{
		name: "hasCover",
		label: "Has Cover",
		type: "checkbox",
		defaultValue: false,
	},
];
