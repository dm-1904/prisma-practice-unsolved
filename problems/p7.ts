import { sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const ratings = await prisma.starRating.findMany({
    where: {
      userId: userId,
    },
  });
  return sumBy(ratings, (r: StarRating) => r.score) / ratings.length;
};
