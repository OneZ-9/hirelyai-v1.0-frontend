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
const HOST_NAME = import.meta.env.VITE_HOST_NAME;

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

  // console.log(isAdmin);

  return (
    <div className="relative">
      {!isAdmin && (
        <ShareButton
          value={`${HOST_NAME}/job/${job._id}`}
          className="absolute text-slate-500 dark:text-slate-400 top-5 right-4 max-sm:top-6 max-sm:right-2"
        />
      )}
      {isAdmin && (
        <>
          <IconButton
            className="absolute text-destructive hover:text-destructive hover:bg-red-100 dark:hover:bg-red-200 top-5 right-4 max-sm:top-6 max-sm:right-3"
            // onClick={() => {
            // deleteJob(job._id);
            //   navigate(0);
            // }}
            onClick={() => deleteJobFn(job._id)}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
          </IconButton>

          <Link to={`/admin/job/update/${job._id}`}>
            <IconButton className="absolute text-foreground top-5 right-14 max-sm:top-6 max-sm:right-10 text-slate-500 dark:text-slate-400">
              <Pencil className="w-4 h-4 md:w-5 md:h-5" />
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
              <span className="text-sm sm:text-base md:text-2xl hover:underline inline-block max-w-[80%]">
                {job.title}
              </span>
            </CardTitle>
            {/* <span className="mx-2 text-base text-slate-600 dark:text-slate-400"> */}
            <span className="text-xs sm:text-base mx-2 text-themecolor-darkblue dark:text-themecolor-lightblue">
              {job.company}
            </span>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex items-cente gap-x-4 text-slate-500 dark:text-slate-400">
            <SubInfoTag
              icon={<Briefcase className="w-4 h-4" />}
              label={job.type}
            />
            <SubInfoTag
              icon={<MapPin className="w-4 h-4" />}
              label={job.location}
            />

            <div className="flex items-center gap-2 ml-auto">
              <span className="max-sm:hidden max-md:text-xs">Posted on:</span>
              <SubInfoTag
                icon={<CalendarDays className="w-4 h-4" />}
                label={job.posted}
              />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
}

export default JobCard;
