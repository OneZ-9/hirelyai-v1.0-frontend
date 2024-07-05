import useFetchJobById from "../../hooks/useFetchJobById";
import useFetchJobApplicationsByJobId from "../../hooks/useFetchJobApplicationsByJobId";

import Spinner from "@/components/shared/Spinner";
import { Separator } from "@/components/ui/separator";
import { Briefcase, MapPin } from "lucide-react";
import JobApplicationCard from "@/feature-components/admin/JobApplicationCard";

function JobPostView() {
  const { job, isLoading } = useFetchJobById();
  const { jobApplications, isLoadingJobApplications } =
    useFetchJobApplicationsByJobId();
  // console.log(jobApplications);

  if (isLoading || isLoadingJobApplications) return <Spinner />;

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job?.type}</span>
          </div>

          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job?.location}</span>
          </div>
        </div>
        {/* <div className="gap-x-4 flex items-center mt-4">
    <Badge>NodeJS</Badge>
    <Badge>ReactJS</Badge>
    <Badge>AWS</Badge>
  </div> */}
      </div>

      <div className="mt-4 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />

      <div className="py-8">
        <h2>Job Applications</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobApplications.map((application) => (
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
