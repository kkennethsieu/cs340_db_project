export const festivalColumns = [
	{ header: "Festival ID", accessor: "festivalID" },
	{ header: "Festival Name", accessor: "festivalName" },
	{ header: "Start Date", accessor: "startDate" },
	{ header: "End Date", accessor: "endDate" },
	{ header: "Location", accessor: "location" },
	{ header: "Expected Attendance", accessor: "expectedAttendance" },
	{ header: "Budget", accessor: "budget" },
	{ header: "Ticket Price", accessor: "ticketPrice" },
];

export const festivalFields = [
	{
		name: "festivalName",
		label: "Festival Name",
		placeholder: "Enter festival name",
	},
	{
		name: "startDate",
		label: "Start Date",
		type: "date",
		placeholder: "Select start date",
	},
	{
		name: "endDate",
		label: "End Date",
		type: "date",
		placeholder: "Select end date",
	},
	{ name: "location", label: "Location", placeholder: "Enter location" },
	{
		name: "expectedAttendance",
		label: "Expected Attendance",
		type: "number",
		placeholder: "Enter expected attendance",
	},
	{
		name: "budget",
		label: "Budget",
		type: "number",
		placeholder: "Enter budget",
	},
	{
		name: "ticketPrice",
		label: "Ticket Price",
		type: "number",
		placeholder: "Enter ticket price",
	},
];
