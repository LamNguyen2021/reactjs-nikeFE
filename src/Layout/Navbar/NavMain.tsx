import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import React from "react";
import EcoIcon from "@material-ui/icons/Eco";
import NavMenu from "./NavMenu";
import NavFeature from "./NavFeature";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: "transparent",
    color: "#000",
    boxShadow: "0px 0px 0px 0px",
  },
}));

export default function NavMain() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <EcoIcon />
          <NavMenu />
          <NavFeature />
        </Toolbar>
      </AppBar>
    </div>
  );
}
