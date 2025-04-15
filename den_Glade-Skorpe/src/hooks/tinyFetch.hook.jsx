import { useState } from "react";

const useTinyFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState(""); // New state for "no data" message

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);
    setNoDataMessage("");  // Reset the "no data" message on new fetch

    try {
      const response = await fetch(`http://localhost:3042${url}`);

      if (!response.ok) {
        throw new Error("Failed to fetch from the server.");
      }

      const result = await response.json();
      if (result.data.length === 0) {
        setNoDataMessage("Data kunne ikke hentes. Prøv igen senere.");
      } else {
        setData(result.data);
      }
    } catch (err) {
      setNoDataMessage("Data kunne ikke hentes. Prøv igen senere.");
      setError(err.message || "An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    noDataMessage,
    fetchData,
  };
};

export default useTinyFetch;
