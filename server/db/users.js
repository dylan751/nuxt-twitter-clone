import { prisma } from ".";

export const createUser = (userData) => {
  return prisma.user.create({
    data: userData,
  });
};
