import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterInterface } from "@/lib/validations/jobfilters.schema";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface JobResultProps {
  filterValues: JobFilterInterface;
}

export default async function JobResult({
  filterValues: { q, type, location, remote },
}: Readonly<JobResultProps>) {
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
            locationType: { search: searchParams },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where: where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="space-y-3 grow">
      {jobs.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="text-center m-auto">
          No Jobs Found. Try adjusting your search filter.
        </p>
      )}
    </div>
  );
}
