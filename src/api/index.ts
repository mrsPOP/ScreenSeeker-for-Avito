import axios from "axios";
import qs from "qs";
import { BASE_URL } from "./config";
import { findMostCommonHeightPosters } from "./helpers";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "X-API-KEY": process.env.REACT_APP_TOKEN },
});

export async function getMovieById(id: string): Promise<Movie | null> {
  try {
    const response = await instance.get(`v1.4/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка в getMovieById:", error);
    return null;
  }
}

export async function getSeasons(id: string): Promise<Season[] | null> {
  const params = {
    selectFields: [
      "movieId",
      "episodesCount",
      "episodes",
      "poster",
      "name",
      "number",
    ],
    movieId: id,
  };
  const serializedParams = qs.stringify(params, { arrayFormat: "repeat" });
  try {
    const response = await instance.get(`v1.4/season?${serializedParams}`);
    return response.data.docs;
  } catch (error) {
    console.error("Произошла ошибка в getSeasons:", error);
    return null;
  }
}

export async function getReviews(id: string): Promise<Review[] | null> {
  const params = {
    selectFields: ["movieId", "review", "author"],
    movieId: id,
  };
  const serializedParams = qs.stringify(params, { arrayFormat: "repeat" });
  try {
    const response = await instance.get(`v1.4/review?${serializedParams}`);
    return response.data.docs;
  } catch (error) {
    console.error("Произошла ошибка в getReviews:", error);
    return null;
  }
}

export async function getPosters(id: string): Promise<MoviePoster[] | null> {
  const params = {
    selectFields: ["movieId", "url", "width", "height"],
    movieId: id,
  };
  const serializedParams = qs.stringify(params, { arrayFormat: "repeat" });
  try {
    const response = await instance.get(`v1.4/image?${serializedParams}`);
    const verticalPosters = response.data.docs.filter(
      (image: MoviePoster) => image.width < image.height
    );
    const horizontalPosters = response.data.docs.filter(
      (image: MoviePoster) => image.width > image.height
    );
    const posters =
      verticalPosters.length > horizontalPosters.length
        ? verticalPosters
        : horizontalPosters;

    return findMostCommonHeightPosters(posters);
  } catch (error) {
    console.error("Произошла ошибка в getPosters:", error);
    return null;
  }
}

export async function getMovieBySearch(
  params: GetMovieByNameProps
): Promise<MovieWithFilters[] | null> {
  try {
    const response = await instance.get("v1.4/movie/search", {
      params,
    });
    return response.data.docs;
  } catch (error) {
    console.error("Произошла ошибка в getMovieBySearch:", error);
    return null;
  }
}

export async function getMovieWithFilters(params?: GetMovieWithFilters) {
  const serializedParams = qs.stringify(params, { arrayFormat: "repeat" });
  try {
    const response = await instance.get(`v1.4/movie?${serializedParams}`);
    if (response.data.docs.length === 0) return null;
    if (response.data.docs[0].similarMovies) {
      return response.data.docs[0].similarMovies as SimilarMovie[];
    }
    return response.data.docs as MovieWithFilters[];
  } catch (error) {
    console.error("Произошла ошибка в getMovieWithFilters:", error);
    return null;
  }
}

export async function getFieldValues(
  params: GetFieldValues = { field: "countries.name" }
): Promise<FieldValue[] | null> {
  try {
    const response = await instance.get("v1/movie/possible-values-by-field", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Произошла ошибка в getFieldValues:", error);
    return null;
  }
}
