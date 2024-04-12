import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  getMovieById,
  getMovieWithFilters as getSimilarMovies,
  getPosters,
  getReviews,
  getSeasons,
} from "../../api";
import { Button, Carousel, List, Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { similarMoviesMock, movieDataMock } from "../../mocks/moviePage";
import Header from "../../components/Header";

type ExtendedMovie = Movie & {
  reviews?: Review[];
  seasons?: Season[];
  posters?: MoviePoster[];
  similarMovies?: SimilarMovie[];
};

type MoviePageData = Pick<
  ExtendedMovie,
  | "id"
  | "name"
  | "description"
  | "rating"
  | "persons"
  | "isSeries"
  | "reviews"
  | "seasons"
  | "posters"
  | "similarMovies"
>;

const NoInformation = ({ dataType }: { dataType: string }) => (
  <div>Нет информации о {dataType}</div>
);

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<MoviePageData | null>  {
  const movieId = params.id!;
  try {
    const [movieData, movieReviews, moviePosters, similarMoviesList] = await Promise.all([
      getMovieById(movieId),
      getReviews(movieId),
      getPosters(movieId),
      getSimilarMovies({ selectFields: ["similarMovies"], id: movieId }) as Promise<SimilarMovie[]>
    ]);
console.log(similarMoviesList);
    if (movieData) {
      const extendedMovie: ExtendedMovie = {
          ...movieData,
          reviews: movieReviews!,
          posters: moviePosters!,
          similarMovies: similarMoviesList,
        };
    
        if (movieData.isSeries) {
          const movieSeasons = await getSeasons(movieId);
          extendedMovie.seasons = movieSeasons ?? undefined;
        }
    
        return extendedMovie as MoviePageData;
    }
    return null;

  } catch (error) {
      console.error("Произошла ошибка при загрузке:", error);
      return null;
    }
}

const MoviePage = () => {
  const movie = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Carousel autoplay>
        {movie?.posters?.map((poster, index) => (
          <div key={index}>
            <img
              src={poster.url}
              alt={`Постер ${index + 1}`}
              style={{ width: "100%" }}
            />
          </div>
        ))}
      </Carousel>

      <h2>{movie?.name}</h2>
      <p>{movie?.description}</p>
      <Rate allowHalf value={movie?.rating.kp} />

      <List
        header={<h3>Актёры</h3>}
        dataSource={movie?.persons.filter(
          (person) => person.profession === "актеры"
        )}
        renderItem={(actor) => <List.Item>{actor.name}</List.Item>}
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        locale={{
          emptyText: <NoInformation dataType="актёров" />,
        }}
      />

      {movie?.seasons ? (
        <List
          header={<h3>Сезоны и эпизоды</h3>}
          dataSource={movie?.seasons}
          renderItem={(season) => (
            <List.Item>
              <strong>Сезон {season.name}:</strong>
              {season.episodes
                .map((episode) => ` Серия ${episode.number} - ${episode.name}`)
                .join(", ")}
            </List.Item>
          )}
          pagination={{
            pageSize: 1,
            hideOnSinglePage: true,
          }}
        />
      ) : (
        <NoInformation dataType="сезонов и серий" />
      )}

      <List
        header={<h3>Отзывы</h3>}
        dataSource={movie?.reviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta title={review.author} description={review.review} />
          </List.Item>
        )}
        pagination={{
          pageSize: 2,
          hideOnSinglePage: true,
        }}
        locale={{
          emptyText: <NoInformation dataType="отзывов" />,
        }}
      />

      <Carousel autoplay>
        {movie?.similarMovies?.map((similarMovie) => (
          <div
            key={similarMovie.id}
            onClick={() => navigate(`/movie/${similarMovie.id}`)}
          >
            <img
              src={similarMovie.poster.url}
              alt={`Похожий фильм: ${similarMovie.name}`}
              style={{ width: "100%", cursor: "pointer" }}
            />
            <h4>{similarMovie.name}</h4>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default MoviePage;
