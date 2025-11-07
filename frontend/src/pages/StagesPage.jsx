import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { stageColumns, stageFields } from "../config/stages";

const backendURL = "http://classwork.engr.oregonstate.edu:9040";

function StagesPage() {
	const [data, setData] = useState({
		stages: [],
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
			stages: prev.stages.filter((s) => s.stageID !== item.stageID),
		}));
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/stages`);
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

	if (isLoading) return <p>Loading stages...</p>;
	return (
		<>
			<CrudPage
				title="Stages"
				columns={stageColumns}
				fields={stageFields(data.festivals)}
				initialData={data.stages}
				setData={setData}
				onDelete={handleDelete}
				onSubmit={handleSubmit}
				idAccessor="stageID"
				displayNameAccessor="stageName"
			/>
		</>
	);
}

export default StagesPage;
