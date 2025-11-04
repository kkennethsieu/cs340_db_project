export default function Modal({ isOpen, onClose, title, children }) {
	if (!isOpen) return null;

	const handleOverlayClick = () => {
		onClose();
	};

	const handleContentClick = (e) => {
		e.stopPropagation();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			onClick={handleOverlayClick}>
			<div
				className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
				onClick={handleContentClick}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold">{title}</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 font-bold text-xl">
						&times;
					</button>
				</div>

				<div>{children}</div>
			</div>
		</div>
	);
}
