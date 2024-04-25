import prisma from "@/lib/prisma";
import JobListItem from "./JobListItem";
import { JobFilterInterface } from "@/lib/validations/jobfilters.schema";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobResultProps {
  filterValues: JobFilterInterface;
  page?: number;
}

export default async function JobResult({
  filterValues: { q, type, location, remote },
  page = 1,
}: Readonly<JobResultProps>) {
  const searchParams: string | undefined = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const jobsPerPage = 6;
  const skips = (page - 1) * jobsPerPage;

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

  const jobsPromise = prisma.job.findMany({
    where: where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip: skips,
  });

  const countPromise = prisma.job.count({
    where: where,
  });

  const [jobs, count] = await Promise.all([jobsPromise, countPromise]);
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
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(count / jobsPerPage)}
          filterValues={{ q, type, location, remote }}
        />
      )}
    </div>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  filterValues: JobFilterInterface;
}

function Pagination({
  currentPage,
  totalPages,
  filterValues: { q, location, remote, type },
}: PaginationProps) {
  function generatePageLink(page: number) {
    const searchParams = new URLSearchParams({
      ...(q && { q }),
      ...(type && { type }),
      ...(location && { location }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });

    return `/?${searchParams.toString()}`;
  }

  return (
    <>
      <div className="flex justify-between">
        <Link
          href={generatePageLink(currentPage - 1)}
          className={cn(
            "flex items-center gap-2 font-semibold",
            currentPage <= 1 && "invisible"
          )}
        >
          <ArrowLeft size={16} />
          Previous Page
        </Link>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}{" "}
        </span>
        <Link
          href={generatePageLink(currentPage + 1)}
          className={cn(
            "flex items-center gap-2 font-semibold",
            currentPage >= totalPages && "invisible"
          )}
        >
          Next Page
          <ArrowRight size={16} />
        </Link>
      </div>
    </>
  );
}
