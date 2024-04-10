import { useLoaderData } from "react-router-dom";
import "./Root.css";
import { getFieldValues as getCountries, getMovieWithFilters } from "./api";
import SelectForm from "./components/Filter";
import MovieList from "./components/MovieList";

export async function loader() {
  const [movies, countries] = await Promise.all([
    getMovieWithFilters({
      selectFields: ["id", "year", "name", "poster"],
    }),
    getCountries(),
  ]);
  return { movies, countries };
}

function Root() {
  const { movies, countries } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <div className="root">
      <SelectForm countryOptions={countries} />
      {movies && <MovieList movies={movies} />}
    </div>
  );
}

export default Root;
