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
	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
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
