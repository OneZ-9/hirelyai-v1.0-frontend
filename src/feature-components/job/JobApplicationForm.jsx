import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createJobApplication as createJobApplicationApi } from "@/lib/services/api/jobApplications";
// import useFetchJobById from "../../hooks/useFetchJobById";

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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobById } from "@/lib/services/api/jobs";
import toast from "react-hot-toast";
import SpinnerMini from "@/components/shared/SpinnerMini";
import ErrorComponent from "@/components/shared/ErrorComponent";

const jobApplycationFormSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  answer1: z.string().min(1, "Your answer is required"),
  answer2: z.string().min(1, "Your answer is required"),
  answer3: z.string().min(1, "Your answer is required"),
  resume: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "A resume file is required",
  }),
});

function JobApplicationForm() {
  // const { job, isLoading } = useFetchJobById();
  const { user, isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { jobId } = useParams();
  const {
    isLoading: isLoadingJob,
    data: job,
    error: errorJob,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId, // Only run the query if jobId is truthy
  });

  const {
    isLoading: isSubmittingJobApplication,
    mutate: createJobApplication,
  } = useMutation({
    mutationFn: createJobApplicationApi,
    onSuccess: () => {
      toast.success("Your job application submitted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobApplications"] });
      navigate("/", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  const form = useForm({
    resolver: zodResolver(jobApplycationFormSchema),
    defaultValues: {
      fullName: "",
      answer1: "",
      answer2: "",
      answer3: "",
      resume: null,
    },
  });

  function onSubmit(data) {
    if (data.resume[0].size > 10 * 1024 * 1024) {
      alert("File size exceeds the 10MB limit.");
      return;
    }

    // Cannot directly pass a object to createJobApplication()  with binary data
    // Use built-in FormData()
    const formData = new FormData();

    formData.append("userId", user?.id);
    formData.append("fullName", data.fullName);
    formData.append(
      "answers",
      JSON.stringify([data.answer1, data.answer2, data.answer3])
    );
    formData.append("resume", data.resume[0]); // Add the resume file
    formData.append("job", jobId);
    formData.append("submitted", formatDate(new Date(), "dd/MM/yyyy"));

    // Log FormData contents for debugging
    // for (const [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }

    createJobApplication(formData);
  }

  if (errorJob) return <ErrorComponent />;
  if (isLoadingJob || !isLoaded) return <Spinner />;

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="mt-10 container">
      <div>
        <h2>{job?.title}</h2>
        <span className="mx-2 text-base text-themecolor-darkblue dark:text-themecolor-lightblue text-slate-500 dark:text-slate-400">
          {job?.company}
        </span>
        <div className="flex items-center gap-x-4 mt-4 text-slate-500 dark:text-slate-400">
          <SubInfoTag icon={<Briefcase />} label={job?.type} />
          <SubInfoTag icon={<MapPin />} label={job?.location} />

          <div className="flex items-center gap-2 ml-auto text-slate-500 dark:text-slate-400">
            <span>Posted on:</span>
            <SubInfoTag icon={<CalendarDays />} label={job?.posted} />
          </div>
        </div>
      </div>

      <div className="mt-8 py-4 text-slate-500 dark:text-slate-400">
        <p>{job?.description}</p>
      </div>
      <Separator className="mb-6 mt-2" />

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
                <FormLabel className="text-base">Full Name</FormLabel>
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
                <FormLabel className="text-base">
                  {job?.questions?.at(0)}
                </FormLabel>
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
                <FormLabel className="text-base">
                  {job?.questions?.at(1)}
                </FormLabel>
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
                <FormLabel className="text-base">
                  {job?.questions?.at(2)}
                </FormLabel>
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
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Upload resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    className="mt-2 h-10 w-auto"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormDescription>
                  *only accept pdf format and maximum file size 10MB.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-4 mb-12 justify-end">
            <Button
              type="submit"
              variant="default"
              // className="mt-8 bg-card text-card-foreground w-fit"
              className="mt-8 w-fit"
            >
              {isSubmittingJobApplication ? (
                <span className="flex items-center gap-2">
                  <SpinnerMini />
                  Submitting
                </span>
              ) : (
                "Submit Application"
              )}
            </Button>

            <Button
              className="mt-8 w-fit"
              variant="outline"
              onClick={() => {
                form.reset();
              }}
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
