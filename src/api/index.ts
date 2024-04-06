import axios, { AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "./config";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "X-API-KEY": process.env.REACT_APP_TOKEN },
});

export async function getMovieByName(params: GetMovieByNameProps) {
  try {
    const response = await instance.get("v1.4/movie/search", {
      params,
    });
    return response.data.docs;
  } catch (error) {
    console.error(error);
  }
}
