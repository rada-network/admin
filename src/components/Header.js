import React from "react";

import { styled } from "@mui/system";

import {
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { Link } from "react-router-dom";
import Wallet from "./Wallet";
import { useState } from "react";
import { useGlobal } from "providers/Global";
import MenuLink from "./MenuLink";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

export default function Header() {
  const [open, setOpen] = useState(true);
  const { typeUser } = useGlobal();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RADA {typeUser}
          </Typography>
          <Wallet />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List
          sx={{
            marginLeft: "5px",
          }}
        >
          <MenuLink component={Link} to={`${process.env.PUBLIC_URL}/poolClaim`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Only Claim Pools" />
          </MenuLink>
          <MenuLink component={Link} to={`${process.env.PUBLIC_URL}/poolRIR`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="RIR Pools" />
          </MenuLink>
          <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/poolWhitelist`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Whitelist Pools" />
          </MenuLink>
          <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/radaFixedSwap`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="RADA Fixedswap" />
          </MenuLink>
          <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/radaAuction`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="RADA Auction" />
          </MenuLink>
          <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/nftFixedSwap`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="NFT Fixedswap" />
          </MenuLink>
          <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/nftAuction`}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="NFT Auction" />
          </MenuLink>
          <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/shar2earn`}>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Share2earn" />
          </MenuLink>
        </List>
      </Drawer>
    </>
  );
}
