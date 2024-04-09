import { List } from 'antd';
import { useLoaderData } from "react-router-dom";
import { getMovieWithFilters } from "../../api";
import MovieItem from "../MovieItem";

export function loader() {
  return getMovieWithFilters({
    selectFields: ["id", "year", "name", "poster"],
  });
}

const MovieList = () => {
  const movies = useLoaderData() as Awaited<ReturnType<typeof getMovieWithFilters>>;

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 6 }}
      dataSource={movies ?? undefined}
      renderItem={movie => (
        <List.Item>
          <MovieItem {...movie} />
        </List.Item>
      )}
    />
  );
};

export default MovieList;