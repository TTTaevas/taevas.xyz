import React, {useState, useEffect} from "react";

/** Takes care of getting data regularly */
export default function DataHandler<T extends unknown | undefined>(url: string, updateEveryXSeconds: number) {
  const [data, setData]: [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] = useState();
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);

  // Try to get and set data
  const updateData = async () => {
    try {
      setData(await fetch(url).then(async r => r.json()));
      setError(false);
    } catch {
      setError(true);
    } finally {
      setCount(count + 1);
    }
  };

  // After the number of requests done goes up, set a timeout for a new request
  useEffect(() => {
    // After a certain amount of time has passed, make a new request
    const interval = (error || !data ? 60 : updateEveryXSeconds) * 1000;
    const timeout = setTimeout(() => updateData(), interval);
    return () => clearTimeout(timeout);
  }, [count]);

  // Make the first request
  useEffect(() => {
    updateData();
  }, []);

  return {
    data,
    setData,
    error,
    setError,
  };
}