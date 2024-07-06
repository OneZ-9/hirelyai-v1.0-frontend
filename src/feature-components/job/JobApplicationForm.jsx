import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useFetchJobById from "../../hooks/useFetchJobById";

import { createJobApplication } from "@/lib/services/api/jobApplications";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import Spinner from "@/components/shared/Spinner";
import SubInfoTag from "@/components/shared/SubInfoTag";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const jobApplycationFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  answer1: z.string().min(1, "Question1 is required"),
  answer2: z.string().min(1, "Question2 is required"),
  answer3: z.string().min(1, "Question3 is required"),
});

function JobApplicationForm() {
  // const [formData, setFormData] = useState(initialState);
  // const { fullName, answer1, answer2, answer3 } = formData;
  const params = useParams();
  const { job, isLoading } = useFetchJobById();
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(jobApplycationFormSchema),
    defaultValues: {
      fullName: "",
      answer1: "",
      answer2: "",
      answer3: "",
    },
  });

  function onSubmit(data) {
    // console.log(data);

    createJobApplication({
      userId: user?.id,
      fullName: data.fullName,
      answers: [data.answer1, data.answer2, data.answer3],
      job: params.id,
      submitted: formatDate(new Date(), "dd/MM/yyyy"),
    });
    // setFormData(initialState);
    navigate("/");
  }

  if (isLoading || !isLoaded) return <Spinner />;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div>
      <div>
        <h2>{job?.title}</h2>
        <span className="mx-2 text-sm">{job?.company}</span>
        <div className="flex items-center gap-x-4 mt-4">
          <SubInfoTag icon={<Briefcase />} label={job?.type} />
          <SubInfoTag icon={<MapPin />} label={job?.location} />

          <div className="flex items-center gap-2 ml-auto">
            <span>Posted on:</span>
            <SubInfoTag icon={<CalendarDays />} label={job?.posted} />
          </div>
        </div>
      </div>

      <div className="mt-8 py-4">
        <p>{job?.description}</p>
      </div>
      <Separator />

      <Form {...form}>
        <form
          className="py-8 flex flex-col gap-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 h-10"
                    placeholder="John Smith"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer1"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>{job?.questions?.at(0)}</FormLabel>
                <FormControl>
                  <Textarea
                    className="mt-2 h-10"
                    placeholder="Your answer..."
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer2"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>{job?.questions?.at(1)}</FormLabel>
                <FormControl>
                  <Textarea
                    className="mt-2 h-10"
                    placeholder="Your answer..."
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="answer3"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>{job?.questions?.at(2)}</FormLabel>
                <FormControl>
                  <Textarea
                    className="mt-2 h-10"
                    placeholder="Your answer..."
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-4">
            <Button
              type="submit"
              className="mt-8 bg-card text-card-foreground w-fit"
            >
              Submit
            </Button>
            <Button
              className="mt-8 w-fit "
              variant="outline"
              onClick={() => {}}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default JobApplicationForm;
