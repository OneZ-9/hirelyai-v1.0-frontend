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

export const getJobs = async () => {
  try {
    const res = await fetch(`${baseUrl}/jobs`, {
      method: "GET",
    });

    if (!res.ok) throw new Error(`Error: ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed fetch jobs:", error);
    throw error;
  }
};

export const getJobById = async (jobId) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed fetch the job:", error);
    throw error;
  }
};

export const createJob = async ({
  title,
  company,
  description,
  type,
  location,
  questions,
  posted,
}) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        company,
        description,
        type,
        location,
        questions,
        posted,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Failed to create the job:", error);
    throw error;
  }
};

export const updateJob = async (updatedJob) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobs/${updatedJob._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: updatedJob.title,
        company: updatedJob.company,
        description: updatedJob.description,
        type: updatedJob.type,
        location: updatedJob.location,
        questions: updatedJob.questions,
        posted: updatedJob.posted,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Failed to update the job:", error);
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Failed to delete the job:", error);
    throw error;
  }
};
