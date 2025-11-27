import { useState } from "react";
import CrudPage from "../components/CrudPage";
import { sponsorshipColumns, sponsorshipFields } from "../config/sponsorships";
import { useEffect } from "react";
import { formatDateForInput } from "../helper/helper";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function SponsorshipsPage() {
	const [data, setData] = useState({
		sponsorships: [],
		sponsors: [],
		festivals: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);
	const handleSubmit = (item) => {
		console.log(`Submitted, ${item}`);
	};
	const handleDelete = async (item) => {
		try {
			await fetch(`${backendURL}/api/sponsorships/${item.sponsorshipID}`, {
				method: "DELETE",
			});
			console.log(`Deleted ${item.sponsorshipID}`);
			setData((prev) => ({
				...prev,
				sponsorships: prev.sponsorships.filter(
					(s) => s.sponsorshipID !== item.sponsorshipID
				),
			}));
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${backendURL}/sponsorships`);
				if (!res.ok) throw new Error("Network response was not ok");
				const json = await res.json();

				json.sponsorships = json.sponsorships.map((s) => ({
					...s,
					contractDate: formatDateForInput(s.contractDate),
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

	if (isLoading) return <p>Loading Sponsorships...</p>;
	return (
		<>
			<CrudPage
				title="Sponsorship"
				columns={sponsorshipColumns}
				fields={sponsorshipFields(data.sponsors, data.festivals)}
				initialData={data.sponsorships}
				onSubmit={handleSubmit}
				onDelete={handleDelete}
				idAccessor="sponsorshipID"
				displayNameAccessor="sponsorshipID"
				setData={setData}
			/>
		</>
	);
}

export default SponsorshipsPage;
