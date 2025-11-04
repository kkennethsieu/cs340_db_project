import { useState } from "react";
import Button from "../components/Button";
import ConfirmationModal from "../components/ConfirmationModal";
import Table from "../components/Table";
import AddEditModal from "../components/AddEditModal";

const fakeFestivals = [
	{
		festivalID: 1,
		festivalName: "Electric Summer",
		startDate: "2025-07-10",
		endDate: "2025-07-12",
		location: "Los Angeles, CA",
		expectedAttendance: 25000,
		budget: 5000000.0,
		ticketPrice: 199.99,
	},
	{
		festivalID: 2,
		festivalName: "Rock the Hills",
		startDate: "2025-08-05",
		endDate: "2025-08-07",
		location: "Denver, CO",
		expectedAttendance: 18000,
		budget: 3200000.0,
		ticketPrice: 149.99,
	},
	{
		festivalID: 3,
		festivalName: "Jazz by the Bay",
		startDate: "2025-09-12",
		endDate: "2025-09-14",
		location: "San Francisco, CA",
		expectedAttendance: 12000,
		budget: 2500000.0,
		ticketPrice: 129.99,
	},
	{
		festivalID: 4,
		festivalName: "Hip-Hop Nation",
		startDate: "2025-06-20",
		endDate: "2025-06-22",
		location: "New York, NY",
		expectedAttendance: 30000,
		budget: 6000000.0,
		ticketPrice: 179.99,
	},
	{
		festivalID: 5,
		festivalName: "Country Roads Festival",
		startDate: "2025-07-25",
		endDate: "2025-07-27",
		location: "Nashville, TN",
		expectedAttendance: 15000,
		budget: 2800000.0,
		ticketPrice: 139.99,
	},
	{
		festivalID: 6,
		festivalName: "Electronic Dreams",
		startDate: "2025-08-15",
		endDate: "2025-08-17",
		location: "Miami, FL",
		expectedAttendance: 22000,
		budget: 4500000.0,
		ticketPrice: 189.99,
	},
];

function FestivalsPage() {
	const columns = [
		{ header: "ID", accessor: "festivalID" },
		{ header: "Festival Name", accessor: "festivalName" },
		{ header: "Start Date", accessor: "startDate" },
		{ header: "End Date", accessor: "endDate" },
		{ header: "Location", accessor: "location" },
		{ header: "Expected Attendance", accessor: "expectedAttendance" },
		{ header: "Budget", accessor: "budget" },
		{ header: "Ticket Price", accessor: "ticketPrice" },
	];

	const fields = [
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

	const [festivals, setFestivals] = useState(fakeFestivals);

	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedFestival, setSelectedFestival] = useState(null);
	const [festivalToDelete, setFestivalToDelete] = useState(null);

	// THIS DELETES ARTIST
	const handleDeleteClick = (festival) => {
		setFestivalToDelete(festival);
		setOpenDeleteModal(true);
	};

	const confirmDelete = () => {
		if (festivalToDelete) {
			setFestivals((prev) =>
				prev.filter((a) => a.festivalID !== festivalToDelete.festivalID)
			);
			setFestivalToDelete(null);
			setOpenDeleteModal(false);
		}
	};
	// THIS ADDS ARTIST
	const handleAdd = (festival) => {
		if (selectedFestival) {
			// Editing
			setFestivals((prev) =>
				prev.map((a) => (a.festivalID === festival.festivalID ? festival : a))
			);
			setSelectedFestival(null);
		} else {
			// Adding
			setFestivals((prev) => [...prev, festival]);
		}
		setOpenModal(false);
	};

	const handleOpenAdd = () => {
		setSelectedFestival(null);
		setOpenModal(true);
	};

	// THIS EDITS ARTIST
	const handleEdit = (festival) => {
		setSelectedFestival(festival);
		setOpenModal(true);
	};

	return (
		<>
			<div className="p-4">
				<div className="flex justify-between">
					<div>
						<h2 className="text-3xl font-bold">Festival</h2>
						<p>
							Here you can track your Festivals. Click on a festival to view
							more details
						</p>
					</div>
					<div className="flex items-center">
						<Button onClick={() => handleOpenAdd()}>Add New Festival</Button>
					</div>
				</div>
				<Table
					columns={columns}
					data={festivals}
					onDelete={handleDeleteClick}
					onEdit={handleEdit}
				/>
			</div>
			{openModal && (
				<AddEditModal
					fields={fields}
					isOpen={openModal}
					setIsOpen={setOpenModal}
					title={selectedFestival ? "Edit Festival" : "Add Festival"}
					onSubmit={handleAdd}
					initialData={selectedFestival || {}}
				/>
			)}

			{openDeleteModal && (
				<ConfirmationModal
					isOpen={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					onConfirm={confirmDelete}
					title="Delete Artist"
					message={`Are you sure you want to delete ${festivalToDelete?.festivalName || ""}?`}
					confirmText="Delete"
					confirmColor="bg-red-500 hover:bg-red-600"
				/>
			)}
		</>
	);
}

export default FestivalsPage;
