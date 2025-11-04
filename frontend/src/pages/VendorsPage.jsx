import { useState } from "react";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import Table from "../components/Table";
import AddEditModal from "../components/AddEditModal";

// fakeData.js
const fakeVendors = [
	{
		vendorID: 1,
		vendorName: "Fresh Foods Co.",
		vendorType: "Food",
		contactEmail: "contact@freshfoods.com",
		contactPhone: "+1 555 123 4567",
		businessLicense: "FF12345",
	},
	{
		vendorID: 2,
		vendorName: "Sound Systems Ltd.",
		vendorType: "Equipment",
		contactEmail: "info@soundsystems.com",
		contactPhone: "+1 555 987 6543",
		businessLicense: "SS67890",
	},
	{
		vendorID: 3,
		vendorName: "Green Decor",
		vendorType: "Decoration",
		contactEmail: "hello@greendecor.com",
		contactPhone: "+44 20 7946 0958",
		businessLicense: "GD45678",
	},
	{
		vendorID: 4,
		vendorName: "Stage Lighting Inc.",
		vendorType: "Lighting",
		contactEmail: "support@stagelighting.com",
		contactPhone: "+61 2 9876 5432",
		businessLicense: "SL78901",
	},
];

function VendorsPage() {
	const columns = [
		{ header: "ID", accessor: "vendorID" },
		{ header: "Name", accessor: "vendorName" },
		{ header: "Type", accessor: "vendorType" },
		{ header: "Email", accessor: "contactEmail" },
		{ header: "Phone", accessor: "contactPhone" },
		{ header: "Business License", accessor: "businessLicense" },
	];

	const fields = [
		{
			name: "vendorName",
			label: "Vendor Name",
			placeholder: "Enter vendor name",
		},
		{
			name: "vendorType",
			label: "Vendor Type",
			placeholder: "Enter vendor type",
		},
		{
			name: "contactEmail",
			label: "Email",
			type: "email",
			placeholder: "Enter email",
		},
		{
			name: "contactPhone",
			label: "Phone",
			type: "text",
			placeholder: "Enter phone number",
		},
		{
			name: "businessLicense",
			label: "Business License",
			placeholder: "Enter license number",
		},
	];

	const [vendors, setVendors] = useState(fakeVendors);

	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedVendor, setSelectedVendor] = useState(null);
	const [vendorToDelete, setVendorToDelete] = useState(null);

	// THIS DELETES ARTIST
	const handleDeleteClick = (vendor) => {
		setVendorToDelete(vendor);
		setOpenDeleteModal(true);
	};

	const confirmDelete = () => {
		if (vendorToDelete) {
			setVendors((prev) =>
				prev.filter((a) => a.vendorID !== vendorToDelete.vendorID)
			);
			setVendorToDelete(null);
			setOpenDeleteModal(false);
		}
	};
	// THIS ADDS ARTIST
	const handleAdd = (vendor) => {
		if (selectedVendor) {
			// Editing
			setVendors((prev) =>
				prev.map((a) => (a.vendorID === vendor.vendorID ? vendor : a))
			);
			setSelectedVendor(null);
		} else {
			// Adding
			setVendors((prev) => [...prev, vendor]);
		}
		setOpenModal(false);
	};

	const handleOpenAdd = () => {
		setSelectedVendor(null);
		setOpenModal(true);
	};

	// THIS EDITS ARTIST
	const handleEdit = (vendor) => {
		setSelectedVendor(vendor);
		setOpenModal(true);
	};

	return (
		<>
			<div className="p-4">
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl font-bold">Vendors</h2>
						<p>Here you can track your vendors</p>
					</div>
					<div className="flex items-center">
						<Button onClick={() => handleOpenAdd()}>Add New Vendor</Button>
					</div>
				</div>
				<Table
					columns={columns}
					data={vendors}
					onDelete={handleDeleteClick}
					onEdit={handleEdit}
				/>
			</div>
			{openModal && (
				<AddEditModal
					fields={fields}
					isOpen={openModal}
					setIsOpen={setOpenModal}
					title={selectedVendor ? "Edit Artist" : "Add Artist"}
					onSubmit={handleAdd}
					initialData={selectedVendor || {}}
				/>
			)}

			{openDeleteModal && (
				<ConfirmationModal
					isOpen={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					onConfirm={confirmDelete}
					title="Delete Artist"
					message={`Are you sure you want to delete ${vendorToDelete?.vendorName || ""}?`}
					confirmText="Delete"
					confirmColor="bg-red-500 hover:bg-red-600"
				/>
			)}
		</>
	);
}

export default VendorsPage;
