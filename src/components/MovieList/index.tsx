import { List } from 'antd';
import MovieItem from "../MovieItem";

const MovieList = ({movies}: {movies: MovieWithFilters[]}) => {
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 6 }}
      dataSource={movies}
      renderItem={movie => (
        <List.Item>
          <MovieItem {...movie} />
        </List.Item>
      )}
    />
  );
};

export default MovieList;