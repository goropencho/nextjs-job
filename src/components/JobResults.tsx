import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterInterface } from "@/lib/validations/jobfilters.schema";
import { Prisma } from "@prisma/client";

interface JobResultProps {
  filterValues: JobFilterInterface;
}

export default async function JobResult({
  filterValues: { q, type, location, remote },
}: JobResultProps) {
  const searchParams: string | undefined = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchParams
    ? {
        OR: [
          {
            title: { search: searchParams },
            companyName: { search: searchParams },
            description: { search: searchParams },
            type: { search: searchParams },
            location: { search: searchParams },
          },
        ],
      }
    : {};
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="space-y-3 grow">
      {jobs.map((job) => (
        <JobListItem job={job} key={job.id} />
      ))}
    </div>
  );
}
