import { useNavigate } from "react-router-dom";
import { createJob } from "@/lib/services/api/jobs";
import { formatDate } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

const jobFormSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company name is required"),
  description: z.string().min(1, "Job description is required"),
  type: z.string().min(1, "Job type not selected"),
  location: z.string().min(1, "Location is required"),
  question1: z.string().min(1, "Question1 is required"),
  question2: z.string().min(1, "Question2 is required"),
  question3: z.string().min(1, "Question3 is required"),
});

function JobCreateForm() {
  const navigate = useNavigate();
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

  async function onSubmit(data) {
    await createJob({
      title: data.title,
      company: data.company,
      type: data.type,
      description: data.description,
      location: data.location,
      questions: [data.question1, data.question2, data.question3],
      posted: formatDate(new Date(), "dd/MM/yyyy"),
    });
    // setFormData(initialState);
    navigate("/admin/jobs");
  }

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
            <FormItem>
              <FormLabel>
                <h3>Company</h3>
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-2 h-10"
                  placeholder="ABC Company pvt Ltd"
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
                  defaultValue={field.value}
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
                <Textarea className="mt-2 h-10" {...field} />
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
                <Textarea className="mt-2 h-10" {...field} />
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
                <Textarea className="mt-2 h-10" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-8 bg-card text-card-foreground">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default JobCreateForm;
