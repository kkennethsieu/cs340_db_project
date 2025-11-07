import { useState } from "react";
import Button from "./Button";
import ConfirmationModal from "./ConfirmationModal";
import Table from "./Table";
import AddEditModal from "./AddEditModal";

export default function CrudPage({
	title,
	columns,
	fields,
	setData,
	initialData = [],
	idAccessor = "id", // FILL WITH id EX: festivalID, stageID
	generateId = () => Date.now(),
	displayNameAccessor = "name",
	onSubmit,
	onDelete,
}) {
	const [openModal, setOpenModal] = useState(false);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [itemToDelete, setItemToDelete] = useState(null);

	// DELETE
	const handleDeleteClick = (item) => {
		setItemToDelete(item);
		setOpenDeleteModal(true);
	};

	const confirmDelete = async () => {
		if (onDelete) {
			await onDelete(itemToDelete);
		} else {
			setData((prev) =>
				prev.filter((a) => a[idAccessor] !== itemToDelete[idAccessor])
			);
		}
		setOpenDeleteModal(false);
	};

	// ADD / EDIT
	const handleAddEdit = async (item) => {
		if (onSubmit) {
			await onSubmit(item);
		} else {
			if (selectedItem) {
				setData((prev) =>
					prev.map((a) => (a[idAccessor] === item[idAccessor] ? item : a))
				);
			} else {
				setData((prev) => [...prev, { ...item, [idAccessor]: generateId() }]);
			}
		}
		setSelectedItem(null);
		setOpenModal(false);
	};

	return (
		<>
			<div className="p-2">
				<div className="flex justify-between items-center mb-4">
					<div>
						<h2 className="text-3xl font-bold">{title}</h2>
						<p>Manage your {title.toLowerCase()} records.</p>
					</div>
					<Button
						onClick={() => {
							setSelectedItem(null);
							setOpenModal(true);
						}}>
						Add New {title}
					</Button>
				</div>

				<Table
					columns={columns}
					data={initialData}
					idAccessor={idAccessor}
					onEdit={(item) => {
						setSelectedItem(item);
						setOpenModal(true);
					}}
					onDelete={handleDeleteClick}
				/>
			</div>

			{openModal && (
				<AddEditModal
					fields={fields}
					isOpen={openModal}
					setIsOpen={setOpenModal}
					title={selectedItem ? `Edit ${title}` : `Add ${title}`}
					onSubmit={handleAddEdit}
					initialData={selectedItem || {}}
				/>
			)}

			{openDeleteModal && (
				<ConfirmationModal
					isOpen={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					onConfirm={confirmDelete}
					title={`Delete ${title}`}
					message={`Are you sure you want to delete ${itemToDelete?.[displayNameAccessor] || ""}?`}
					confirmText="Delete"
					confirmColor="bg-red-500 hover:bg-red-600"
				/>
			)}
		</>
	);
}
