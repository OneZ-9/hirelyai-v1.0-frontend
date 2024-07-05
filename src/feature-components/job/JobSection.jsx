import useFetchJobs from "../../hooks/useFetchJobs";

import JobCard from "../job/JobCard";
import Spinner from "@/components/shared/Spinner";

function JobSection() {
  const { jobs, isLoading } = useFetchJobs();

  return (
    <section className="py-8">
      <h2>Available Jobs</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-4 flex flex-col gap-y-8">
          {jobs.map((job) => (
            <JobCard job={job} key={job._id} />
          ))}
        </div>
      )}
    </section>
  );
}

export default JobSection;
