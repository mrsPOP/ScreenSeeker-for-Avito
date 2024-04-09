import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MoviePage from "./pages/MoviePage";
import Root from "./Root";
import { loader as moviesLoader } from "../src/components/MovieList";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: moviesLoader,
    // children: [
    //   {
    //     path: "",
    //     element: <MoviePage />,
    //     loader: movieLoader,
    //   },
    // ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
