export const vendorAssignmentColumns = [
	{ header: "Assignment ID", accessor: "assignmentID" },
	{ header: "Festival", accessor: "festivalName" },

	{ header: "Vendor Name", accessor: "vendorName" },
	{ header: "Vendor Type", accessor: "vendorType" },
	{ header: "Booth Number", accessor: "boothNumber" },
	{ header: "Registration Fee", accessor: "registrationFee" },
	{ header: "Assignment Date", accessor: "assignmentDate" },
];

export const vendorAssignmentFields = (vendors, festivals) => [
	{
		name: "vendorID",
		label: "Vendor",
		options: vendors.map((v) => ({
			value: v.vendorID,
			label: v.vendorName,
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
		name: "boothNumber",
		label: "Booth Number",
		placeholder: "Enter booth number",
	},
	{
		name: "registrationFee",
		label: "Registration Fee",
		type: "number",
		step: "0.01",
		placeholder: "Enter fee",
	},
	{ name: "assignmentDate", label: "Assignment Date", type: "date" },
];
