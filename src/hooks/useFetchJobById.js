import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function useFetchJobById() {
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    if (!params.id) return;

    async function getJobById() {
      try {
        setIsLoading(true);
        // setError("");

        const token = await window.Clerk.session?.getToken();

        const res = await fetch(`${baseUrl}/jobs/${params.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Jobs data fetching error");

        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getJobById();
  }, [params]);

  return { job, isLoading };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
