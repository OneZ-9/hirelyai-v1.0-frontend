import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/services/api/jobs";

import JobCard from "../job/JobCard";
import Spinner from "@/components/shared/Spinner";
import ErrorComponent from "@/components/shared/ErrorComponent";

function JobSection() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });

  if (error) return <ErrorComponent />;

  return (
    <section className="py-8 container">
      <h2>Available Jobs</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4 flex flex-col gap-y-8">
          {jobs.map((job) => (
            <JobCard job={job} key={job._id} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobSection;
