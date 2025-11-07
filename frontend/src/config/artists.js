export const artistColumns = [
	{ header: "Artist ID", accessor: "artistID" },
	{ header: "Artist Name", accessor: "artistName" },
	{ header: "Genre", accessor: "genre" },
	{ header: "Booking Fee", accessor: "bookingFee" },
	{ header: "Contact Email", accessor: "contactEmail" },
	{ header: "Contact Phone", accessor: "contactPhone" },
	{ header: "Country", accessor: "country" },
	{ header: "Website", accessor: "websiteURL" },
];

export const artistFields = [
	{
		name: "artistName",
		label: "Artist Name",
		placeholder: "Enter artist name",
	},
	{ name: "genre", label: "Genre", placeholder: "Enter genre" },
	{
		name: "bookingFee",
		label: "Booking Fee",
		type: "number",
		placeholder: "Enter booking fee",
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
		placeholder: "Enter number",
	},
	{ name: "country", label: "Country", placeholder: "Enter country" },
	{ name: "websiteURL", label: "Website", placeholder: "Enter website" },
];
