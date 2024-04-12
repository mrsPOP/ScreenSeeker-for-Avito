type GetMovieByNameProps = {
  page?: number;
  limit?: number;
  query: string;
};

type GetMovieWithFilters = {
  page?: number;
  limit?: number;
  id?: string;
  selectFields?: (
    | "name"
    | "id"
    | "year"
    | "poster"
    | "countries"
    | "ageRating"
    | "similarMovies"
  )[];
  year?: string[];
  poster?: string[];
  ageRating?: string[];
  "countries.name"?: string[];
};

type GetFieldValues = {
  field: "countries.name";
};
