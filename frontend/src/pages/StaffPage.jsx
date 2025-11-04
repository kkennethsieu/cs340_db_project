import { useState } from "react";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import Table from "../components/Table";
import AddEditModal from "../components/AddEditModal";

// fakeData.js
const fakeStaff = [
	{
		staffID: 1,
		firstName: "Kenny",
		lastName: "Sieu",
		email: "kenny.sieu@example.com",
		phone: "+1 555 123 4567",
		role: "Event Manager",
		hourlyRate: 35.5,
	},
	{
		staffID: 2,
		firstName: "Alice",
		lastName: "Johnson",
		email: "alice.johnson@example.com",
		phone: "+1 555 987 6543",
		role: "Technician",
		hourlyRate: 28.0,
	},
	{
		staffID: 3,
		firstName: "Bob",
		lastName: "Smith",
		email: "bob.smith@example.com",
		phone: "+44 20 7946 0958",
		role: "Security",
		hourlyRate: 22.5,
	},
	{
		staffID: 4,
		firstName: "Jane",
		lastName: "Doe",
		email: "jane.doe@example.com",
		phone: "+61 2 9876 5432",
		role: "Coordinator",
		hourlyRate: 30.0,
	},
];

function StaffPage() {
	const columns = [
		{ header: "ID", accessor: "staffID" },
		{ header: "First Name", accessor: "firstName" },
		{ header: "Last Name", accessor: "lastName" },
		{ header: "Email", accessor: "email" },
		{ header: "Phone", accessor: "phone" },
		{ header: "Role", accessor: "role" },
		{ header: "Hourly Rate", accessor: "hourlyRate" },
	];

	const fields = [
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

	const [staff, setStaff] = useState(fakeStaff);

	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedStaff, setSelectedStaff] = useState(null);
	const [staffToDelete, setStaffToDelete] = useState(null);

	// THIS DELETES ARTIST
	const handleDeleteClick = (staff) => {
		setStaffToDelete(staff);
		setOpenDeleteModal(true);
	};

	const confirmDelete = () => {
		if (staffToDelete) {
			setStaff((prev) =>
				prev.filter((a) => a.staffID !== staffToDelete.staffID)
			);
			setStaffToDelete(null);
			setOpenDeleteModal(false);
		}
	};
	// THIS ADDS ARTIST
	const handleAdd = (staff) => {
		if (selectedStaff) {
			// Editing
			setStaff((prev) =>
				prev.map((a) => (a.staffID === staff.staffID ? staff : a))
			);
			setSelectedStaff(null);
		} else {
			// Adding
			setStaff((prev) => [...prev, staff]);
		}
		setOpenModal(false);
	};

	const handleOpenAdd = () => {
		setSelectedStaff(null);
		setOpenModal(true);
	};

	// THIS EDITS ARTIST
	const handleEdit = (staff) => {
		setSelectedStaff(staff);
		setOpenModal(true);
	};

	return (
		<>
			<div className="p-4">
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl font-bold">Staff</h2>
						<p>Here you can track your Staff</p>
					</div>
					<div className="flex items-center">
						<Button onClick={() => handleOpenAdd()}>Add New Staff</Button>
					</div>
				</div>
				<Table
					columns={columns}
					data={staff}
					onDelete={handleDeleteClick}
					onEdit={handleEdit}
				/>
			</div>
			{openModal && (
				<AddEditModal
					fields={fields}
					isOpen={openModal}
					setIsOpen={setOpenModal}
					title={selectedStaff ? "Edit Staff" : "Add Staff"}
					onSubmit={handleAdd}
					initialData={selectedStaff || {}}
				/>
			)}

			{openDeleteModal && (
				<ConfirmationModal
					isOpen={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					onConfirm={confirmDelete}
					title="Delete Artist"
					message={`Are you sure you want to delete ${staffToDelete?.firstName || ""}?`}
					confirmText="Delete"
					confirmColor="bg-red-500 hover:bg-red-600"
				/>
			)}
		</>
	);
}

export default StaffPage;
