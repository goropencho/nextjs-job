"use server";

import { toSlug } from "@/lib/utils";
import { CreateJobSchema } from "@/lib/validations/jobfilters.schema";
import { nanoid } from "nanoid";
import path from "path";
import prisma from "@/lib/common/prisma";
import { put } from "@vercel/blob";
import { string } from "zod";
import { redirect } from "next/navigation";

export default async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    title,
    type,
    companyName,
    companyLogo,
    locationType,
    location,
    applicationEmail,
    applicationUrl,
    description,
    salary,
  } = CreateJobSchema.parse(values);

  const slug = `${toSlug(title)}-${nanoid(10)}}`;

  let companyLogoUrl: string | undefined;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug: slug,
      title,
      type,
      companyName: companyName.trim(),
      companyLogoUrl,
      locationType,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
      salary: parseInt(salary),
    },
  });

  redirect("/job-submitted");
}
