import { useEffect, useState } from "react";
import { getCodeMeta } from "../api";

export default function useCodeMeta(slug) {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    getCodeMeta(slug)
      .then((data) => mounted && setMeta(data))
      .catch(
        (err) =>
          mounted && setError(err?.response?.data?.error || "Failed to load")
      )
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [slug]);

  return { meta, loading, error };
}
