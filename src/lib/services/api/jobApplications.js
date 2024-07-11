const baseUrl = import.meta.env.VITE_BASE_URL;

// export const createJobApplication = async ({
//   userId,
//   fullName,
//   job,
//   answers,
// }) => {
//   await fetch("http://localhost:8000/jobApplications", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       userId: userId,
//       fullName: fullName,
//       job,
//       answers,
//     }),
//   });
// };

// export const getJobApllicationsForJob = async (id) => {
//   const res = await fetch(`http://localhost:8000/jobApplications?jobId=${id}`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// };

// export const getJobApplicationById = async (id) => {
//   const res = await fetch(`http://localhost:8000/jobApplications/${id}`, {
//     method: "GET",
//   });
//   const data = await res.json();
//   return data;
// };

export const createJobApplication = async (formData) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobApplications`, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Failed to submit the jobApplication:", error);
    throw error;
  }
};

export const getJobApplicationsForJob = async (jobId) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobApplications?jobId=${jobId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch jobApplications:", error);
    throw error;
  }
};

export const getJobApplicationById = async (applicationId) => {
  const token = await window.Clerk.session?.getToken();

  try {
    const res = await fetch(`${baseUrl}/jobApplications/${applicationId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch jobApplications:", error);
    throw error;
  }
};
