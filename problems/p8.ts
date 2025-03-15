import { maxBy, minBy, groupBy, sumBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const critics = await prisma.starRating.findMany();
  const grouped = groupBy(critics, (rating) => rating.userId);
  const grumpiestCritic = minBy(Object.entries(grouped), ([, userRating]) => {
    const average = sumBy(userRating, (r) => r.score) / userRating.length;
    return average;
  });
  return grumpiestCritic ? parseInt(grumpiestCritic[0]) : null;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  const critics = await prisma.starRating.findMany();
  const grouped = groupBy(critics, (review) => review.userId);
  const nicestCritic = maxBy(Object.entries(grouped), ([, userReviews]) => {
    const average = sumBy(userReviews, (r) => r.score) / userReviews.length;
    return average;
  });
  return nicestCritic ? parseInt(nicestCritic[0]) : null;
};
