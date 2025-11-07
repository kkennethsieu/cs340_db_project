export const sponsorshipColumns = [
	{ header: "Sponsorship ID", accessor: "sponsorshipID" },
	{ header: "Sponsor Name", accessor: "sponsorName" },
	{ header: "Sponsor Industry", accessor: "industry" },
	{ header: "Festival Name", accessor: "festivalName" },
	{ header: "Amount", accessor: "sponsorshipAmount" },
	{ header: "Tier", accessor: "sponsorshipTier" },
	{ header: "Contract Date", accessor: "contractDate" },
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
	},
	{
		name: "festivalID",
		label: "Festival",
		options: festivals.map((f) => ({
			value: f.festivalID,
			label: f.festivalName,
		})),
	},

	{
		name: "sponsorshipAmount",
		label: "Sponsorship Amount",
		type: "number",
		step: "0.01",
		placeholder: "Enter amount",
	},
	{
		name: "sponsorshipTier",
		label: "Sponsorship Tier",
		placeholder: "Gold, Silver, Bronze, etc.",
	},
	{ name: "contractDate", label: "Contract Date", type: "date" },
	{
		name: "benefits",
		label: "Benefits",
		type: "textarea",
		placeholder: "Describe sponsor perks",
	},
];
