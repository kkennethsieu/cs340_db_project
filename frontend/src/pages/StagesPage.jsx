import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { stageColumns, stageFields } from "../config/stages";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function StagesPage() {
  const [data, setData] = useState({
    stages: [],
    festivals: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = async (item, isEdit) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${backendURL}/api/stages/${item.stageID}`
        : `${backendURL}/api/stages`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed to submit stage data");

      const data = await res.json();
      setData((prev) => ({
        ...prev,
        stages: isEdit
          ? prev.stages.map((f) => (f.stageID === data.stageID ? data : f))
          : [{ ...data, stageID: data.stageID }, ...prev.stages],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await fetch(`${backendURL}/api/stages/${item.stageID}`, {
        method: "DELETE",
      });
      console.log(`Deleted ${item}`);
      setData((prev) => ({
        ...prev,
        stages: prev.stages.filter((s) => s.stageID !== item.stageID),
      }));
    } catch (error) {
      console.error(error);
    }
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
