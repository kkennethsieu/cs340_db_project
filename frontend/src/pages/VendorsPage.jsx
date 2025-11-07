import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { vendorColumns, vendorFields } from "../config/vendors";

const backendURL = "http://classwork.engr.oregonstate.edu:9040";

function VendorsPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
	};
	const handleDelete = (item) => {
		console.log(`Deleted ${item}`);
		setData((prev) => prev.filter((a) => a.vendorID !== item.vendorID));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/vendors`);
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

	if (isLoading) return <p>Loading vendors...</p>;

	return (
		<>
			<CrudPage
				title="Vendors"
				columns={vendorColumns}
				fields={vendorFields}
				initialData={data}
				setData={setData}
				onDelete={handleDelete}
				onSubmit={handleSubmit}
				idAccessor="vendorID"
				displayNameAccessor="vendorName"
			/>
		</>
	);
}

export default VendorsPage;
