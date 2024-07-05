import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function useFetchJobApplicationsByJobId() {
  const [jobApplications, setJobApplications] = useState([]);
  const [isLoadingJobApplications, setIsLoadingJobApplications] =
    useState(false);
  // const [error, setError] = useState("");
  const params = useParams();
  // console.log(params.id);

  useEffect(() => {
    if (!params.id) return;

    async function getJobApplicationsForJob() {
      try {
        setIsLoadingJobApplications(true);
        // setError("");

        const token = await window.Clerk.session?.getToken();

        const res = await fetch(
          `${baseUrl}/jobApplications?jobId=${params.id}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Job applications data fetching error");

        const data = await res.json();
        setJobApplications(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoadingJobApplications(false);
      }
    }
    getJobApplicationsForJob();
  }, [params]);

  return { jobApplications, isLoadingJobApplications };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
