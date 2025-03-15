import { prisma } from "./prisma";

export const createUserWithData = async ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  const newRecord = await prisma.user.create({
    data: {
      username: username,
      age: age,
    },
  });
  return newRecord;
};
