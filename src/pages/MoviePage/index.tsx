import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getMovieById } from "../../api";
import { Button, Carousel, List, Rate } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { similarMoviesMock, movieDataMock } from "../../mocks/moviePage";

type MovieData = {
  title: string;
  description: string;
  rating: number;
  actors: { name: string; id: number }[];
  seasons?: {
    seasonNumber: number;
    episodes: { episodeNumber: number; title: string }[];
  }[];
  reviews: { content: string; author: string }[];
  posters: string[];
};

type SimilarMovies = {
  id: number;
  title: string;
  posterUrl: string;
};

const NoInformation = ({ dataType }: { dataType: string }) => (
  <div>Нет информации о {dataType}</div>
);

export async function loader({ params }: LoaderFunctionArgs) {
  const movieId = params.id!;
  const movieData = await getMovieById(movieId);
  console.log("loader", movieData);
  return movieData;
}

const MoviePage = () => {
  const movieData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  console.log("MoviePage", movieData);
  const navigate = useNavigate();

  const movie = movieDataMock as MovieData;
  const similarMovies = similarMoviesMock as SimilarMovies[];

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div>MoviePage</div>
      <div>{movieData?.id}</div>
    </>
  );
};

export default MoviePage;
