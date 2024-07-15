// import useFetchJobs from "../../hooks/useFetchJobs";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/services/api/jobs";

import Spinner from "@/components/shared/Spinner";
import JobCard from "../job/JobCard";
import SearchField from "@/components/shared/SearchField";
import ErrorComponent from "@/components/shared/ErrorComponent";
import Message from "@/components/shared/Message";

function JobPostsSection() {
  // const { jobs, isLoading } = useFetchJobs();
  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });
  const [filteredJobs, setFilteredJobs] = useState([]);

  function filterJobs(searchQuery) {
    const filter = jobs?.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filter;
  }

  if (isLoading) return <Spinner />;
  if (error) return <ErrorComponent />;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between py-6">
        <h2>Current Job Postings</h2>

        <SearchField
          className="min-w-[420px]"
          placeholder="Search jobs by job title, company, type or location"
          disabled={isLoading}
          filterFunction={filterJobs}
          setFilter={setFilteredJobs}
        />
      </div>
      <div className="mt-4 flex flex-col gap-y-4">
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="mt-4 flex flex-col gap-y-8">
            {filteredJobs.length ? (
              filteredJobs?.map((job) => (
                <JobCard key={job._id} job={job} isAdmin={true} />
              ))
            ) : (
              <Message message="There is no matching results with search..." />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default JobPostsSection;
