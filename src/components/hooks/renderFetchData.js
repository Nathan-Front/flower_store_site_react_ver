import { useEffect, useState } from "react";
import { fetchSpecificSheet } from "./fetchData.js";

export default function useFetch(sheetType, key, dataFormatter) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(false);

        const result = await fetchSpecificSheet(sheetType, key, dataFormatter);

        setData(result);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [sheetType, key, dataFormatter]);

  return { data, loading, error };
}
