import React, { lazy } from "react";

const Pools = lazy(() => import("../containers/Pools"));
const Pool = lazy(() => import("../containers/Pool"));
const PoolSettingsContainer = lazy(() => import("../containers/PoolSettings"));

const Share2earn = lazy(() => import("../containers/Share2earn"));

const mainRoutes = [
  {
    path: "/",
    exact: true,
    element: <Pools />,
  },

  {
    path: "/:type",
    exact: true,
    element: <Pools />,
  },

  {
    path: "/:type/:id",
    exact: true,
    element: <Pool />,
  },

  {
    path: "/:type/settings",
    exact: true,
    element: <PoolSettingsContainer />,
  },

  {
    path: "/share2earn",
    exact: true,
    element: <Share2earn />,
  },
];

export { mainRoutes };
