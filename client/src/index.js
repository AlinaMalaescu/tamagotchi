import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import './index.css';
import ErrorPage from './Pages/ErrorPage';
import MainPage from './Pages/MainPage/MainPage';
import GamePage from './Pages/GamePage/GamePage';
import PlayerLogin from './Pages/PLayerLogin/PlayerLogin';


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [

      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/game",
        element: <GamePage />,
      },
      {
        path: "/login",
        element: <PlayerLogin />,
      },

    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
