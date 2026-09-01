import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;