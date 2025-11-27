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

  const handleSubmit = async (item, isEdit) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${backendURL}/api/sponsorships/${item.sponsorshipID}`
        : `${backendURL}/api/sponsorships`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed to submit sponsorships data");

      const data = await res.json();
      setData((prev) => ({
        ...prev,
        sponsorships: isEdit
          ? prev.sponsorships.map((f) =>
              f.sponsorshipID === data.sponsorshipID ? data : f
            )
          : [
              { ...data, sponsorshipID: data.sponsorshipID },
              ...prev.sponsorships,
            ],
      }));
    } catch (err) {
      console.error(err);
    }
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
