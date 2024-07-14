// import useFetchJobById from "../../hooks/useFetchJobById";
// import useFetchJobApplicationsByJobId from "../../hooks/useFetchJobApplicationsByJobId";
import { getJobById } from "@/lib/services/api/jobs";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import Spinner from "@/components/shared/Spinner";
import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import JobApplicationCard from "@/feature-components/admin/JobApplicationCard";
import { getJobApplicationsForJob } from "@/lib/services/api/jobApplications";
import ErrorComponent from "@/components/shared/ErrorComponent";

function JobPostView() {
  // const { job, isLoading } = useFetchJobById();
  // const { jobApplications, isLoadingJobApplications } =
  //   useFetchJobApplicationsByJobId();
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

  if (jobError || jobApplicationsError) return <ErrorComponent />;

  if (isLoadingJob || isLoadingJobApplications) return <Spinner />;

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <span className="mx-2 text-base text-themecolor-darkblue dark:text-themecolor-lightblue text-slate-500 dark:text-slate-400">
          {job?.company}
        </span>
        <div className="flex items-center gap-x-4 mt-4 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>

          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 py-4 text-slate-500 dark:text-slate-400">
        <p>{job?.description}</p>
      </div>
      <Separator />

      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications?.map((application) => (
            <JobApplicationCard
              key={application._id}
              fullName={application.fullName}
              id={application._id}
              jobId={job._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobPostView;
