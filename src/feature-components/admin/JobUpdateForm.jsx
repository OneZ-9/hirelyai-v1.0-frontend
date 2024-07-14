import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getJobById, updateJob as updateJobApi } from "@/lib/services/api/jobs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import useFetchJobById from "@/hooks/useFetchJobById";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/shared/Spinner";
import ErrorComponent from "@/components/shared/ErrorComponent";
import toast from "react-hot-toast";
import SpinnerMini from "@/components/shared/SpinnerMini";

const jobFormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  type: z.string().min(1, "Job type not selected"),
  location: z.string().min(1, "Location is required"),
  question1: z.string().min(1, "Question1 is required"),
  question2: z.string().min(1, "Question2 is required"),
  question3: z.string().min(1, "Question3 is required"),
});

function JobUpdateForm() {
  // const { job, isLoading } = useFetchJobById();
  const navigate = useNavigate();
  const { jobId } = useParams();
  const form = useForm({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
      type: "",
      location: "",
      question1: "",
      question2: "",
      question3: "",
    },
  });

  const {
    isLoading: isLoadingJob,
    data: job,
    error: jobError,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobById(jobId),
    enabled: !!jobId, // Only run the query if jobId is truthy
  });

  const queryClient = useQueryClient();
  const { isLoading: isUpdatingJob, mutate: updateJob } = useMutation({
    mutationFn: updateJobApi,
    onSuccess: () => {
      toast.success("Job updated successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      navigate("/admin/jobs", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  useEffect(() => {
    if (job) {
      form.reset({
        title: job.title,
        company: job.company,
        description: job.description,
        type: job.type,
        location: job.location,
        question1: job.questions[0] || "",
        question2: job.questions[1] || "",
        question3: job.questions[2] || "",
      });
    }
  }, [job, form]);

  function onSubmit(data) {
    updateJob({
      _id: job._id,
      title: data.title,
      company: data.company,
      type: data.type,
      description: data.description,
      location: data.location,
      questions: [data.question1, data.question2, data.question3],
      posted: job.posted,
    });
  }

  if (jobError) return <ErrorComponent />;
  if (isLoadingJob) return <Spinner />;

  return (
    <Form {...form}>
      <form className="py-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                <h3>Title</h3>
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-2 h-10"
                  placeholder="Software Engineer"
                  disabled={isLoadingJob || isUpdatingJob}
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
          name="company"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                <h3>Company</h3>
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-2 h-10"
                  placeholder="ABC Company pvt Ltd"
                  disabled={isLoadingJob || isUpdatingJob}
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
          name="description"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                <h3>Description</h3>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="mt-2 h-10"
                  placeholder="We are looking for a highly skilled and experienced Software Engineer to join our dynamic team..."
                  disabled={isLoadingJob || isUpdatingJob}
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 grid grid-cols-2 gap-x-5">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>
                  <h3>Location</h3>
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 h-10"
                    {...field}
                    placeholder="Colombo, Sri Lanka"
                    disabled={isLoadingJob || isUpdatingJob}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>
                  <h3>Type</h3>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={job?.type || field.value}
                  disabled={isLoadingJob || isUpdatingJob}
                >
                  <FormControl>
                    <SelectTrigger className="mt-2 h-10" id="type">
                      <SelectValue placeholder="Select a job type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Contract-based">
                      Contract-based
                    </SelectItem>
                    <SelectItem value="Project-based">Project-based</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="mt-14 mb-20" />

        <FormField
          control={form.control}
          name="question1"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                <h3>Question 1</h3>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="mt-2 h-10"
                  disabled={isLoadingJob || isUpdatingJob}
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
          name="question2"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                <h3>Question 2</h3>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="mt-2 h-10"
                  disabled={isLoadingJob || isUpdatingJob}
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
          name="question3"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>
                <h3>Question 3</h3>
              </FormLabel>
              <FormControl>
                <Textarea
                  className="mt-2 h-10"
                  disabled={isLoadingJob || isUpdatingJob}
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-4 mt-8 mb-12 justify-end">
          <Button
            type="submit"
            variant="default"
            disabled={isLoadingJob || isUpdatingJob}
          >
            {isUpdatingJob ? (
              <span className="flex items-center gap-2">
                <SpinnerMini />
                Updating Job
              </span>
            ) : (
              "Save and Update Job"
            )}
          </Button>
          <Button
            className="w-fit"
            variant="outline"
            disabled={isLoadingJob || isUpdatingJob}
            onClick={() => {
              navigate("/admin/jobs");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default JobUpdateForm;
