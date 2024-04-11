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
    | "countries"
    | "ageRating"
  )[];
  year?: string[];
  poster?: string[];
  ageRating?: string[];
  "countries.name"?: string[];
};

type GetFieldValues = {
  field: "countries.name";
};
