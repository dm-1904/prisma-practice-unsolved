import { prisma } from "./prisma";

// We want to grab the first N youngest users
// hint: The garden has leaves, I think you should rake, to give me an answer, first you should "take"
export const getNYoungestUsers = async (howManyUsersToGrab: number) => {
  const users = await prisma.user.findMany({
    orderBy: {
      age: "asc",
    },
  });
  return users.slice(0, howManyUsersToGrab);
};
