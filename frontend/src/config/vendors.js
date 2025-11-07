export const vendorColumns = [
	{ header: "Vendor ID", accessor: "vendorID" },
	{ header: "Vendor Name", accessor: "vendorName" },
	{ header: "Contact Email", accessor: "contactEmail" },
	{ header: "Contact Phone", accessor: "contactPhone" },
	{ header: "Vendor Type", accessor: "vendorType" },
	{ header: "Business License", accessor: "businessLicense" },
];

export const vendorFields = [
	{
		name: "vendorName",
		label: "Vendor Name",
		placeholder: "Enter vendor name",
	},
	{
		name: "contactEmail",
		label: "Contact Email",
		type: "email",
		placeholder: "Enter email",
	},
	{
		name: "contactPhone",
		label: "Contact Phone",
		placeholder: "Enter phone number",
	},
	{
		name: "vendorType",
		label: "Vendor Type",
		placeholder: "Enter vendor type",
	},
	{
		name: "businessLicense",
		label: "Business License",
		placeholder: "Enter business license",
	},
];
