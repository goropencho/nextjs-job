import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { JobFilterInterface } from "@/lib/validations/jobfilters.schema";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
}

function getTitle({ q, location, remote, type }: JobFilterInterface) {
  const title = q
    ? `${q} Jobs`
    : type
      ? `${type} Jobs`
      : remote
        ? `Remote Developer Jobs`
        : "All Developer Jobs";
  const suffix = location ? ` in ${location}.` : "";
  return `${title}${suffix}`;
}

export function generateMetadata({
  searchParams: { q, location, remote, type },
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Flow Jobs`,
  };
}

export default async function Home({
  searchParams: { q, type, location, remote },
}: Readonly<PageProps>) {
  const filterValues: JobFilterInterface = {
    q,
    type,
    location,
    remote: remote === "true",
  };
  return (
    <main className="max-w-5xl m-auto px-3 my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <JobFilterSidebar defaultValues={filterValues} />
        <JobResult filterValues={filterValues} />
      </section>
    </main>
  );
}
