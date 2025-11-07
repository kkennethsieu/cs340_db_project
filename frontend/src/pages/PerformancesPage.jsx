import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { performanceColumns, performanceFields } from "../config/performances";
import { formatDateForInput } from "../helper/helper";

const backendURL = "http://classwork.engr.oregonstate.edu:9040";

function PerformancesPage() {
	const [data, setData] = useState({
		performances: [],
		artists: [],
		stages: [],
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
			performances: prev.performances.filter(
				(s) => s.performanceID !== item.performanceID
			),
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/performances`);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();
				json.performances = json.performances.map((p) => ({
					...p,
					performanceDate: formatDateForInput(p.performanceDate),
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

	if (isLoading) return <p>Loading performances...</p>;
	return (
		<>
			<CrudPage
				title="Performances"
				columns={performanceColumns}
				fields={performanceFields(data.artists, data.stages)}
				initialData={data.performances}
				setData={setData}
				onSubmit={handleSubmit}
				onDelete={handleDelete}
				idAccessor="performanceID"
				displayNameAccessor="performanceID"
			/>
		</>
	);
}

export default PerformancesPage;
