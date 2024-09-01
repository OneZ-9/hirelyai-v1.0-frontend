import { useCallback, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/lib/services/api/jobs";

import JobCard from "../job/JobCard";
import Spinner from "@/components/shared/Spinner";
import Message from "@/components/shared/Message";
import SearchField from "@/components/shared/SearchField";

function JobSection() {
  const { user, isLoaded } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const [filteredJobs, setFilteredJobs] = useState([]);
  const {
    isLoading,
    data: jobs,
    error,
  } = useQuery({ queryKey: ["jobs"], queryFn: getJobs });

  // const handleSetFilteredJobs = useCallback((filtered) => {
  //   setFilteredJobs(filtered);
  // }, []);

  const filterJobs = useCallback(
    (searchQuery) => {
      const filter = jobs?.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return filter;
    },
    [jobs]
  );

  if (error) throw error;

  return (
    <section id="jobs" className="sm:py-8 max-lg:px-4">
      <div className="flex max-sm:flex-col max-sm:gap-4 items-center justify-between py-6">
        <h2 className="text-3xl sm:text-3xl md:text-4xl">Available Jobs</h2>

        <SearchField
          className="min-w-[250px] md:min-w-[320px] lg:min-w-[480px]"
          placeholder="Search jobs by job title, company, type or location"
          disabled={isLoading}
          filterFunction={filterJobs}
          setFilter={setFilteredJobs}
        />
      </div>

      {isLoading || !isLoaded ? (
        <Spinner />
      ) : (
        <div className="mt-4 flex flex-col gap-y-8">
          {filteredJobs?.length ? (
            filteredJobs?.map((job) => (
              <JobCard job={job} key={job._id} isAdmin={isAdmin} />
            ))
          ) : (
            <Message message="There is no matching results with search..." />
          )}
        </div>
      )}
    </section>
  );
}

export default JobSection;
