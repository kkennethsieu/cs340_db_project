import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { vendorColumns, vendorFields } from "../config/vendors";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function VendorsPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleSubmit = async (item, isEdit) => {
		try {
			const method = isEdit ? "PUT" : "POST";
			const url = isEdit
				? `${backendURL}/api/vendors/${item.vendorID}`
				: `${backendURL}/api/vendors`;

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			});

			if (!res.ok) throw new Error("Failed");

			const data = await res.json();
			setData((prev) =>
				isEdit
					? prev.map((f) => (f.vendorID === data.vendorID ? data : f))
					: [{ ...item, vendorID: data.vendorID }, ...prev]
			);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/vendors/${item.vendorID}`, {
				method: "DELETE",
			});
			console.log(`Deleted ${item.vendorID}`);
			setData((prev) => prev.filter((a) => a.vendorID !== item.vendorID));
		} catch (error) {
			console.error(error);
		}
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
