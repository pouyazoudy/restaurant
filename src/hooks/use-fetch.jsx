import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const updatedData = []
        for (const key in result) {
          if(result.hasOwnProperty(key)){
            updatedData.push({
              id:key,
              name:result[key].name,
              description:result[key].description,
              price:result[key].price
            })
          }
        }

        setData(updatedData)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
