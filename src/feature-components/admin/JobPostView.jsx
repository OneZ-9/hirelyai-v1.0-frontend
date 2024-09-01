// import useFetchJobById from "../../hooks/useFetchJobById";
// import useFetchJobApplicationsByJobId from "../../hooks/useFetchJobApplicationsByJobId";
import { useCallback, useState } from "react";
import { getJobById } from "@/lib/services/api/jobs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Spinner from "@/components/shared/Spinner";
import { Separator } from "@/components/ui/separator";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import JobApplicationCard from "@/feature-components/admin/JobApplicationCard";
import { getJobApplicationsForJob } from "@/lib/services/api/jobApplications";
import Message from "@/components/shared/Message";
import SearchField from "@/components/shared/SearchField";
import SubInfoTag from "@/components/shared/SubInfoTag";

function JobPostView() {
  // const { job, isLoading } = useFetchJobById();
  // const { jobApplications, isLoadingJobApplications } =
  //   useFetchJobApplicationsByJobId();
  const [filteredApplications, setFilteredApplications] = useState();
  const { jobId } = useParams();
  const {
    isLoading: isLoadingJob,
    data: job,
    error: jobError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId, // Only run the query if jobId is truthy
  });

  const {
    isLoading: isLoadingJobApplications,
    data: jobApplications,
    error: jobApplicationsError,
  } = useQuery({
    queryKey: ["jobApplications", jobId],
    queryFn: () => getJobApplicationsForJob(jobId),
    enabled: !!jobId, // Only run the query if jobId is truthy
  });

  const filterApplications = useCallback(
    (searchQuery) => {
      const filter = jobApplications?.filter((jobApplication) =>
        jobApplication.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      return filter;
    },
    [jobApplications]
  );

  if (isLoadingJob || isLoadingJobApplications) return <Spinner />;
  if (jobError || jobApplicationsError) throw jobError || jobApplicationsError;

  return (
    <div>
      <div className="mt-10 max-lg:px-4">
        <div>
          <h2 className="max-sm:text-2xl">{job?.title}</h2>
          <span className="mx-2 max-sm:text-md text-themecolor-darkblue dark:text-themecolor-lightblue text-slate-500 dark:text-slate-400">
            {job?.company}
          </span>
          <div className="flex items-center gap-x-4 mt-4 text-slate-500 dark:text-slate-400">
            <SubInfoTag icon={<Briefcase />} label={job?.type} />
            <SubInfoTag icon={<MapPin />} label={job?.location} />

            <div className="flex items-center gap-2 ml-auto text-slate-500 dark:text-slate-400">
              <span className="max-sm:hidden max-md:text-xs">Posted on:</span>
              <SubInfoTag icon={<CalendarDays />} label={job?.posted} />
            </div>
          </div>
        </div>

        <div className="text-xs sm:text-sm md:text-base mt-8 py-4 text-slate-500 dark:text-slate-400">
          <p>{job?.description}</p>
        </div>
      </div>
      <Separator />

      <div className="py-8">
        <div className="flex max-sm:flex-col max-sm:gap-4 items-center justify-between py-6">
          <h2 className="text-3xl sm:text-3xl md:text-4xl">Job Applications</h2>

          <SearchField
            className="min-w-[250px] md:min-w-[320px] lg:min-w-[480px]"
            placeholder="Search job applications by applicant"
            disabled={isLoadingJobApplications}
            filterFunction={filterApplications}
            setFilter={setFilteredApplications}
          />
        </div>
        <div className="mt-4 flex flex-col gap-y-4">
          {!filteredApplications?.length ? (
            <Message message="No job application to show.." />
          ) : (
            filteredApplications?.map((application) => (
              <JobApplicationCard
                key={application._id}
                fullName={application.fullName}
                id={application._id}
                jobId={job._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default JobPostView;
