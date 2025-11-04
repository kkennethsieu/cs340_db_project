// components/ReusableForm.jsx
import React, { useState, useEffect } from "react";

export default function Form({
	fields = [],
	onSubmit,
	onCancel,
	submitText = "Add",
	initialData = {},
}) {
	const [formData, setFormData] = useState(
		Object.fromEntries(
			fields.map((field) => [field.name, initialData[field.name] || ""])
		)
	);

	// Update form if initialData changes (important when editing different rows)
	useEffect(() => {
		setFormData(
			Object.fromEntries(
				fields.map((field) => [field.name, initialData[field.name] || ""])
			)
		);
	}, [initialData, fields]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
		// Reset only if it's an Add form (no initialData)
		if (!initialData || Object.keys(initialData).length === 0) {
			setFormData(Object.fromEntries(fields.map((field) => [field.name, ""])));
		}
	};

	return (
		<form
			className="flex flex-col gap-3"
			onSubmit={handleSubmit}>
			{fields.map((field) => (
				<div
					key={field.name}
					className="flex flex-col">
					{field.label && (
						<label className="text-sm font-medium mb-1">{field.label}</label>
					)}
					<input
						type={field.type || "text"}
						name={field.name}
						placeholder={field.placeholder || ""}
						value={formData[field.name] || ""}
						onChange={handleChange}
						className="border px-2 py-1 rounded"
					/>
				</div>
			))}

			<div className="flex justify-end gap-2 mt-4">
				<button
					type="submit"
					className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600">
					{submitText}
				</button>
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}
