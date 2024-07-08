// const URL = import.meta.env.BASE_URL;
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function createJobApplication(formData) {
  const token = await window.Clerk.session?.getToken();

  await fetch(`${baseUrl}/jobApplications`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
}

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
