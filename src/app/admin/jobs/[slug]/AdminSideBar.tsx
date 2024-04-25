import FormSubmitButton from "@/components/FormSubmitButton";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import {
  approveSubmission,
  deleteSubmission,
} from "@/app/admin/jobs/[slug]/actions";

interface AdminSideProp {
  job: Job;
}

export default function AdminSideBar({ job }: AdminSideProp) {
  return (
    <aside className="flex w-[200px] flex-none flex-row md:flex-col items-center gap-2 md:items-stretch">
      {job.approved ? (
        <span>Approved</span>
      ) : (
        <>
          <ApproveSubmissionButton jobId={job.id} />
        </>
      )}
      <DeleteButton jobId={job.id} />
    </aside>
  );
}

interface ApproveSubmissionButtonProps {
  jobId: string;
}
interface DeleteButtonProps {
  jobId: string;
}

function ApproveSubmissionButton({ jobId }: ApproveSubmissionButtonProps) {
  const [formState, formAction] = useFormState(approveSubmission, undefined);

  return (
    <form action={formAction}>
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteButton({ jobId }: DeleteButtonProps) {
  const [formState, formAction] = useFormState(deleteSubmission, undefined);

  return (
    <form action={formAction}>
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
