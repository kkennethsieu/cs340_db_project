export const staffColumns = [
	{ header: "Staff ID", accessor: "staffID" },
	{ header: "First Name", accessor: "firstName" },
	{ header: "Last Name", accessor: "lastName" },
	{ header: "Email", accessor: "email" },
	{ header: "Phone", accessor: "phone" },
	{ header: "Role", accessor: "role" },
	{ header: "Hourly Rate", accessor: "hourlyRate" },
];

export const staffFields = [
	{ name: "firstName", label: "First Name", placeholder: "Enter first name" },
	{ name: "lastName", label: "Last Name", placeholder: "Enter last name" },
	{
		name: "email",
		label: "Email",
		type: "email",
		placeholder: "Enter email",
	},
	{
		name: "phone",
		label: "Phone",
		type: "text",
		placeholder: "Enter phone number",
	},
	{ name: "role", label: "Role", placeholder: "Enter staff role" },
	{
		name: "hourlyRate",
		label: "Hourly Rate",
		type: "number",
		placeholder: "Enter hourly rate",
	},
];
