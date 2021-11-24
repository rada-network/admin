import React, { lazy } from "react";

const Homepage = lazy(() => import("../containers/Homepage"));
const Share2earn = lazy(() => import("../containers/Share2earn"));

const mainRoutes = [
  {
    path: "/",
    exact: true,
    element: <Homepage />,
  },
  {
    path: "/share2earn",
    exact: true,
    element: <Share2earn />,
  },
];

export { mainRoutes };
