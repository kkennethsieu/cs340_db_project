import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { festivalColumns, festivalFields } from "../config/festivals";
import { formatDateForInput } from "../helper/helper";
const backendURL = "http://classwork.engr.oregonstate.edu:9040";

function FestivalsPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
	};
	const handleDelete = (item) => {
		console.log(`Deleted ${item}`);
		setData((prev) => prev.filter((a) => a.festivalID !== item.festivalID));
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
