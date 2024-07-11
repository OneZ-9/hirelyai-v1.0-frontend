// import useFetchJobs from "../../hooks/useFetchJobs";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/services/api/jobs";

import Spinner from "@/components/shared/Spinner";
import JobCard from "../job/JobCard";

function JobPostsSection() {
  // const { jobs, isLoading } = useFetchJobs();
  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });
  // console.log(jobs);

  if (isLoading) return <Spinner />;

  return (
    <section className="py-8">
      <h2>Current Job Postings</h2>
      <div className="mt-4 flex flex-col gap-y-4">
        {isLoading ? (
          <Spinner />
        ) : (
          jobs.map((job) => <JobCard key={job._id} job={job} isAdmin={true} />)
        )}
      </div>
    </section>
  );
}

export default JobPostsSection;
