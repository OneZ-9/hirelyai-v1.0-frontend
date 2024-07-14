import IconButton from "@/components/shared/IconButton";
import ShareButton from "@/components/shared/ShareButton";
import SubInfoTag from "@/components/shared/SubInfoTag";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteJob } from "@/lib/services/api/jobs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Briefcase, CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function JobCard({ job, isAdmin }) {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteJobFn } = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      toast.success("Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err) => toast.error(err.message),
  });

  console.log(isAdmin);

  return (
    <div className="relative">
      {!isAdmin && (
        <ShareButton
          value={`http://localhost:5173/job/${job._id}`}
          className="absolute text-slate-500 dark:text-slate-400 top-5 right-4"
        />
      )}
      {isAdmin && (
        <>
          <IconButton
            className="absolute text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-200 top-5 right-4"
            // onClick={() => {
            // deleteJob(job._id);
            //   navigate(0);
            // }}
            onClick={() => deleteJobFn(job._id)}
            disabled={isDeleting}
          >
            <Trash2 className="w-5 h-5" />
          </IconButton>

          <Link to={`/admin/job/update/${job._id}`}>
            <IconButton className="absolute text-foreground top-5 right-14 text-slate-500 dark:text-slate-400">
              <Pencil className="w-5 h-5" />
            </IconButton>
          </Link>
        </>
      )}

      <Link
        to={isAdmin ? `/admin/job/${job._id}` : `/job/${job._id}`}
        className="block"
      >
        <Card>
          <CardHeader>
            <CardTitle>
              <span className="hover:underline">{job.title}</span>
            </CardTitle>
            {/* <span className="mx-2 text-base text-slate-600 dark:text-slate-400"> */}
            <span className="mx-2 text-base text-themecolor-darkblue dark:text-themecolor-lightblue">
              {job.company}
            </span>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex items-cente gap-x-4 text-slate-500 dark:text-slate-400">
            <SubInfoTag icon={<Briefcase />} label={job.type} />
            <SubInfoTag icon={<MapPin />} label={job.location} />

            <div className="flex items-center gap-2 ml-auto">
              <span>Posted on:</span>
              <SubInfoTag icon={<CalendarDays />} label={job.posted} />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}

export default JobCard;
