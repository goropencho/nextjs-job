import JobPage from "@/components/JobPage";
import prisma from "@/lib/common/prisma";
import { notFound } from "next/navigation";
import AdminSideBar from "./AdminSideBar";
import { validateRequest } from "@/lib/common/lucia";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params: { slug } }: PageProps) {
  slug = decodeURIComponent(slug);
  const job = await prisma.job.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!job) notFound();

  const { user } = await validateRequest();

  return (
    <main className="flex m-auto my-10 max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} />
      <AdminSideBar job={job} />
    </main>
  );
}
