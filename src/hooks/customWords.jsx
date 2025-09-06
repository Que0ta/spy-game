import { useEffect, useState } from "react";

export function loadCustomWords() {
  const [customWords, setCustom] = useState(null);
  const [loadingCustom, setLoading] = useState(true);
  const [errorCustom, setError] = useState(null);

  
  const customWordsFunc = async () => {
    try {
      const response = await fetch("http://localhost:2000/custom", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const result = await response.json();
      setCustom(result);
      setError(null);
      console.log(customWords);
    } catch (error) {
      console.error("Error sending data:", error);
    } finally{
        setLoading(false);
    }
  };

  useEffect( ()=> {
    customWordsFunc(); // fetched data
  }, []);

  return { customWords, loadingCustom, errorCustom, customWordsFunc };
}
