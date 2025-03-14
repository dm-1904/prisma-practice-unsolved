import { sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const movies = await prisma.movie.findMany({
    include: {
      starRatings: true,
    },
  });
  return movies
    .filter((movie) => {
      const ratings = movie.starRatings;
      if (ratings.length === 0) return false;
      const average =
        sumBy(ratings, (r: StarRating) => r.score) / ratings.length;
      return average > n;
    })
    .map(({ id, title, releaseYear, parentalRating }) => ({
      id,
      title,
      releaseYear,
      parentalRating,
    }));
};
