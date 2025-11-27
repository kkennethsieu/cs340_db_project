import { useEffect, useState } from "react";
import CrudPage from "../components/CrudPage";
import { staffFields, staffColumns } from "../config/staff";

const backendURL = "http://classwork.engr.oregonstate.edu:9080";

function StaffPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (item, isEdit) => {
    try {
      const method = isEdit ? "PUT" : "POST";
      const url = isEdit
        ? `${backendURL}/api/staff/${item.staffID}`
        : `${backendURL}/api/staff`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      setData((prev) =>
        isEdit
          ? prev.map((f) => (f.staffID === data.staffID ? data : f))
          : [{ ...item, staffID: data.staffID }, ...prev]
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (item) => {
    try {
      await fetch(`${backendURL}/api/staff/${item.staffID}`, {
        method: "DELETE",
      });
      console.log(`Deleted ${item.staffID}`);
      setData((prev) => prev.filter((a) => a.staffID !== item.staffID));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendURL}/staff`);
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

  if (isLoading) return <p>Loading staff...</p>;
  return (
    <>
      <CrudPage
        title="Staff"
        columns={staffColumns}
        fields={staffFields}
        initialData={data}
        setData={setData}
        onDelete={handleDelete}
        onSubmit={handleSubmit}
        idAccessor="staffID"
        displayNameAccessor="firstName"
      />
    </>
  );
}

export default StaffPage;
