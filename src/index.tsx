import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MoviePage, { loader as movieLoader } from "./pages/MoviePage";
import MainPage, { loader } from "./pages/MainPage";
import Root from "./components/Outlet";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <MainPage />, loader: loader },
      {
        path: "movie/:id",
        element: <MoviePage />,
        loader: movieLoader,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
