import { List } from 'antd';
import MovieItem from "../MovieItem";
import { moviesMock } from '../../mocks/movies';

const MovieList = ({movies}: {movies: MovieWithFilters[]  | null}) => {
  const moviesList = movies || moviesMock;
  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 6 }}
      dataSource={moviesList}
      renderItem={movie => (
        <List.Item style={{ display: 'flex', flexDirection: 'column' }}>
          <MovieItem {...movie} />
        </List.Item>
      )}
    />
  );
};

export default MovieList;