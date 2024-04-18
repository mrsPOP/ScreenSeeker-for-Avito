import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthorizationProvider } from "./components/AuthorizationProvider";
import Root from "./components/Outlet";
import "./index.css";
import Authorization from "./pages/Authorization";
import MainPage, { loader } from "./pages/MainPage";
import MoviePage, { loader as movieLoader } from "./pages/MoviePage";
import RandomMoviePage from "./pages/RandomMoviePage";

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
      {
        path: "auth",
        element: <Authorization />,
      },
      {
        path: "random-movie",
        element: <RandomMoviePage />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AuthorizationProvider>
      <RouterProvider router={router} />
    </AuthorizationProvider>
  </React.StrictMode>
);
