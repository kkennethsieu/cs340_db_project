import { useState } from "react";
import CrudPage from "../components/CrudPage";
import {
	staffAssignmentColumns,
	staffAssignmentFields,
} from "../config/staffAssignments";
import { formatDateForInput } from "../helper/helper";
import { useEffect } from "react";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function StaffAssignmentsPage() {
	const [data, setData] = useState({
		staffAssignments: [],
		staff: [],
		festivals: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleSubmit = async (item, isEdit) => {
		try {
			const method = isEdit ? "PUT" : "POST";
			const url = isEdit
				? `${backendURL}/api/staff-assignments/${item.staffAssignmentID}`
				: `${backendURL}/api/staff-assignments`;

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			});

			if (!res.ok) throw new Error("Failed to submit staff-assignments data");

			const data = await res.json();
			setData((prev) => ({
				...prev,
				staffAssignments: isEdit
					? prev.staffAssignments.map((f) =>
							f.staffAssignmentID === data.staffAssignmentID ? data : f
						)
					: [
							{ ...data, staffAssignmentID: data.staffAssignmentID },
							...prev.staffAssignments,
						],
			}));
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (item) => {
		try {
			await fetch(
				`${backendURL}/api/staff-assignments/${item.staffAssignmentID}`,
				{
					method: "DELETE",
				}
			);
			console.log(`Deleted ${item.staffAssignmentID}`);
			setData((prev) => ({
				...prev,
				staffAssignments: prev.staffAssignments.filter(
					(s) => s.staffAssignmentID !== item.staffAssignmentID
				),
			}));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/staff-assignments`);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();

				json.staffAssignments = json.staffAssignments.map((s) => ({
					...s,
					assignedDate: formatDateForInput(s.assignedDate),
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

	if (isLoading) return <p>Loading Staff Assignments...</p>;
	return (
		<>
			<CrudPage
				title="Staff Assignment"
				columns={staffAssignmentColumns}
				fields={staffAssignmentFields(data.staff, data.festivals)}
				initialData={data.staffAssignments}
				setData={setData}
				onSubmit={handleSubmit}
				onDelete={handleDelete}
				idAccessor="staffAssignmentID"
				displayNameAccessor="staffAssignmentID"
			/>
		</>
	);
}

export default StaffAssignmentsPage;
