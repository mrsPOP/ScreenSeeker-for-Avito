type GetMovieByNameProps = {
  page?: number;
  limit?: number;
  query: string;
};

type GetMovieWithFilters = {
  page?: number;
  limit?: number;
  selectFields?: (
    | "name"
    | "id"
    | "year"
    | "poster"
    | "genres.name"
    | "ageRating"
  )[];
  year?: string[];
  poster?: string[];
  ageRating?: string[];
  ["genres.name"]?: string;
};

type GetFieldValues = {
  field: "countries.name";
};
