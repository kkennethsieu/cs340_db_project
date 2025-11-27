import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { staffFields, staffColumns } from "../config/staff";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function StaffPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
	};

	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/staff/${item.staffID}`, {
				method: "DELETE",
			});
			console.log(`Deleted ${item.staffID}`);
			setData((prev) => prev.filter((a) => a.staffID !== item.staffID));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/staff`);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();
				setData(json);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <p>Loading staff...</p>;
	return (
		<>
			<CrudPage
				title="Staff"
				columns={staffColumns}
				fields={staffFields}
				initialData={data}
				setData={setData}
				onDelete={handleDelete}
				onSubmit={handleSubmit}
				idAccessor="staffID"
				displayNameAccessor="firstName"
			/>
		</>
	);
}

export default StaffPage;
