import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { artistColumns, artistFields } from "../config/artists";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";
function ArtistsPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (item, isEdit) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${backendURL}/api/artists/${item.artistID}`
        : `${backendURL}/api/artists`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setData((prev) =>
        isEdit
          ? prev.map((f) => (f.artistID === data.artistID ? data : f))
          : [{ ...item, artistID: data.artistID }, ...prev]
      );
    } catch (err) {
      console.error(err);
    }
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
