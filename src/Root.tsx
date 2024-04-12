import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import "./Root.css";
import { getFieldValues as getCountries, getMovieWithFilters } from "./api";
import Filter from "./components/Filter";
import MovieList from "./components/MovieList";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const [movies, countries] = await Promise.all([
    getMovieWithFilters({
      selectFields: ["id", "year", "name", "poster", "countries"],
      year: params.getAll("year"),
      ageRating: params.getAll("ageRating"),
      "countries.name": params.getAll("countries.name"),
    }) as Promise<MovieWithFilters[]>,
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
      <Filter countryOptions={countries} />
      <MovieList movies={movies} />
    </div>
  );
}

export default Root;
