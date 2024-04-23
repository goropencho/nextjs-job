import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterInterface } from "@/lib/validations/jobfilters.schema";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: PageProps) {
  const filterValues: JobFilterInterface = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Developer Jobs</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar />
        <JobResult filterValues={filterValues} />
      </section>
    </main>
  );
}
