import prisma from "@/lib/common/prisma";

async function createAdmin() {
  const checkIfExists = await prisma.user.findFirst({
    where: {
      email: "goro@mailinator.com",
    },
  });

  if (checkIfExists) {
    return;
  }

  await prisma.user.create({
    data: {
      name: "Goro Admin",
      email: "goro@mailinator.com",
      password: "Test@123",
    },
  });

  return;
}

createAdmin();
