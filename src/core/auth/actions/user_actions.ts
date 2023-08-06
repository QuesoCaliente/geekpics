import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password ?? "");

  if (!isPasswordValid) return null;

  return user;
};

const createUser = async (email: string, password: string) => {
  const userRole = await prisma.role.findFirst({
    where: { name: "User" },
  });
  const user = await prisma.user.create({
    data: {
      email,
      password: bcrypt.hashSync(password),
      name: email.split("@")[0],
      roleId: userRole?.id,
    },
  });

  return user;
};
