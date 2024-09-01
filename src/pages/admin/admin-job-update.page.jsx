import JobUpdateForm from "@/feature-components/admin/JobUpdateForm";

function AdminJobUpdatePage() {
  return (
    <div>
      <div className="py-8">
        <h2 className="text-3xl sm:text-3xl md:text-4xl">
          Update Your Job Posting
        </h2>
      </div>

      <JobUpdateForm />
    </div>
  );
}

export default AdminJobUpdatePage;
