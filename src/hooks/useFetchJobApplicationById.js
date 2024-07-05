import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function useFetchJobApplicationById() {
  const [jobApplication, setJobApplication] = useState([]);
  const [isLoadingJobApplication, setIsLoadingJobApplication] = useState(false);
  // const [error, setError] = useState("");
  const { applicationId } = useParams();
  // console.log(params.id);

  useEffect(() => {
    if (!applicationId) return;

    async function getJobApplicationById() {
      try {
        setIsLoadingJobApplication(true);
        // setError("");
        const token = await window.Clerk.session.getToken();

        const res = await fetch(`${baseUrl}/jobApplications/${applicationId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Job application fetching error");

        const data = await res.json();
        setJobApplication(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoadingJobApplication(false);
      }
    }
    getJobApplicationById();
  }, [applicationId]);

  return { jobApplication, isLoadingJobApplication };
}

//   useEffect(() => {
//     setIsLoading(true);
//     getJobs().then((data) => {
//       setJobs(data);
//       setIsLoading(false);
//     });
//   }, []);
