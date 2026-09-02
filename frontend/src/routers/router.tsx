import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
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