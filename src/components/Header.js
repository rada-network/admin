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
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Link } from "react-router-dom";
import Wallet from "./Wallet";
import { useState } from "react";
import { useGlobal } from "providers/Global";
import MenuLink from "./MenuLink";
import { useLocation } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const { pathname } = useLocation();
  const last = pathname.split("/").at(-1);
  const id = isNaN(last) ? "" : last;

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
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Launchverse</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List
              sx={{
                marginLeft: "5px",
              }}
            >
              <MenuLink component={Link} to={`${process.env.PUBLIC_URL}/poolClaim`}>
                <ListItemText primary="Only Claim Pools" />
              </MenuLink>
              <MenuLink component={Link} to={`${process.env.PUBLIC_URL}/poolRIR`}>
                <ListItemText primary="RIR Pools" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/poolWhitelist`}>
                <ListItemText primary="Whitelist Pools" />
              </MenuLink>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>NTF/Box</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/radaFixedSwap`}>
                <ListItemText primary="RADA Fixedswap" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/radaAuction`}>
                <ListItemText primary="RADA Auction" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/nftFixedSwap`}>
                <ListItemText primary="NFT Fixedswap" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/nftAuction`}>
                <ListItemText primary="NFT Auction" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/nftMan`}>
                <ListItemText primary="NFT Man" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/rada/nftClaim`}>
                <ListItemText primary="NFT Claim" />
              </MenuLink>
              <MenuLink button component={Link} to={`${process.env.PUBLIC_URL}/whitelist`}>
                <ListItemText primary="Whitelist" />
              </MenuLink>
              <MenuLink
                button
                component={Link}
                to={`${process.env.PUBLIC_URL}/rada/randomizeByRarity`}
              >
                <ListItemText primary="RandomizeByRarity" />
              </MenuLink>
            </List>
          </AccordionDetails>
        </Accordion>
      </Drawer>
    </>
  );
}
