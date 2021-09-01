import { Container, Link, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  menuList: {
    margin: "0 auto",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  menuItem: {
    padding: "19px 12px",
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: "black",
      borderBottom: "2px black solid",
    },
  },
}));

export default function NavMenu() {
  const classes = useStyles();

  return (
    <Container className={classes.menuList}>
      <Link href="#" className={classes.menuItem} underline="none">
        Men
      </Link>
      <Link href="#" className={classes.menuItem} underline="none">
        Women
      </Link>
      <Link href="#" className={classes.menuItem} underline="none">
        Kids
      </Link>
      <Link href="#" className={classes.menuItem} underline="none">
        Customise
      </Link>
      <Link href="#" className={classes.menuItem} underline="none">
        Sale
      </Link>
      <Link href="#" className={classes.menuItem} underline="none">
        SNKRS
      </Link>
    </Container>
  );
}
