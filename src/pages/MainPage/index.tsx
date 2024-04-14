import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import "./style.css";
import {
  getFieldValues as getCountries,
  getMovieBySearch,
  getMovieWithFilters,
} from "../../api";
import Filter from "../../components/Filter";
import MovieList from "../../components/MovieList";
import { MoviesPagination } from "../../components/Pagination";
import SearchInput from "../../components/Search";

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URL(request.url).searchParams;
  const countries = await getCountries();
  if (params.has("query")) {
    const search = params.get("query")!;
    const { data, page, limit, total } = (await getMovieBySearch({
      query: search,
      page: Number(params.get("page")) || 1,
      limit: Number(params.get("limit")) || 10,
    })) as { data: MovieWithFilters[] } & PaginationInfo;
    return { data, countries, page, limit, total };
  }
  const { data, page, limit, total } = (await getMovieWithFilters({
    selectFields: ["id", "year", "name", "poster", "countries"],
    year: params.getAll("year"),
    ageRating: params.getAll("ageRating"),
    "countries.name": params.getAll("countries.name"),
    page: Number(params.get("page")) || 1,
    limit: Number(params.get("limit")) || 10,
  })) as { data: MovieWithFilters[] } & PaginationInfo;
  return { data, page, limit, total, countries };
}
function MainPage() {
  const {
    data: movies,
    countries,
    page,
    limit,
    total,
  } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <div className="root">
      <Filter countryOptions={countries} />
      <SearchInput />
      {movies ? <MovieList movies={movies} /> : <div>Фильмы не найдены</div>}
      <MoviesPagination page={page} limit={limit} total={total} />
    </div>
  );
}

export default MainPage;
