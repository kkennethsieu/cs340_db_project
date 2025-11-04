import Form from "./Form";
import Modal from "./PopupModal";

function AddEditModal({
	isOpen,
	setIsOpen,
	title,
	onSubmit,
	initialData,
	fields,
}) {
	const handleSubmit = (data) => {
		onSubmit({ ...data, id: initialData?.id || new Date().getTime() });
		setIsOpen(false);
	};
	return (
		<Modal
			title={title}
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}>
			<Form
				fields={fields}
				onSubmit={handleSubmit}
				submitText={initialData ? "Save Changes" : "Add New"}
				onCancel={() => setIsOpen(false)}
				initialData={initialData}
			/>
		</Modal>
	);
}

export default AddEditModal;
