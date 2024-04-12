type ExtendedMovie = Movie & {
  reviews?: Review[];
  seasons?: Season[];
  posters?: MoviePoster[];
  similarMovies?: SimilarMovie[];
};

type MoviePageData = Pick<
  ExtendedMovie,
  | "id"
  | "name"
  | "description"
  | "rating"
  | "type"
  | "persons"
  | "isSeries"
  | "reviews"
  | "seasons"
  | "posters"
  | "similarMovies"
>;
