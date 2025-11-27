import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { artistColumns, artistFields } from "../config/artists";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";
function ArtistsPage() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
	};
	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/artists/${item.artistID}`, {
				method: "DELETE",
			});
			console.log(`Deleted ${item.artistID}`);
			setData((prev) => prev.filter((a) => a.artistID !== item.artistID));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/artists`);
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

	if (isLoading) return <p>Loading artists...</p>;

	return (
		<>
			<CrudPage
				title="Artist"
				columns={artistColumns}
				fields={artistFields}
				initialData={data}
				onDelete={handleDelete}
				onSubmit={handleSubmit}
				idAccessor="artistID"
				displayNameAccessor="artistName"
				setData={setData}
			/>
		</>
	);
}

export default ArtistsPage;
