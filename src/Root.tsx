import { Await, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import "./Root.css";
import {
  getFieldValues as getCountries,
  getMovieWithFilters,
  getMovieBySearch,
} from "./api";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";
import SearchInput from "./components/Search";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const countries = await getCountries();
  if (params.has("query")) {
    const search = params.get("query")!;
    const foundMovies = await getMovieBySearch({ query: search });
    return { movies: foundMovies, countries };
  }
  const movies = await getMovieWithFilters({
    selectFields: ["id", "year", "name", "poster", "countries"],
    year: params.getAll("year"),
    ageRating: params.getAll("ageRating"),
    "countries.name": params.getAll("countries.name"),
  }) as MovieWithFilters[];
  return { movies, countries };
}
function Root() {
  const { movies, countries } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <div className="root">
      <Filter countryOptions={countries} />
      <SearchInput />
      {movies ? <MovieList movies={movies} /> : <div>Фильмы не найдены</div>}
    </div>
  );
}

export default Root;
