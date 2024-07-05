import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "@/lib/services/api/jobs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  title: "",
  description: "",
  type: "",
  location: "",
  question1: "",
  question2: "",
  question3: "",
};

function JobCreateForm() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await createJob({
      title: formData.title,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      questions: [formData.question1, formData.question2, formData.question3],
    });

    setFormData(initialState);
    navigate("/admin/jobs");
  }

  return (
    <form className="py-8" onSubmit={handleSubmit}>
      <div>
        <h3>Title</h3>
        <Input
          className="mt-2"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-4">
        <h3>Description</h3>
        <Textarea
          className="mt-2"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-4">
        <h3>Type</h3>
        <Textarea
          className="mt-2"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-4">
        <h3>Location</h3>
        <Textarea
          className="mt-2"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-4">
        <h3>Question 1</h3>
        <Textarea
          className="mt-2"
          name="question1"
          value={formData.question1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mt-4">
        <h3>Question 2</h3>
        <Textarea
          className="mt-2"
          name="question2"
          value={formData.question2}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mt-4">
        <h3>Question 3</h3>
        <Textarea
          className="mt-2"
          name="question3"
          value={formData.question3}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="mt-8 bg-card text-card-foreground">
        Submit
      </Button>
    </form>
  );
}

export default JobCreateForm;
