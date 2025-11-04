// components/ConfirmationModal.jsx
import Modal from "./PopupModal";
import Button from "./Button";

export default function ConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	title = "Confirm Action",
	message = "Are you sure?",
	confirmText = "Confirm",
	cancelText = "Cancel",
	confirmColor = "bg-red-500 hover:bg-red-600", // customizable
}) {
	return (
		<Modal
			title={title}
			isOpen={isOpen}
			onClose={onClose}>
			<p className="mb-4">{message}</p>
			<div className="flex justify-end gap-2">
				<Button
					onClick={onClose}
					className="bg-gray-300 hover:bg-gray-400">
					{cancelText}
				</Button>
				<Button
					onClick={onConfirm}
					className={confirmColor}>
					{confirmText}
				</Button>
			</div>
		</Modal>
	);
}
