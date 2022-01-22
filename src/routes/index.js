import React, { lazy } from "react";

const Pools = lazy(() => import("../containers/Pools"));
const Pool = lazy(() => import("../containers/Pool"));
const PoolSettingsContainer = lazy(() => import("../containers/PoolSettings"));
const Rada = lazy(() => import("../containers/Rada"));
const RadaSettingsContainer = lazy(() => import("../containers/RadaSettings"));

const Share2earn = lazy(() => import("../containers/Share2earn"));
const AuctionPoolsContainer = lazy(() => import("containers/AuctionPools"));
const WhitelistContainer = lazy(() => import("containers/Whitelist"));

const mainRoutes = [
  {
    path: "/",
    exact: true,
    element: <Pools />,
  },

  {
    path: "/auction/:type",
    exact: true,
    element: <AuctionPoolsContainer />,
  },

  {
    path: "/auction/:type/:id",
    exact: true,
    element: <AuctionPoolsContainer />,
  },

  {
    path: "/rada/:type",
    exact: true,
    element: <Rada />,
  },

  {
    path: "/rada/:type/:id",
    exact: true,
    element: <Rada />,
  },

  {
    path: "/rada/:type/settings",
    exact: true,
    element: <RadaSettingsContainer />,
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
    path: "/whitelist",
    exact: true,
    element: <WhitelistContainer />,
  },

  {
    path: "/whitelist/:id",
    exact: true,
    element: <WhitelistContainer />,
  },

  {
    path: "/share2earn",
    exact: true,
    element: <Share2earn />,
  },
];

export { mainRoutes };
