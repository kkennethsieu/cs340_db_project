export const sponsorshipColumns = [
	{ header: "Sponsorship ID", accessor: "sponsorshipID" },
	{ header: "Sponsor Name", accessor: "sponsorName" },
	{ header: "Sponsor Industry", accessor: "industry" },
	{ header: "Festival Name", accessor: "festivalName" },
	{ header: "Amount", accessor: "sponsorshipAmount", type: "number" },
	{ header: "Tier", accessor: "sponsorshipTier" },
	{ header: "Contract Date", accessor: "contractDate", type: "date" },
	{ header: "Benefits", accessor: "benefits" },
];

export const sponsorshipFields = (sponsors, festivals) => [
	{
		name: "sponsorID",
		label: "Sponsor",
		options: sponsors.map((s) => ({
			value: s.sponsorID,
			label: s.sponsorName,
		})),
		required: true,
	},
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
		name: "sponsorshipAmount",
		label: "Sponsorship Amount",
		type: "number",
		step: "0.01",
		placeholder: "Enter amount",
		required: true,
	},
	{
		name: "sponsorshipTier",
		label: "Sponsorship Tier",
		placeholder: "Gold, Silver, Bronze, etc.",
		required: true,
	},
	{
		name: "contractDate",
		label: "Contract Date",
		type: "date",
		required: true,
	},
	{
		name: "benefits",
		label: "Benefits",
		type: "textarea",
		placeholder: "Describe sponsor perks",
	},
];
