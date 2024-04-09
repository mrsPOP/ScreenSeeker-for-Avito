import axios from "axios";
import qs from "qs";
import { BASE_URL } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "X-API-KEY": process.env.REACT_APP_TOKEN },
});

export async function getMovieById(id: number): Promise<Movie | null> {
  try {
    const response = await instance.get(`v1.4/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Произошла ошибка в getMovieById:', error);
    return null;
  }
}

export async function getMovieBySearch(params: GetMovieByNameProps): Promise<Movie[] | null> {
  try {
    const response = await instance.get("v1.4/movie/search", {
      params,
    });
    return response.data.docs;
  } catch (error) {
    console.error('Произошла ошибка в getMovieBySearch:', error);
    return null;
  }
}

export async function getMovieWithFilters(
  params?: GetMovieWithFilters
): Promise<MovieWithFilters[] | null> {
  const serializedParams = qs.stringify(params, { arrayFormat: "repeat" });
  try {
    const response = await instance.get(`v1.4/movie?${serializedParams}`);
    return response.data.docs;
  } catch (error) {
    console.error('Произошла ошибка в getMovieWithFilters:', error);
    return null;
  }
}

export async function getFieldValues(params: GetFieldValues) {
  try {
    const response = await instance.get("v1/movie/possible-values-by-field", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Произошла ошибка в getFieldValues:', error);
    return null;
  }
}
