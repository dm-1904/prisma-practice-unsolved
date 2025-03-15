import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const userRatings = await prisma.starRating.findMany({
    where: {
      userId: userId,
    },
    include: {
      movie: true,
    },
  });
  return userRatings.map((rating) => rating.movie);
};
