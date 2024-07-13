import { Link, useParams } from "react-router-dom";
// import useFetchJobApplicationById from "../../hooks/useFetchJobApplicationById";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Spinner from "@/components/shared/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicationById } from "@/lib/services/api/jobApplications";

function JobApplicationView() {
  // const { jobApplication, isLoadingJobApplication } =
  //   useFetchJobApplicationById();
  const { applicationId } = useParams();
  const { isLoading: isLoadingJobApplication, data: jobApplication } = useQuery(
    {
      queryKey: ["jobApplication", applicationId],
      queryFn: () => getJobApplicationById(applicationId),
    }
  );

  const handleDownload = () => {
    const link = document.createElement("a");
    // data:[<MIME-type>];base64,[<base64-data>] Tells the browser that the data should be treated as a file of the specified type.
    link.href = `data:${jobApplication.resume.contentType};base64,${jobApplication.resume.data}`;
    link.download = jobApplication.resume.originalName || "resume.pdf";
    link.click();
  };

  if (isLoadingJobApplication) return <Spinner />;

  return (
    <div className="flex flex-col gap-y-4">
      <Card className="bg-primary">
        <CardHeader className="flex-row items-center gap-x-4">
          <CardTitle className="text-primary-foreground">
            {jobApplication?.fullName}
          </CardTitle>
          <Badge
            className={cn({
              "bg-red-500":
                jobApplication?.rating?.toLocaleLowerCase() === "bad",
              "bg-orange-400":
                jobApplication?.rating?.toLocaleLowerCase() === "moderate",
              "bg-teal-500":
                jobApplication?.rating?.toLocaleLowerCase() === "good",
            })}
          >
            {jobApplication?.rating}
          </Badge>
          <span className="px-4 ml-auto text-primary-foreground">
            Sumbitted on: {jobApplication?.submitted}
          </span>
        </CardHeader>
      </Card>

      <Card className="py-4 px-8">
        {jobApplication?.answers?.map((answer, i) => {
          return <p key={i}>{answer}</p>;
        })}
      </Card>
      <div className="flex items-center gap-6 mb-12 justify-end">
        <Button variant="link" asChild>
          <Link to={"/admin/jobs"}>Back</Link>
        </Button>
        <Button onClick={handleDownload}>Download Resume</Button>
      </div>
    </div>
  );
}

export default JobApplicationView;
