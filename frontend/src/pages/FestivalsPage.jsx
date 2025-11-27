import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { festivalColumns, festivalFields } from "../config/festivals";
import { formatDateForInput } from "../helper/helper";
const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function FestivalsPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleSubmit = async (item, isEdit) => {
		try {
			const method = isEdit ? "PUT" : "POST";
			const url = isEdit
				? `${backendURL}/api/festivals/${item.festivalID}`
				: `${backendURL}/api/festivals`;

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			});

			if (!res.ok) throw new Error("Failed");

			const data = await res.json();
			setData((prev) =>
				isEdit
					? prev.map((f) => (f.festivalID === data.festivalID ? data : f))
					: [{ ...item, festivalID: data.festivalID }, ...prev]
			);
		} catch (err) {
			console.error(err);
		}
	};

	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/festivals/${item.festivalID}`, {
				method: "DELETE",
			});
			setData((prev) => prev.filter((a) => a.festivalID !== item.festivalID));
			console.log(`Deleted: ${item.festivalID}`);
		} catch (error) {
			console.error("error deleting festival", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/festivals`);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();
				const formatted = json.map((f) => ({
					...f,
					startDate: formatDateForInput(f.startDate),
					endDate: formatDateForInput(f.endDate),
				}));
				setData(formatted);
			} catch (err) {
				setError(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <p>Loading festivals...</p>;

	return (
		<>
			<CrudPage
				title="Festivals"
				columns={festivalColumns}
				fields={festivalFields}
				initialData={data}
				onDelete={handleDelete}
				onSubmit={handleSubmit}
				idAccessor="festivalID"
				displayNameAccessor="festivalName"
				setData={setData}
			/>
		</>
	);
}

export default FestivalsPage;
