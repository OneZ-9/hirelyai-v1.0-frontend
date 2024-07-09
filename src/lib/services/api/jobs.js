const baseUrl = import.meta.env.VITE_BASE_URL;

// export const getJobs = async () => {
//   const res = await fetch("http://localhost:8000/jobs", {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// };

// export const getJobById = async (id) => {
//   const res = await fetch(`http://localhost:8000/jobs/${id}`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// };

export const createJob = async ({
  company,
  title,
  description,
  type,
  location,
  questions,
  posted,
}) => {
  const token = await window.Clerk.session?.getToken();

  await fetch(`${baseUrl}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      company,
      title,
      description,
      type,
      location,
      questions,
      posted,
    }),
  });
};

export const updateJob = async (updatedJob) => {
  const token = await window.Clerk.session?.getToken();

  await fetch(`${baseUrl}/jobs/${updatedJob._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      company: updatedJob.company,
      title: updatedJob.title,
      description: updatedJob.description,
      type: updatedJob.type,
      location: updatedJob.location,
      questions: updatedJob.questions,
      posted: updatedJob.posted,
    }),
  });
};
