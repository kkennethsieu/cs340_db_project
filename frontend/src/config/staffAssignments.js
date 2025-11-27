export const staffAssignmentColumns = [
	{ header: "Assignment ID", accessor: "staffAssignmentID" },
	{ header: "Festival Name", accessor: "festivalName" },
	{ header: "Staff Name", accessor: "staffName" },
	{ header: "Role", accessor: "role" },
	{ header: "Hourly Rate", accessor: "hourlyRate", type: "currency" },
	{ header: "Assigned Date", accessor: "assignedDate", type: "date" },
	{ header: "Hours Worked", accessor: "hoursWorked" },
	{ header: "Shift Notes", accessor: "shiftNotes" },
];

export const staffAssignmentFields = (staff, festivals) => [
	{
		name: "staffID",
		label: "Staff",
		options: staff.map((s) => ({
			value: s.staffID,
			label: s.staffName,
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
		name: "assignedDate",
		label: "Assigned Date",
		type: "date",
		required: true,
	},
	{
		name: "hoursWorked",
		label: "Hours Worked",
		type: "number",
		step: "0.01",
		placeholder: "Enter hours worked",
	},
	{
		name: "shiftNotes",
		label: "Shift Notes",
		type: "textarea",
		placeholder: "Enter shift notes",
	},
];
