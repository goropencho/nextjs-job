import JobPage from "@/components/JobPage";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import prisma from "@/lib/common/prisma";

interface SlugProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) {
    return notFound();
  }

  return job;
});

export async function generateMetadata({
  params: { slug },
}: SlugProps): Promise<Metadata> {
  const job = getJob(slug);
  return {
    title: `${(await job).title}`,
  };
}

export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    select: {
      slug: true,
    },
  });

  return jobs?.map(({ slug }) => slug);
}

export default async function Page({ params: { slug } }: Readonly<SlugProps>) {
  const job = await getJob(slug);

  const { applicationUrl, applicationEmail } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application email or link.");
    notFound();
  }

  return (
    <main className=" max-w-5xl m-auto my-10 flex flex-col md:flex-row items-center gap-5 md:items-start">
      <JobPage job={job} />
      <aside>
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
            Apply Now
          </a>
        </Button>
      </aside>
    </main>
  );
}
