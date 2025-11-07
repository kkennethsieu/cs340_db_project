import { useState } from "react";
import CrudPage from "../components/CrudPage";
import {
	vendorAssignmentColumns,
	vendorAssignmentFields,
} from "../config/vendorAssignments";
import { useEffect } from "react";
import { formatDateForInput } from "../helper/helper";

const backendURL = "http://classwork.engr.oregonstate.edu:9040";

function VendorAssignmentsPage() {
	const [data, setData] = useState({
		vendorAssignments: [],
		vendors: [],
		festivals: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
	};
	const handleDelete = (item) => {
		console.log(`Deleted ${item}`);
		setData((prev) => ({
			...prev,
			vendorAssignments: prev.vendorAssignments.filter(
				(s) => s.vendorAssignmentID !== item.vendorAssignmentID
			),
		}));
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
