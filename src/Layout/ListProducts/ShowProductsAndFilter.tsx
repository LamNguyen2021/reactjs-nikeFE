import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import FilterProducts from "./FilterProducts";
import ListProducts from "./ListProducts";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingTop: 30,
    paddingBottom: 30,
  },
}));

export default function ShowProductsAndFilter() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.container}>
      <FilterProducts />
      <Grid item md={10}>
        <ListProducts />
      </Grid>
    </Grid>
  );
}
