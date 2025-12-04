export const artistColumns = [
  { header: "Artist ID", accessor: "artistID" },
  { header: "Artist Name", accessor: "artistName" },
  { header: "Genre", accessor: "genre" },
  { header: "Booking Fee", accessor: "bookingFee", type: "number" },
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
    required: true,
  },
  { name: "genre", label: "Genre", placeholder: "Enter genre", required: true },
  {
    name: "bookingFee",
    label: "Booking Fee",
    type: "number",
    placeholder: "Enter booking fee",
    required: true,
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    type: "email",
    placeholder: "Enter email",
    required: true,
  },
  {
    name: "contactPhone",
    label: "Contact Phone",
    placeholder: "Enter number",
    required: true,
  },
  {
    name: "country",
    label: "Country",
    placeholder: "Enter country",
    required: true,
  },
  { name: "websiteURL", label: "Website", placeholder: "Enter website" },
];
