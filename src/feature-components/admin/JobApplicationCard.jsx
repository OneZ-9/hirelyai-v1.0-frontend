import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function JobApplicationCard({ id, jobId, fullName }) {
  return (
    <Link to={`/admin/job/${jobId}/application/${id}`}>
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="max-sm:text-lg md:text-2xl max-w-[80%]">
            {fullName}
          </CardTitle>
          <Button className="max-sm:text-xs hover:underline">View</Button>
        </CardHeader>
      </Card>
    </Link>
  );
}

JobApplicationCard.propTypes = {
  id: PropTypes.string,
  jobId: PropTypes.string,
  fullName: PropTypes.string,
};

export default JobApplicationCard;
