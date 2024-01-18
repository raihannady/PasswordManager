import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.scss";

import Home from "./pages/Home";
import Form from "./pages/Form";
import Detail from "./pages/Detail";
import Category from "./pages/Category";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/form",
    element: <Form />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/:category",
    element: <Category />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
