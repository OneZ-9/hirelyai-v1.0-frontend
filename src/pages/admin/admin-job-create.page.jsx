import JobCreateForm from "@/feature-components/admin/JobCreateForm";

function AdminJobCreatePage() {
  return (
    <div>
      <div className="py-8">
        <h2 className="text-3xl sm:text-3xl md:text-4xl">
          Create A Job Posting
        </h2>
      </div>

      <JobCreateForm />
    </div>
  );
}

export default AdminJobCreatePage;
