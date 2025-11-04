import { useState } from "react";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import Table from "../components/Table";
import AddEditModal from "../components/AddEditModal";

const fakeSponsors = [
	{
		sponsorID: 1,
		sponsorName: "Red Bull",
		industry: "Beverages",
		contactEmail: "contact@redbull.com",
		contactPhone: "+1 800 555 1234",
		websiteURL: "https://www.redbull.com",
	},
	{
		sponsorID: 2,
		sponsorName: "Nike",
		industry: "Sportswear",
		contactEmail: "info@nike.com",
		contactPhone: "+1 800 555 5678",
		websiteURL: "https://www.nike.com",
	},
	{
		sponsorID: 3,
		sponsorName: "Spotify",
		industry: "Music Streaming",
		contactEmail: "support@spotify.com",
		contactPhone: "+1 800 555 9012",
		websiteURL: "https://www.spotify.com",
	},
	{
		sponsorID: 4,
		sponsorName: "Coca-Cola",
		industry: "Beverages",
		contactEmail: "contact@coca-cola.com",
		contactPhone: "+1 800 555 3456",
		websiteURL: "https://www.coca-cola.com",
	},
];

function SponsorsPage() {
	const columns = [
		{ header: "ID", accessor: "sponsorID" },
		{ header: "Sponsor Name", accessor: "sponsorName" },
		{ header: "Industry", accessor: "industry" },
		{ header: "Contact Email", accessor: "contactEmail" },
		{ header: "Contact Phone", accessor: "contactPhone" },
		{ header: "Website", accessor: "websiteURL" },
	];

	const fields = [
		{
			name: "sponsorName",
			label: "Sponsor Name",
			placeholder: "Enter sponsor name",
		},
		{ name: "industry", label: "Industry", placeholder: "Enter industry" },
		{
			name: "contactEmail",
			label: "Contact Email",
			type: "email",
			placeholder: "Enter contact email",
		},
		{
			name: "contactPhone",
			label: "Contact Phone",
			type: "text",
			placeholder: "Enter contact phone",
		},
		{
			name: "websiteURL",
			label: "Website URL",
			type: "url",
			placeholder: "Enter website URL (optional)",
		},
	];

	const [sponsors, setSponsors] = useState(fakeSponsors);

	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedSponsors, setSelectedSponsors] = useState(null);
	const [sponsorToDelete, setSponsorToDelete] = useState(null);

	// THIS DELETES ARTIST
	const handleDeleteClick = (sponsor) => {
		setSponsorToDelete(sponsor);
		setOpenDeleteModal(true);
	};

	const confirmDelete = () => {
		if (sponsorToDelete) {
			setSponsors((prev) =>
				prev.filter((a) => a.sponsorID !== sponsorToDelete.sponsorID)
			);
			setSponsorToDelete(null);
			setOpenDeleteModal(false);
		}
	};
	// THIS ADDS ARTIST
	const handleAdd = (sponsor) => {
		if (selectedSponsors) {
			// Editing
			setSponsors((prev) =>
				prev.map((a) => (a.sponsorID === sponsor.sponsorID ? sponsor : a))
			);
			setSelectedSponsors(null);
		} else {
			// Adding
			setSponsors((prev) => [...prev, sponsor]);
		}
		setOpenModal(false);
	};

	const handleOpenAdd = () => {
		setSelectedSponsors(null);
		setOpenModal(true);
	};

	// THIS EDITS ARTIST
	const handleEdit = (sponsor) => {
		setSelectedSponsors(sponsor);
		setOpenModal(true);
	};

	return (
		<>
			<div className="p-4">
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl font-bold">Sponsors</h2>
						<p>Here you can track your Sponsors</p>
					</div>
					<div className="flex items-center">
						<Button onClick={() => handleOpenAdd()}>Add New Sponsor</Button>
					</div>
				</div>
				<Table
					columns={columns}
					data={sponsors}
					onDelete={handleDeleteClick}
					onEdit={handleEdit}
				/>
			</div>
			{openModal && (
				<AddEditModal
					fields={fields}
					isOpen={openModal}
					setIsOpen={setOpenModal}
					title={selectedSponsors ? "Edit Sponsor" : "Add Sponsor"}
					onSubmit={handleAdd}
					initialData={selectedSponsors || {}}
				/>
			)}

			{openDeleteModal && (
				<ConfirmationModal
					isOpen={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					onConfirm={confirmDelete}
					title="Delete Artist"
					message={`Are you sure you want to delete ${sponsorToDelete?.sponsorName || ""}?`}
					confirmText="Delete"
					confirmColor="bg-red-500 hover:bg-red-600"
				/>
			)}
		</>
	);
}

export default SponsorsPage;
