export const sponsorsColumns = [
	{ header: "Sponsor ID", accessor: "sponsorID" },
	{ header: "Sponsor Name", accessor: "sponsorName" },
	{ header: "Industry", accessor: "industry" },
	{ header: "Contact Email", accessor: "contactEmail" },
	{ header: "Contact Phone", accessor: "contactPhone" },
	{ header: "Website", accessor: "websiteURL" },
];

export const sponsorsFields = [
	{
		name: "sponsorName",
		label: "Sponsor Name",
		placeholder: "Enter sponsor name",
	},
	{ name: "industry", label: "Industry", placeholder: "Enter industry" },
	{
		name: "contactEmail",
		label: "Contact Email",
		type: "email",
		placeholder: "Enter contact email",
	},
	{
		name: "contactPhone",
		label: "Contact Phone",
		type: "text",
		placeholder: "Enter contact phone",
	},
	{
		name: "websiteURL",
		label: "Website",
		type: "url",
		placeholder: "Enter website URL (optional)",
	},
];
