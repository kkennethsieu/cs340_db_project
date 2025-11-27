import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { performanceColumns, performanceFields } from "../config/performances";
import { formatDateForInput } from "../helper/helper";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function PerformancesPage() {
	const [data, setData] = useState({
		performances: [],
		artists: [],
		stages: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleSubmit = async (item, isEdit) => {
		try {
			const method = isEdit ? "PUT" : "POST";
			const url = isEdit
				? `${backendURL}/api/performances/${item.performanceID}`
				: `${backendURL}/api/performances`;

			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(item),
			});

			if (!res.ok) throw new Error("Failed to submit performance data");

			const data = await res.json();
			setData((prev) => ({
				...prev,
				performances: isEdit
					? prev.performances.map((f) => (f.performanceID === data.performanceID ? data : f))
					: [{ ...data, performanceID: data.performanceID }, ...prev.performances],
			}));
		} catch (err) {
			console.error(err);
		}
	};
	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/performances/${item.performanceID}`, {
				method: "DELETE",
			});
			console.log(`Deleted ${item.performanceID}`);
			setData((prev) => ({
				...prev,
				performances: prev.performances.filter(
					(s) => s.performanceID !== item.performanceID
				),
			}));
		} catch (error) {
			console.error(error);
		}
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
