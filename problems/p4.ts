import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = async () => {
  const allMoviesYearDescending = await prisma.movie.findMany({
    where: {
      parentalRating: "PG-13",
    },
    orderBy: {
      releaseYear: "desc",
    },
    select: {
      releaseYear: true,
      parentalRating: true,
    },
  });
  return allMoviesYearDescending;
};
