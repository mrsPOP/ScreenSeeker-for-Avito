import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  getMovieById,
  getPosters,
  getReviews,
  getSeasons,
  getMovieWithFilters as getSimilarMovies,
} from "../../api";
import ActorsList from "../../components/ActorsList";
import CarouselSimilarMovies from "../../components/CarouselSimilarMovies";
import Header from "../../components/Header";
import MoviePostersCarousel from "../../components/MoviePoosters";
import NoInformation from "../../components/NoInformation";
import Rating from "../../components/Rating";
import ReviewsList from "../../components/ReviewList";
import SeasonsAndEpisodes from "../../components/SeasonsAndEpisodes";
import "./styles.css";

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<MoviePageData | null> {
  const movieId = params.id!;
  try {
    const [movieData, movieReviews, moviePosters, similarMoviesList] =
      await Promise.all([
        getMovieById(movieId),
        getReviews(movieId),
        getPosters(movieId),
        getSimilarMovies({
          selectFields: ["similarMovies"],
          id: movieId,
        }) as Promise<SimilarMovie[]>,
      ]);

    if (movieData) {
      const extendedMovie: ExtendedMovie = {
        ...movieData,
        reviews: movieReviews!,
        posters: moviePosters!,
        similarMovies: similarMoviesList,
      };

      if (movieData.isSeries) {
        const movieSeasons = await getSeasons(movieId)!;
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
  return (
    <>
      <Header />
      <div style={{ paddingBlock: "20px", paddingInline: "30px" }}>
        {movie?.posters && <MoviePostersCarousel posters={movie.posters} />}
        <h2 style={{ textAlign: "center" }}>{movie?.name}</h2>
        <p>{movie?.description}</p>
        {movie?.rating && <Rating rating={movie.rating} />}
        <h3>Актёры</h3>
        {movie?.persons ? (
          <ActorsList persons={movie.persons} />
        ) : (
          <NoInformation />
        )}
        <h3>Сезоны и эпизоды</h3>
        {movie?.seasons && movie.type === "tv-series" ? (
          <SeasonsAndEpisodes seasons={movie.seasons} />
        ) : (
          <NoInformation />
        )}
        <h3>Отзывы</h3>
        {movie?.reviews ? (
          <ReviewsList reviews={movie.reviews} />
        ) : (
          <NoInformation />
        )}
        <h3>Похожие фильмы</h3>
        {movie?.similarMovies ? (
          <CarouselSimilarMovies similarMovies={movie.similarMovies} />
        ) : (
          <NoInformation />
        )}
      </div>
    </>
  );
};

export default MoviePage;
