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
import { Briefcase, CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function JobCard({ job, isAdmin }) {
  const navigate = useNavigate();
  // console.log(isAdmin);

  return (
    <div className="relative">
      {!isAdmin && (
        <ShareButton
          value={`http://localhost:5173/job/${job._id}`}
          className="absolute text-primary-foreground top-5 right-4"
        />
      )}
      {isAdmin && (
        <>
          <IconButton
            className="absolute text-primary-foreground top-5 right-4"
            onClick={() => {
              deleteJob(job._id);
              navigate(0);
            }}
          >
            <Trash2 className="w-5 h-5" />
          </IconButton>

          <Link to={`/admin/job/update/${job._id}`}>
            <IconButton className="absolute text-primary-foreground top-5 right-14">
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
            <CardTitle>{job.title}</CardTitle>
            <span className="mx-2 text-sm">{job.company}</span>{" "}
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex items-cente gap-x-4 ">
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
