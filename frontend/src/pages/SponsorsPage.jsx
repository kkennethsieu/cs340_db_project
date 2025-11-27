import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { sponsorsColumns, sponsorsFields } from "../config/sponsors";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function SponsorsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (item, isEdit) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${backendURL}/api/sponsors/${item.sponsorID}`
        : `${backendURL}/api/sponsors`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setData((prev) =>
        isEdit
          ? prev.map((f) => (f.sponsorID === data.sponsorID ? data : f))
          : [{ ...item, sponsorID: data.sponsorID }, ...prev]
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await fetch(`${backendURL}/api/sponsors/${item.sponsorID}`, {
        method: "DELETE",
      });
      console.log(`Deleted ${item.sponsorID}`);
      setData((prev) => prev.filter((a) => a.sponsorID !== item.sponsorID));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendURL}/sponsors`);
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

  if (isLoading) return <p>Loading sponsors...</p>;

  return (
    <>
      <CrudPage
        title="Sponsors"
        columns={sponsorsColumns}
        fields={sponsorsFields}
        initialData={data}
        setData={setData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        idAccessor="sponsorID"
        displayNameAccessor="sponsorName"
      />
    </>
  );
}

export default SponsorsPage;
