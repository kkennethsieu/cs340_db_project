import { useState } from "react";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import Table from "../components/Table";
import AddEditModal from "../components/AddEditModal";

// fakeData.js
const fakeData = [
	{
		id: 1,
		name: "Kenny Sieu",
		genre: "Electronic",
		bookingFee: 2500,
		email: "kenny.sieu@example.com",
		phone: 1234567,
		country: "USA",
		website: "https://kennybeats.com",
	},
	{
		id: 2,
		name: "Alice Johnson",
		genre: "Pop",
		bookingFee: 3000,
		email: "alice.johnson@example.com",
		phone: 5559876543,
		country: "Canada",
		website: "https://alicepop.com",
	},
	{
		id: 3,
		name: "Bob Smith",
		genre: "Rock",
		bookingFee: "$4,200",
		email: "bob.smith@example.com",
		phone: "+44 20 7946 0958",
		country: "UK",
		website: "https://bobrock.com",
	},
	{
		id: 4,
		name: "Jane Doe",
		genre: "Jazz",
		bookingFee: "$3,800",
		email: "jane.doe@example.com",
		phone: "+61 2 9876 5432",
		country: "Australia",
		website: "https://janedoejazz.com",
	},
	{
		id: 5,
		name: "Michael Brown",
		genre: "Hip-Hop",
		bookingFee: "$5,000",
		email: "michael.brown@example.com",
		phone: "+1 (555) 246-8102",
		country: "USA",
		website: "https://mikehiphop.com",
	},
	{
		id: 6,
		name: "Sarah Lee",
		genre: "Country",
		bookingFee: "$2,800",
		email: "sarah.lee@example.com",
		phone: "+1 (555) 135-7913",
		country: "USA",
		website: "https://sarahcountry.com",
	},
	{
		id: 7,
		name: "David Kim",
		genre: "R&B",
		bookingFee: "$3,600",
		email: "david.kim@example.com",
		phone: "+82 10 1234 5678",
		country: "South Korea",
		website: "https://davidrb.com",
	},
	{
		id: 8,
		name: "Emma White",
		genre: "Electronic",
		bookingFee: "$2,900",
		email: "emma.white@example.com",
		phone: "+44 20 7946 1122",
		country: "UK",
		website: "https://emmaelectronica.com",
	},
	{
		id: 9,
		name: "Liam Garcia",
		genre: "Reggae",
		bookingFee: "$3,400",
		email: "liam.garcia@example.com",
		phone: "+1 (555) 777-8888",
		country: "Jamaica",
		website: "https://liamreggae.com",
	},
	{
		id: 10,
		name: "Olivia Martinez",
		genre: "Pop",
		bookingFee: "$4,000",
		email: "olivia.martinez@example.com",
		phone: "+34 91 123 4567",
		country: "Spain",
		website: "https://oliviapop.com",
	},
];

function ArtistsPage() {
	const columns = [
		{ header: "ID", accessor: "id" },
		{ header: "Name", accessor: "name" },
		{ header: "Genre", accessor: "genre" },
		{ header: "Booking Fee", accessor: "bookingFee" },
		{ header: "Email", accessor: "email" },
		{ header: "Phone", accessor: "phone" },
		{ header: "Country", accessor: "country" },
		{ header: "Website", accessor: "website" },
	];

	const fields = [
		{ name: "name", label: "Artist Name", placeholder: "Enter artist name" },
		{ name: "genre", label: "Genre", placeholder: "Enter genre" },
		{
			name: "bookingFee",
			label: "Booking Fee",
			type: "number",
			placeholder: "Enter booking Fee",
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			placeholder: "Enter email",
		},
		{
			name: "phone",
			label: "Phone",
			type: "number",
			placeholder: "Enter phone number",
		},
		{
			name: "country",
			label: "Country",
			placeholder: "Enter country",
		},
		{
			name: "website",
			label: "Website",
			placeholder: "Enter website",
		},
	];

	const [artists, setArtists] = useState(fakeData);

	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedArtist, setSelectedArtist] = useState(null);
	const [artistToDelete, setArtistToDelete] = useState(null);

	// THIS DELETES ARTIST
	const handleDeleteClick = (artist) => {
		setArtistToDelete(artist);
		setOpenDeleteModal(true);
	};

	const confirmDelete = () => {
		if (artistToDelete) {
			setArtists((prev) => prev.filter((a) => a.id !== artistToDelete.id));
			setArtistToDelete(null);
			setOpenDeleteModal(false);
		}
	};
	// THIS ADDS ARTIST
	const handleAdd = (artist) => {
		if (selectedArtist) {
			// Editing
			setArtists((prev) => prev.map((a) => (a.id === artist.id ? artist : a)));
			setSelectedArtist(null);
		} else {
			// Adding
			setArtists((prev) => [...prev, artist]);
		}
		setOpenModal(false);
	};

	const handleOpenAdd = () => {
		setSelectedArtist(null);
		setOpenModal(true);
	};

	// THIS EDITS ARTIST
	const handleEdit = (artist) => {
		setSelectedArtist(artist);
		setOpenModal(true);
	};

	return (
		<>
			<div className="p-4">
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl font-bold">Artists</h2>
						<p>Here you can track your artists</p>
					</div>
					<div className="flex items-center">
						<Button onClick={() => handleOpenAdd()}>Add New Artist</Button>
					</div>
				</div>
				<Table
					columns={columns}
					data={artists}
					onDelete={handleDeleteClick}
					onEdit={handleEdit}
				/>
			</div>
			{openModal && (
				<AddEditModal
					fields={fields}
					isOpen={openModal}
					setIsOpen={setOpenModal}
					title={selectedArtist ? "Edit Artist" : "Add Artist"}
					onSubmit={handleAdd}
					initialData={selectedArtist || {}}
				/>
			)}

			{openDeleteModal && (
				<ConfirmationModal
					isOpen={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					onConfirm={confirmDelete}
					title="Delete Artist"
					message={`Are you sure you want to delete ${artistToDelete?.name || ""}?`}
					confirmText="Delete"
					confirmColor="bg-red-500 hover:bg-red-600"
				/>
			)}
		</>
	);
}

export default ArtistsPage;
