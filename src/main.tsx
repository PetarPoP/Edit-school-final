import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Administracija } from "./routes/administracija.tsx";
import { Predavaci } from "./routes/predavaci.tsx";
import { Radionice } from "./routes/radionice.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/administracija",
        element: <Administracija />,
      },
      {
        path: "/predavaci",
        element: <Predavaci />,
      },
      {
        path: "/radionice",
        element: <Radionice />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
