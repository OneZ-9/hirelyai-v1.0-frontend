import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/services/api/jobs";

import JobCard from "../job/JobCard";
import Spinner from "@/components/shared/Spinner";

function JobSection() {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  console.log(isAdmin);
  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });

  return (
    <section className="py-8">
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
