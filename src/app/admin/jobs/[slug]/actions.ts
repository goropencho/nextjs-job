import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { redirect } from "next/navigation";

type FormState = { error?: string } | undefined;
export async function approveSubmission(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  try {
    const jobId = formdata.get("jobId") as string;
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorized");
    }

    await prisma.job.update({
      where: { id: jobId },
      data: {
        approved: true,
      },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      error: message,
    };
  }
  redirect("/admin");
}

export async function deleteSubmission(
  prevState: FormState,
  formdata: FormData
): Promise<FormState> {
  try {
    const jobId = formdata.get("jobId") as string;
    const user = await currentUser();

    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorized");
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return {
      error: message,
    };
  }

  redirect("/admin");
}
