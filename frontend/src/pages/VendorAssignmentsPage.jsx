import { useState } from "react";
import CrudPage from "../components/CrudPage";
import {
	vendorAssignmentColumns,
	vendorAssignmentFields,
} from "../config/vendorAssignments";
import { useEffect } from "react";
import { formatDateForInput } from "../helper/helper";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function VendorAssignmentsPage() {
	const [data, setData] = useState({
		vendorAssignments: [],
		vendors: [],
		festivals: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleSubmit = async (item, isEdit) => {
		try {
			const method = isEdit ? "PUT" : "POST";
			const url = isEdit
				? `${backendURL}/api/vendor-assignments/${item.assignmentID}`
				: `${backendURL}/api/vendor-assignments`;

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			});

			if (!res.ok) throw new Error("Failed to submit assignment data");

			const data = await res.json();
			setData((prev) => ({
				...prev,
				vendorAssignments: isEdit
					? prev.vendorAssignments.map((f) =>
							f.assignmentID === data.assignmentID ? data : f
						)
					: [
							{ ...data, assignmentID: data.assignmentID },
							...prev.vendorAssignments,
						],
			}));
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/vendor-assignments/${item.assignmentID}`, {
				method: "DELETE",
			});
			console.log(`Deleted ${item.assignmentID}`);
			setData((prev) => ({
				...prev,
				vendorAssignments: prev.vendorAssignments.filter(
					(s) => s.assignmentID !== item.assignmentID
				),
			}));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/vendor-assignments`);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();

				json.vendorAssignments = json.vendorAssignments.map((v) => ({
					...v,
					assignmentDate: formatDateForInput(v.assignmentDate),
				}));

				setData(json);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <p>Loading Vendor Assignments...</p>;
	return (
		<>
			<CrudPage
				title="Vendor Assignments"
				columns={vendorAssignmentColumns}
				fields={vendorAssignmentFields(data.vendors, data.festivals)}
				initialData={data.vendorAssignments}
				setData={setData}
				onSubmit={handleSubmit}
				onDelete={handleDelete}
				idAccessor="assignmentID"
				displayNameAccessor="vendorName"
			/>
		</>
	);
}

export default VendorAssignmentsPage;
